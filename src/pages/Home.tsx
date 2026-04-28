import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, WifiOff, Car, Thermometer, Tv, Coffee, CheckCircle2, Star, ShowerHead } from 'lucide-react';
import { SEO } from '../components/seo/SEO';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  const schema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "Stan na dan Centar Čačak",
    "description": "Stan na dan u centru Čačka na samo 300m od samog centra grada (trga). Idealan za 2 osobe, privatan parking.",
    "url": "https://www.stannadan-cacak.rs",
    "telephone": "+38160000000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Mila Stanišića 2",
      "addressLocality": "Čačak",
      "postalCode": "32000",
      "addressCountry": "RS"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.8914,
      "longitude": 20.3496
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "9.9",
      "bestRating": "10",
      "reviewCount": "105"
    },
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Besplatan parking sa barijerom", "value": "True" },
      { "@type": "LocationFeatureSpecification", "name": "Centralno grejanje", "value": "True" },
      { "@type": "LocationFeatureSpecification", "name": "Klima uređaj", "value": "True" }
    ],
    "priceRange": "$$"
  };

  return (
    <>
      <SEO 
        title={t('home.seoTitle')}
        description={t('home.seoDesc')}
        schema={schema}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-[#FAF9F6]">
        
        {/* Left Column (Text & UI) */}
        <div className="lg:col-span-5 p-8 lg:p-16 flex flex-col justify-center border-r border-black/5 z-10 pt-24 lg:pt-0">
          <nav className="mb-8 flex items-center text-[10px] uppercase tracking-widest text-[#8B7E66]">
            <span>{t('home.breadcrumbs')}</span>
          </nav>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col justify-center"
          >
            <h1 className="text-5xl lg:text-6xl font-serif leading-[1.1] mb-6 text-primary">
              {t('home.heroTitle')}
            </h1>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed font-light italic">
              {t('home.heroDesc')}
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 mt-1 bg-accent/20 flex items-center justify-center rounded-full shrink-0">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-tighter">{t('home.f1')}</h4>
                  <p className="text-[11px] text-gray-400">{t('home.f1d')}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 mt-1 bg-accent/20 flex items-center justify-center rounded-full shrink-0">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-tighter">{t('home.f2')}</h4>
                  <p className="text-[11px] text-gray-400">{t('home.f2d')}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 mt-1 bg-accent/20 flex items-center justify-center rounded-full shrink-0">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-tighter">{t('home.f3')}</h4>
                  <p className="text-[11px] text-gray-400">{t('home.f3d')}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 mt-1 bg-accent/20 flex items-center justify-center rounded-full shrink-0">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-tighter">{t('home.f4')}</h4>
                  <p className="text-[11px] text-gray-400">{t('home.f4d')}</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mb-4">
              <Button asChild className="bg-[#1A1A1A] hover:bg-[#333] text-white rounded-none px-6 py-4 lg:py-6 text-xs uppercase tracking-tighter w-full sm:w-auto">
                <Link to="/kontakt">{t('home.ctaPrimary')}</Link>
              </Button>
            </div>
          </motion.div>

          {/* Trust Signali */}
          <div className="mt-auto flex items-center space-x-4 border-t border-black/5 pt-8">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-gray-400 font-bold mb-1">{t('home.bookingScore')}</span>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-serif">9.9</span>
                <div className="flex text-accent text-xs">★★★★★</div>
              </div>
            </div>
            <div className="h-8 w-px bg-black/10 mx-2 lg:mx-4"></div>
            <p className="text-[10px] lg:text-xs text-gray-400 uppercase tracking-widest leading-tight" dangerouslySetInnerHTML={{ __html: t('home.happyGuests') }}></p>
          </div>
        </div>

        {/* Right Column (Image container) */}
        <div className="relative h-96 lg:h-auto lg:col-span-7 bg-[#E5E2DD]">
          <div 
            className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-90" 
            style={{ backgroundImage: "url('/glavna.jpg')" }}
          />
          <div className="absolute top-12 right-12 w-32 h-32 lg:w-48 lg:h-48 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm bg-black/10 text-white text-center p-4 lg:p-6 animate-pulse hidden sm:flex">
            <p className="text-[10px] uppercase tracking-tighter leading-tight">{t('home.warmMessage')}</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 bg-gradient-to-t from-black/90 to-transparent text-white">
            <div className="flex items-end justify-between">
              <div className="max-w-md">
                <h3 className="text-xl lg:text-2xl font-serif mb-2">{t('home.address')}</h3>
                <p className="text-xs lg:text-sm opacity-70 leading-relaxed font-light">{t('home.parkingMessage')}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">{t('home.priceFrom')}</p>
                <p className="text-3xl lg:text-4xl font-serif">30€</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-5xl font-serif text-primary mb-8 leading-[1.1]">
                {t('home.comfortTitle')}
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed font-light">
                <p>
                  {t('home.comfortP1')}
                </p>
                <p>
                  {t('home.comfortP2')}
                </p>
                <p className="border-l-2 border-accent pl-4 italic bg-[#FAF9F6] p-4 text-sm mt-4">
                  {t('home.comfortHighlight')}
                </p>
              </div>
              <div className="mt-10">
                <Button variant="link" asChild className="text-[#1A1A1A] hover:text-accent p-0 text-[10px] uppercase tracking-widest font-bold">
                  <Link to="/apartman" className="flex items-center">{t('home.detailsLink')} <span className="ml-2">→</span></Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[3/4] overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1000" 
                  alt="Dnevna soba stan na dan Čačak" 
                  className="w-full h-full object-cover filter contrast-105"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-[#FAF9F6] p-8 max-w-[240px] border border-black/5 hidden md:block">
                <p className="text-xs uppercase tracking-widest font-bold mb-2">{t('home.topLocation')}</p>
                <p className="text-sm font-serif italic text-gray-500">{t('home.topLocationDesc')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="py-24 bg-[#FAF9F6] border-t border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-serif text-primary mb-2">{t('home.amenitiesTitle')}</h2>
            <p className="text-sm uppercase tracking-widest text-gray-400 font-bold">{t('home.amenitiesSubtitle')}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-black/5 border border-black/5">
            {[
              { icon: Car, title: t('home.a1'), desc: t('home.a1d') },
              { icon: MapPin, title: t('home.a2'), desc: t('home.a2d') },
              { icon: Thermometer, title: t('home.a3'), desc: t('home.a3d') },
              { icon: Tv, title: t('home.a4'), desc: t('home.a4d') },
              { icon: Coffee, title: t('home.a5'), desc: t('home.a5d') },
              { icon: ShowerHead, title: t('home.a6'), desc: t('home.a6d') },
              { icon: CheckCircle2, title: t('home.a7'), desc: t('home.a7d') },
              { icon: WifiOff, title: t('home.a8'), desc: t('home.a8d') },
            ].map((amenity, i) => (
              <div key={i} className="bg-[#FAF9F6] p-8 flex flex-col items-start justify-between hover:bg-white transition-colors min-h-[160px]">
                <amenity.icon className="w-5 h-5 text-accent mb-6" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xs uppercase font-bold tracking-tight mb-1">{amenity.title}</h3>
                  <p className="text-[11px] text-gray-500">{amenity.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location CTA */}
      <section className="py-24 bg-white border-t border-black/5 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-serif mb-6 leading-tight">{t('home.ctaTitle')}</h2>
          <p className="text-gray-500 mb-10 font-light italic text-lg">
            {t('home.ctaDesc')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-[#1A1A1A] hover:bg-[#333] text-white rounded-none px-8 py-6 text-xs uppercase tracking-tighter">
              <Link to="/kontakt">{t('home.bookTerm')}</Link>
            </Button>
            <Button variant="outline" asChild className="border-black/10 text-primary hover:bg-[#FAF9F6] rounded-none px-8 py-6 text-xs uppercase tracking-tighter">
              <Link to="/galerija">{t('home.viewGallery')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
