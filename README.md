# Stan na Dan Čačak Centar

Ovaj projekat je moderan, turistički optimizovan web sajt za izdavanje apartmana u centru Čačka.

## Pokretanje

Aplikacija je već pokrenuta unutar AI Studio sandbox-a i možete je videti u sekciji "Preview".
Za eksport lokalno, možete koristiti "Export" opciju u AI studiju (Github ili Zip format).

Lokalno pokretanje:
1. `npm install`
2. `npm run dev`

## Struktura:
- `src/pages/` - Sve glavne i jedinstvene stranice (rutiraju se putem React Router-a)
- `src/components/layout/` - Navbar i Footer, globalni layout.
- `src/components/seo/` - Omotač za React Helmet koji omogućava snažan dinamički On-Page SEO per strana.
- `src/components/ui/` - Komponente visokog kvaliteta kreirane pomoću Shadcn/ui
- `src/index.css` - Globalne boje, Tailwind direktive i tipografija.
