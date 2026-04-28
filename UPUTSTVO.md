# Uputstvo za održavanje i objavljivanje sajta (Stan na Dan Čačak)

Ovaj dokument sadrži sva potrebna uputstva za samostalno menjanje sadržaja sajta i njegovo postavljanje na vaš postojeći hosting uz vaš domen.

## 1. Kako da menjate postojeći tekst na sajtu

Sajt je prilagođen da bude lak za promenu teksta. S obzirom na to da vaš sajt podržava i srpski i engleski jezik, sav tekst se nalazi u fajlu **`src/i18n.ts`**.

1. U pretraživaču fajlova (levo u editoru), otvorite `src/i18n.ts`.
2. Videćete dva glavna bloka koda: `sr` (za srpski) i `en` (za engleski).
3. Podaci su grupisani po stranicama (`home`, `contact`, `blog`, itd).
4. Tekst koji želite da promenite nalazi se pod navodnicima. 
   **Primer:** ` "heroTitle": "Apartman na dan Čačak Centar" ` menjate samo tekst u drugim navodnicima -> ` "heroTitle": "Neki drugi naslov" `
5. Čim sačuvate, promene će biti vidljive.

## 2. Kako da dodajete novi sadržaj (novi Blog post)

Dodavanje blog objava je uprošćeno i radi se u dva fajla (jedan za slike i datum, drugi za tekst):

### Korak A: Informacije o postu
1. Otvorite fajl **`src/data/blog.ts`**.
2. Dodajte novi unos ispod postojećih u niz `blogPostsMeta`.
   **Primer za brzi Copy-Paste i izmenu:**
   ```typescript
   {
     id: "4",
     slug: "ime-mog-novog-posta-bez-razmaka", // Ovo će biti deo URL-a. Koristite crtice, bez naših slova (š,ć,č)
     image: "putanja-do-nove-slike.jpg", 
     date: "2024-07-15",
     readTime: 3,
   }
   ```

### Korak B: Sam tekst posta
1. Otvorite ponovo fajl **`src/i18n.ts`**.
2. Idite do dela sa srpskim jezikom (blok `sr`), pa pronađite sekciju `blogPosts`.
3. Dodajte novi tekst na osnovu onog "slug-a" od malopre.
   **Primer:**
   ```json
   "ime-mog-novog-posta-bez-razmaka": {
     "title": "Ovo je naslov koji se vidi na sajtu",
     "excerpt": "Ovde pišete kratak uvodni tekst koji će privući ljude na naslovnoj...",
     "content": "Ovde ide glavni tekst bloga. \n\nZa novi pasus, udarite enter dvaput (odnosno upišite \n\nkao ovde). \n\n### Pisanje podnaslova počinje sa tri tarabe (###)."
   }
   ```
*Ne zaboravite da uradite isto i u sekciji za engleski (`en`) jezik ukoliko želite da blog bude preveden.*

## 3. Kako da objavite sajt javno (sa kupljenim domenom i postojećim hostingom)

Pošto već imate zakupljen hosting, proces prebacivanja ovog sajta na vaš server svodi se na generisanje statične produkcione verzije ("Build") i prebacivanje na server.

### Deo A: Preuzimanje koda
1. Iz Google AI Studija, preuzmite vaš kod kao ZIP fajl i otpakujte ga na svom računaru.
2. Na računaru (potrebno je da imate instaliran [Node.js](https://nodejs.org/en)), otvorite Terminal/Command Prompt unutar tog foldera.
3. Kucajte sledeću komandu da preuzmete pakete: `npm install`
4. Zatim, komandu za građenje statične kopije sajta: `npm run build`
5. Nakon završetka gradnje, dobićete folder **`dist`** unutar vašeg projekta. Taj folder sadrži gotov i optimizovan sajt (statičan kod - HTML, JS, CSS).

### Deo B: Povezivanje Domena sa Hostingom
1. Kada u bilo kom registraru kupite željeni domen (npr. vasapartman.rs), u podešavanjima tog domena potražite opciju za izmenu naziva DNS servera (Nameserveri / NS).
2. Tamo unesite Nameservere svog hostinga (to vam je prosledio hosting provajder, obično liče na: *ns1.vas-hosting.com*, *ns2.vas-hosting.com*). 

### Deo C: Prebacivanje "dist" fajlova na Hosting
1. Ulogujte se na control panel vašeg hosting naloza (najčešće je to **cPanel**).
2. Idite na opciju **File Manager** (Menadžer fajlova).
3. Uđite u folder koji se zove **`public_html`**. Odavde obrišite stare fajlove ukoliko ih ima.
4. Celokupan sadržaj foldera **`dist`** iz Koraka 5 prebacite ovde u `public_html`.
   *(Napomena: Prebacite SVE fajlove iz foldera "dist", a ne sam folder "dist").*
5. Sacekate da internet propagira domen i vaš sajt će biti javno dostupan u punoj brzini!

## 4. Kako da menjate strukturu, dizajn i izgled Apsolutno Svake Stranice

Ukoliko želite da izmenite više od samog teksta (npr. da obrišete neku sekciju, dodate slike, promenite boje ili raspored), to radite u samom kodu stranica:

1. **Gde se nalaze stranice?** Svrstane su u folderu **`src/pages/`**.
   - Naslovna: `Home.tsx`
   - O nama/Apartman: `Apartment.tsx`
   - Kontakt: `Contact.tsx`
   - Itd.
2. **Gde je meni i podnožje (footer)?** Oni stoje u folderu **`src/components/layout/`** (fajlovi `Navbar.tsx` i `Footer.tsx`).
3. **Koji se jezik koristi?** Fajlovi su pisani u **React-u** koristeći **Tailwind CSS** za dizajn.
   - HTML kod se nalazi unutar `return (...)` bloka.
   - Dizajn menjate izmenom atributa `className="..."`. Na primer, dodavanjem `bg-red-500` sekcija dobija crvenu pozadinu. Razmake menjate menjanjem brojki na `pt-16`, `mb-8` itd.

*Savet: Ukoliko niste sigurni kako da menjate kod, uvek možete prekopirati kod iz tog fajla u ChatGPT i zatražiti: "Izmeni mi ovaj kod tako da slika bude sa leve strane, a tekst sa desne."*

## 5. Kako da povežete kontakt formu sa kalendarom sa Booking.com (iCal)

Pošto se sajt nalazi na vašem hostingu bez sopstvene Node.js baze, Booking-ov "iCal" (`.ics`) link nije moguće iščitati direktno iz internet pretraživača zbog sigurnosnih pravila (CORS).

Da biste blokirali zauzete termine, morate uraditi sledeće (potrebno je bazično programiranje ili pomoć programera):

### Korak A: Kreiranje "Posrednika" (Proxy fajla) na vašem hostingu
Kada prebacite sajt na vaš cPanel (u `public_html`), tu napravite i fajl `booking-sync.php` i u njega zalepite ovaj kod:

```php
<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: text/plain');
// Zamenite donji link sa vašim Booking.com iCal linkom (Export kalendara)
$ical_url = "HTTPS://ADMIN.BOOKING.COM/HOTEL/HOTELADMIN/ICAL.HTML?T=....";
echo file_get_contents($ical_url);
?>
```
Ovaj fajl služi da preuzme datume sa Bookinga i bezbedno ih prosledi vašem sajtu.

### Korak B: Prilagođavanje koda u Kontakt formi
1. Otvorite fajl **`src/pages/Contact.tsx`** u ovom editoru.
2. Na početku fajla dodajte instalaciju biblioteke za čitanje .ics formata u terminal pod komandom `npm install ical.js`.
3. Unutar funkcije za stranicu (ispod `const onSubmit ...`) morate dodati kod koji kontaktira onaj `booking-sync.php` i obrađuje zauzete datume.
4. Zatim u HTML komponenti `<Calendar ... />` postoji svojstvo `disabled`. Tu možete ubaciti niz datuma koji su zauzeti ili funkciju `(date) => isDateBooked(date)`.

*Ovo je idealan zadatak koji možete proslediti meni (AI asistentu) i ja ću prepraviti `Contact.tsx`. Jedino vi za početak morate da mi prekopirate vaš pravi **Booking.com Export iCal Link**.*
