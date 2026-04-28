import { SEO } from '../components/seo/SEO';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Calendar } from '../components/ui/calendar';
import { MapPin, Phone, MessageSquare } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { sr, enUS } from 'date-fns/locale';
import { differenceInDays, format, isValid, addDays, startOfDay } from 'date-fns';
import { DateRange } from 'react-day-picker';

interface BookedRange {
  start: Date;
  end: Date;
}

const parseICSDate = (dateStr: string) => {
  if (!dateStr) return new Date();
  const year = parseInt(dateStr.substring(0, 4), 10);
  const month = parseInt(dateStr.substring(4, 6), 10) - 1;
  const day = parseInt(dateStr.substring(6, 8), 10);
  return new Date(year, month, day);
};

const parseICS = (data: string): BookedRange[] => {
  const ranges: BookedRange[] = [];
  const lines = data.split(/\r?\n/);
  let currentStart: Date | null = null;
  let currentEnd: Date | null = null;

  lines.forEach(line => {
    if (line.startsWith('BEGIN:VEVENT')) {
      currentStart = null;
      currentEnd = null;
    } else if (line.startsWith('DTSTART')) {
      const parts = line.split(':');
      if (parts.length > 1) currentStart = parseICSDate(parts[1]);
    } else if (line.startsWith('DTEND')) {
      const parts = line.split(':');
      if (parts.length > 1) currentEnd = parseICSDate(parts[1]);
    } else if (line.startsWith('END:VEVENT')) {
      if (currentStart && currentEnd) {
        ranges.push({ start: currentStart, end: currentEnd });
      }
    }
  });
  return ranges;
};

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Ime mora imati bar 2 karaktera' }),
  email: z.string().email({ message: 'Unesite ispravnu email adresu' }),
  phone: z.string().min(6, { message: 'Unesite ispravan broj telefona' }),
  date: z.string().nonempty({ message: 'Odaberite datum dolaska' }),
  nights: z.string().nonempty({ message: 'Unesite broj noćenja' }),
  message: z.string().optional()
});

export default function Contact() {
  const { t, i18n } = useTranslation();
  const [isSuccess, setIsSuccess] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [bookedDates, setBookedDates] = useState<BookedRange[]>([]);
  
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema)
  });

  const watchedDate = watch('date');
  const watchedNights = watch('nights');

  // Fetch Booking.com iCal logic
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const iCalUrl = 'https://ical.booking.com/v1/export?t=268e82fa-d9ac-4da0-ae22-17b9117b6b4d';
        
        // Pokušavamo prvo sa lokalnim Vite proxyjem (za lokalni rad)
        let proxyUrl = `/api/booking-ical/v1/export?t=268e82fa-d9ac-4da0-ae22-17b9117b6b4d`;
        
        // Ako smo u produkciji (gde nema vite proxy-ja), ovde biste koristili svoj PHP fajl,
        // npr: proxyUrl = '/booking-sync.php';
        // Ali za testiranje, zadržaćemo lokalni proxy.

        const response = await fetch(proxyUrl);
        if (!response.ok) {
           // Ako HTTP endpoint ne prepozna proxy, pokušaćemo još jedan public proxy
           const publicProxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(iCalUrl)}`;
           const fallbackResponse = await fetch(publicProxy);
           if (!fallbackResponse.ok) throw new Error('Failed to fetch calendar');
           const data = await fallbackResponse.text();
           const ranges = parseICS(data);
           setBookedDates(ranges);
           return;
        }
        const data = await response.text();
        const ranges = parseICS(data);
        setBookedDates(ranges);
      } catch (error) {
        console.error("Greška pri učitavanju rezervacija sa Bookinga:", error);
      }
    };
    
    fetchBookings();
  }, []);

  const isDateBooked = (date: Date) => {
    const normalizedDate = startOfDay(date);
    const today = startOfDay(new Date());
    
    // Zabrani i prošle dane
    if (normalizedDate < today) return true;
    
    return bookedDates.some(range => {
      return normalizedDate >= range.start && normalizedDate < range.end;
    });
  };

  // Sync inputs to calendar
  useEffect(() => {
    if (watchedDate) {
      const from = new Date(watchedDate);
      if (isValid(from)) {
        const nights = parseInt(watchedNights, 10);
        let to: Date | undefined;
        if (!isNaN(nights) && nights > 0) {
          to = addDays(from, nights);
        }
        
        setDateRange(prev => {
          if (prev?.from?.getTime() === from.getTime() && prev?.to?.getTime() === to?.getTime()) {
            return prev;
          }
          return { from, to };
        });
      }
    } else if (dateRange !== undefined) {
      setDateRange(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedDate, watchedNights]);

  const handleSelectRange = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      let isOverlapping = false;
      let currentDate = range.from;
      // Ako period prelazi preko već rezervisanih datuma
      while (currentDate < range.to) {
        if (isDateBooked(currentDate)) {
          isOverlapping = true;
          break;
        }
        currentDate = addDays(currentDate, 1);
      }
      if (isOverlapping) {
        // Zadrži samo prvi izabrani datum
        range = { from: range.to, to: undefined };
      }
    }

    setDateRange(range);
    if (range?.from) {
      const formattedDate = format(range.from, 'yyyy-MM-dd');
      if (watchedDate !== formattedDate) {
        setValue('date', formattedDate, { shouldValidate: true });
      }
      if (range.to) {
        const nightsCalc = differenceInDays(range.to, range.from);
        if (nightsCalc > 0 && String(nightsCalc) !== watchedNights) {
          setValue('nights', nightsCalc.toString(), { shouldValidate: true });
        }
      }
    } else {
      if (watchedDate) setValue('date', '', { shouldValidate: true });
      if (watchedNights) setValue('nights', '', { shouldValidate: true });
    }
  };

  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
    console.log(data);
    await new Promise(r => setTimeout(r, 1000));
    setIsSuccess(true);
  };

  return (
    <>
      <SEO 
        title={t('contact.seoTitle')}
        description={t('contact.seoDesc')}
      />
      
      <section className="bg-[#FAF9F6] py-16 md:py-24 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="mb-6 flex justify-center text-[10px] uppercase tracking-widest text-[#8B7E66]">
            <span>{t('contact.breadcrumbs')}</span>
          </nav>
          <h1 className="text-5xl md:text-6xl font-serif text-primary mb-4">{t('contact.title')}</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light italic">{t('contact.subtitle')}</p>
        </div>
      </section>

      <section className="py-24 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h2 className="text-3xl font-serif text-primary mb-6">{t('contact.infoTitle')}</h2>
                <div className="text-gray-600 font-light leading-relaxed mb-6 space-y-4">
                  <p>{t('contact.infoDesc')}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-px border border-black/5 bg-black/5">
                <div className="bg-[#FAF9F6] p-6 hover:bg-white transition-colors">
                  <Phone className="w-5 h-5 text-accent mb-4" strokeWidth={1.5} />
                  <h3 className="text-[11px] uppercase tracking-widest font-bold text-primary mb-2">{t('contact.phoneTitle')}</h3>
                  <p className="text-xs text-gray-500 mb-2 italic">{t('contact.phoneDesc')}</p>
                  <a href="tel:+38160000000" className="text-sm font-bold text-primary hover:text-accent font-sans">+381 60 000 000</a>
                </div>

                <div className="bg-[#FAF9F6] p-6 hover:bg-white transition-colors">
                  <MapPin className="w-5 h-5 text-accent mb-4" strokeWidth={1.5} />
                  <h3 className="text-[11px] uppercase tracking-widest font-bold text-primary mb-2">{t('contact.addressTitle')}</h3>
                  <p className="text-xs text-gray-500 mb-2 italic">{t('contact.addressDesc')}</p>
                  <p className="text-sm font-bold text-primary font-sans">Mila Stanišića 2, Čačak</p>
                </div>
              </div>

              <div className="bg-white border border-black/5 p-8">
                <MessageSquare className="w-5 h-5 text-accent mb-4" strokeWidth={1.5} />
                <h4 className="text-[11px] uppercase tracking-widest font-bold text-primary mb-2">{t('contact.wpTitle')}</h4>
                <p className="text-xs text-gray-500 mb-6 italic">{t('contact.wpDesc')}</p>
                <Button asChild className="w-full bg-[#1A1A1A] hover:bg-[#333] text-white rounded-none py-6 text-xs uppercase tracking-tighter">
                  <a href="https://wa.me/38160000000" target="_blank" rel="noreferrer">{t('contact.sendMsg')}</a>
                </Button>
              </div>
            </div>

            {/* Form & Calendar */}
            <div className="lg:col-span-7 bg-[#FAF9F6] p-8 lg:p-12 border border-black/5">
                <h2 className="text-3xl font-serif text-primary mb-8">{t('contact.formTitle')}</h2>
                {isSuccess ? (
                  <div className="bg-white border-l-4 border-accent p-8 text-center border-y border-r border-[#E5E2DD]">
                    <h3 className="text-xl font-serif text-primary mb-2">{t('contact.successTitle')}</h3>
                    <p className="text-sm font-light italic text-gray-500">{t('contact.successDesc')}</p>
                    <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-8 border-black/10 text-primary hover:bg-[#FAF9F6] rounded-none px-8 py-6 text-xs uppercase tracking-tighter">{t('contact.sendNew')}</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="bg-white p-4 border border-black/10 mb-8 flex justify-center">
                      <div className="w-full max-w-sm flex justify-center">
                        <Calendar
                          mode="range"
                          selected={dateRange}
                          onSelect={handleSelectRange}
                          numberOfMonths={1}
                          locale={i18n.language.startsWith('sr') ? sr : enUS}
                          className="rounded-md border p-4 bg-white shadow-sm w-full"
                          disabled={isDateBooked}
                        />
                      </div>
                    </div>

                    <div className="space-y-2 mt-6">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-primary">{t('contact.fName')}</label>
                      <Input {...register('name')} placeholder={t('contact.fNamePh')} className="bg-white border-black/10 rounded-none shadow-none focus-visible:ring-accent" />
                      {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-primary">{t('contact.fPhone')}</label>
                        <Input {...register('phone')} placeholder="+381..." className="bg-white border-black/10 rounded-none shadow-none focus-visible:ring-accent" />
                        {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-primary">{t('contact.fEmail')}</label>
                        <Input {...register('email')} type="email" placeholder="vas@email.com" className="bg-white border-black/10 rounded-none shadow-none focus-visible:ring-accent" />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-primary">{t('contact.fDate')}</label>
                        <Input {...register('date')} type="date" className="bg-white border-black/10 rounded-none shadow-none focus-visible:ring-accent uppercase text-[11px]" />
                        {errors.date && <p className="text-red-500 text-xs italic">{errors.date.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-primary">{t('contact.fNights')}</label>
                        <Input {...register('nights')} type="number" min="1" placeholder="1" className="bg-white border-black/10 rounded-none shadow-none focus-visible:ring-accent" />
                        {errors.nights && <p className="text-red-500 text-xs italic">{errors.nights.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-primary">{t('contact.fMsg')}</label>
                      <Textarea {...register('message')} placeholder={t('contact.fMsgPh')} rows={5} className="bg-white border-black/10 rounded-none shadow-none focus-visible:ring-accent resize-none placeholder:text-sm font-light" />
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full bg-[#1A1A1A] hover:bg-[#333] text-white rounded-none py-6 text-xs uppercase tracking-tighter mt-4">
                      {isSubmitting ? t('contact.btnSending') : t('contact.btnSend')}
                    </Button>
                    <p className="text-[10px] uppercase tracking-widest text-center text-gray-400 mt-6 font-bold">
                      {t('contact.formDisclaimer')}
                    </p>
                  </form>
                )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
