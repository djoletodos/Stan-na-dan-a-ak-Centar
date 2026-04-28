import { SEO } from '../components/seo/SEO';

export default function Gallery() {
  const images = [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1552564245-dfc499c5c0a3?auto=format&fit=crop&q=80&w=1000",
  ];

  return (
    <>
      <SEO 
        title="Galerija Slika | Stan na Dan Čačak Centar"
        description="Pogledajte fotografije našeg apartmana u centru Čačka. Komforan i potpuno opremljen smeštaj sa privatnim parkingom."
      />
      
      <section className="bg-[#FAF9F6] py-16 md:py-24 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="mb-6 flex justify-center text-[10px] uppercase tracking-widest text-[#8B7E66]">
            <span>Smeštaj</span><span className="mx-2">/</span><span className="text-black">Galerija</span>
          </nav>
          <h1 className="text-5xl md:text-6xl font-serif text-primary mb-4">Galerija</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light italic">Zavirite u naš apartman i osetite toplinu i udobnost pre nego što stignete.</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 border border-black/5">
            {images.map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden group relative bg-black/5 border border-black/5">
                <img 
                  src={src} 
                  alt={`Slika apartmana ${i + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
