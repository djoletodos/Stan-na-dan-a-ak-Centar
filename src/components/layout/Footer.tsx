import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full px-4 sm:px-12 py-12 bg-white border-t border-black/5 text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-heading tracking-tight mb-4">CENTAR ČAČAK<span className="text-accent">.</span></h3>
            <p className="text-sm font-light italic text-gray-500">
              Vaš savršen smeštaj u srcu Čačka. Udobnost, kvalitet i vrhunska lokacija za vaš nezaboravan boravak.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-400 mb-4">Brzi Linkovi</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/apartman" className="hover:opacity-70 transition-opacity">O Apartmanu</Link></li>
              <li><Link to="/lokacija" className="hover:opacity-70 transition-opacity">Lokacija</Link></li>
              <li><Link to="/galerija" className="hover:opacity-70 transition-opacity">Galerija</Link></li>
              <li><Link to="/kontakt" className="hover:opacity-70 transition-opacity">Kontakt & Rezervacije</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-400 mb-4">Kontakt Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 text-accent shrink-0" />
                <span>Mila Stanišića 2, Čačak, Srbija</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-accent shrink-0" />
                <a href="tel:+381648255735" className="hover:opacity-70 transition-opacity">+381648255735</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-accent shrink-0" />
                <a href="mailto:info@stannadan-cacak.rs" className="hover:opacity-70 transition-opacity">info@stannadan-cacak.rs</a>
              </li>
              <li className="flex items-center">
                <Clock className="w-4 h-4 mr-3 text-accent shrink-0" />
                <span>Check-in: 11:30 - 23:00 | Check-out: do 10:00</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-black/5 mt-12 pt-6 flex flex-col md:flex-row justify-center items-center text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-400">
          <div className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Stan na Dan Centar Čačak</div>
          </div>
      </div>
    </footer>
  );
}
