import { SEO } from '../components/seo/SEO';
import { MapPin, Navigation, Car, Coffee, Utensils, ShoppingBag } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

export default function Location() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": "Lokacija - Stan na dan Čačak",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Mila Stanišića 2",
      "addressLocality": "Čačak",
      "postalCode": "32000",
      "addressCountry": "RS"
    }
  };

  return (
    <>
      <SEO 
        title="Lokacija Apartmana | Smeštaj Centar Čačak"
        description="Stan se nalazi u ulici Mila Stanišića 2 u Čačku, samo 300 metara od gradskog trga. U blizini svih bitnih restorana, kafića i znamenitosti."
        schema={schema}
      />
      
      {/* Header */}
      <section className="bg-[#FAF9F6] py-16 md:py-24 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="mb-6 flex justify-center text-[10px] uppercase tracking-widest text-[#8B7E66]">
            <span>Čačak</span><span className="mx-2">/</span><span className="text-black">Lokacija</span>
          </nav>
          <h1 className="text-5xl md:text-6xl font-serif text-primary mb-4">Savršena Lokacija u Čačku</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light italic">Sve što vam treba nalazi se na samo par minuta hoda.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            <div className="lg:col-span-6 space-y-12">
              <div>
                <h2 className="text-3xl font-serif mb-6 text-primary flex items-center">
                  Adresa i Parking
                </h2>
                <div className="text-gray-600 font-light leading-relaxed mb-6 space-y-4">
                  <p className="uppercase text-[10px] font-bold tracking-widest text-primary mb-2">Mila Stanišića 2, Čačak</p>
                  <p>
                    Nalazimo se na samo <strong>300 metara od gradskog trga</strong>, što predstavlja svega par minuta laganog hoda. Ne morate korisiti automobil da biste otišli do restorana ili u večernji izlazak.
                  </p>
                </div>
                <div className="bg-[#FAF9F6] border-l-2 border-accent p-6 text-sm italic">
                  <h4 className="font-sans text-[11px] uppercase tracking-widest font-bold text-primary mb-2 not-italic">
                    Obezbeđen Privatni Parking
                  </h4>
                  <p className="m-0 text-gray-600">
                    Znamo koliko parking može biti problematičan. Zato uz naš stan dobijate <strong>svoje parking mesto</strong>. Nalazi se iza zgrade, ograđeno je i osigurano postavljenom parking barijerom za koju samo Vi dobijate ključ.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-serif mb-8 text-primary">Šta se nalazi u blizini?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-black/5 border border-black/5">
                  {[
                    { icon: Navigation, name: "Gradski Trg", dist: "300 m", time: "3 min peške" },
                    { icon: Coffee, name: "Glavno šetalište", dist: "250 m", time: "2 min peške" },
                    { icon: ShoppingBag, name: "Supermarket", dist: "100 m", time: "1 min peške" },
                    { icon: Utensils, name: "Restorani", dist: "200 m", time: "2 min peške" },
                    { icon: Navigation, name: "Narodni Muzej", dist: "450 m", time: "5 min peške" },
                    { icon: Navigation, name: "Gradski Park", dist: "600 m", time: "7 min peške" },
                  ].map((place, i) => (
                    <div key={i} className="bg-white p-6 hover:bg-[#FAF9F6] transition-colors flex items-start">
                      <place.icon className="w-4 h-4 text-accent mr-4 mt-0.5 shrink-0" strokeWidth={1.5} />
                      <div>
                        <h4 className="font-bold text-[11px] uppercase tracking-widest text-primary">{place.name}</h4>
                        <p className="text-xs text-gray-500 mt-1 italic">{place.dist} • {place.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="lg:col-span-6 bg-[#E5E2DD] h-[500px] lg:h-full w-full relative border border-black/5">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2876.104273822184!2d20.3475968!3d43.8911466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4757723902319bf5%3A0x6bba8d8dcfd5c80a!2zTWlsYSBTdGFuacWhacSHYSAyLCDEjGHEjWFr!5e0!3m2!1sen!2srs!4v1700000000000!5m2!1sen!2srs" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa lokacije apartmana"
                  className="absolute inset-0"
                ></iframe>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
