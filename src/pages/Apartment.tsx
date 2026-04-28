import { SEO } from '../components/seo/SEO';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Check, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Apartment() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Apartment",
    "name": "Stan na dan Centar Čačak",
    "description": "Detaljan opis apartmana za izdavanje u srcu Čačka.",
    "numberOfRooms": 1,
    "occupancy": {
      "@type": "QuantitativeValue",
      "value": 2
    },
    "petsAllowed": "False"
  };

  return (
    <>
      <SEO 
        title="O Apartmanu | Stan na Dan Čačak Centar"
        description="Saznajte sve detalje o našem smeštaju u Čačku. Kapacitet, sadržaji, kuhinja, kupatilo i pravila boravka."
        schema={schema}
      />
      
      {/* Header */}
      <section className="bg-[#FAF9F6] py-16 md:py-24 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center text-[10px] uppercase tracking-widest text-[#8B7E66]">
            <span>Smeštaj</span><span className="mx-2">/</span><span className="text-black">O Apartmanu</span>
          </nav>
          <h1 className="text-5xl md:text-6xl font-serif text-primary mb-4">O Apartmanu</h1>
          <p className="text-lg text-gray-500 max-w-2xl font-light italic">Detaljan pregled svega što vam naš stan u centru Čačka nudi.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            <div className="lg:col-span-8 space-y-16">
              <div>
                <h2 className="text-3xl font-serif mb-6 text-primary">Udobnost na prvom mestu</h2>
                <div className="text-gray-600 space-y-6 font-light leading-relaxed">
                  <p>
                    Stan je pažljivo uređen kako bi pružio maksimalan komfor tokom vašeg boravka u Čačku. Namenjen je prevashodno za 2 osobe, ali s obzirom na raspoloživ prostor, roditelji sa jednim detetom su takođe dobrodošli ukoliko im organizacija smeštaja odgovara.
                  </p>
                  <p>
                    U dnevnom boravku se nalazi udoban nameštaj i veliki pametni TV na kome možete puštati preporučeni sadržaj ili vaše omiljene snimke preko YouTube aplikacije. 
                  </p>
                  <p>
                    Temperatura u stanu je uvek optimalna - centralno grejanje obezbeđuje toplotu tokom zimskih meseci, dok je klima uređaj tu za osveženje leti, i to potpuno besplatno.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-serif mb-6 text-primary">Kuhinja i Kupatilo</h2>
                <div className="text-gray-600 space-y-6 font-light leading-relaxed">
                  <p>
                    Iako ste u samom centru gde vam je na raspolaganju mnogo restorana i pekara, stan poseduje funkcionalnu kuhinju. U njoj se nalazi frižider i indukciona ploča, savršena ukoliko planirate da skuvate kafu, čaj ili pripremite brz obrok. Sav potreban osnovni pribor za ručavanje (tanjiri, escajg, čaše, šolje) je na raspolaganju.
                  </p>
                  <p>
                    Kupatilo je opremljeno svim osnovnim potrepštinama kako ne biste morali da brinete o sitnicama. Tu su toalet papir, sapun i uvek čisti peškiri za svakog gosta. Ukoliko ostajete više dana, bez ikakve dodatne naknade obezbedićemo vam i dodatne garniture posteljine za krevet.
                  </p>
                </div>
              </div>
              
              <div className="bg-[#FAF9F6] p-8 border border-black/5">
                <h3 className="flex items-center text-sm uppercase tracking-widest font-bold text-primary mb-6">
                  <Info className="w-4 h-4 mr-3 text-accent" /> Važne Informacije
                </h3>
                <ul className="space-y-4 text-sm text-gray-600">
                  <li className="flex flex-col"><span className="text-[10px] uppercase font-bold text-gray-400 mb-1">Check-in</span> Gosti mogu doći u stan od 11:30h sve do 23:00h.</li>
                  <li className="flex flex-col"><span className="text-[10px] uppercase font-bold text-gray-400 mb-1">Check-out</span> Izlazak iz smeštaja je do 10:00h narednog dana.</li>
                  <li className="flex flex-col"><span className="text-[10px] uppercase font-bold text-gray-400 mb-1">Fleksibilnost</span> Za stalne goste ili one koji dolaze na više dana vreme prijave i odjave može se prilagoditi ukoliko raspored dozvoljava.</li>
                  <li className="flex flex-col"><span className="text-[10px] uppercase font-bold text-gray-400 mb-1">Internet</span> Stan trenutno nema WiFi konekciju. Pravi digitalni detoks!</li>
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border text-primary border-black/5 p-8">
                  <h3 className="text-[10px] uppercase tracking-widest font-bold mb-6 border-b border-black/5 pb-4">Brzi Pregled</h3>
                  <ul className="space-y-4">
                    {['Kapacitet: 2 osobe', 'TV sa YouTube', 'Indukciona ploča', 'Frižider', 'Klima i Grejanje', 'Privatan parking', 'Peškiri i posteljina'].map((item, i) => (
                      <li key={i} className="flex items-center text-[13px] text-gray-600">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button asChild className="w-full bg-[#1A1A1A] hover:bg-[#333] text-white rounded-none py-6 text-xs uppercase tracking-tighter">
                      <Link to="/kontakt">Rezerviši Smeštaj</Link>
                    </Button>
                  </div>
              </div>

              <div className="bg-[#FAF9F6] border border-black/5 p-8 text-center flex flex-col items-center justify-center">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4">Pišite nam na WhatsApp</p>
                  <p className="font-serif text-2xl mb-6 text-primary">+381 60 000 000</p>
                  <Button variant="outline" asChild className="w-full border-black/10 text-primary hover:bg-white rounded-none">
                    <a href="tel:+38160000000">Pozovite nas</a>
                  </Button>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}
