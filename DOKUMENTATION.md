# 💕 Dilara Website – Dokumentation

## 📋 Übersicht

Diese Website ist ein persönliches Geschenk für meine Freundin Dilara. Sie dient als digitale Erinnerung an unsere Beziehung und ergänzt die App **Love8**.

---

## 🚀 Schnellstart

### Lokale Entwicklung

```bash
# Ins Projektverzeichnis wechseln
cd dilara-website

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Die Website ist dann unter `http://localhost:3007` erreichbar.

---

## 📁 Projektstruktur

```
dilara-website/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── page.tsx                # Hauptseite (alle Sektionen)
│   │   ├── layout.tsx              # Root Layout
│   │   └── globals.css             # Globale Styles
│   ├── components/
│   │   ├── ui/                     # UI-Komponenten
│   │   │   ├── Navbar.tsx          # Navigation
│   │   │   └── LockScreen.tsx      # Entsperren (PIN: 614)
│   │   └── sections/               # Website-Sektionen
│   │       ├── HeroSection.tsx     # Startbildschirm
│   │       ├── TimelineSection.tsx # Unsere Geschichte
│   │       ├── MemoriesSection.tsx # Erinnerungsalbum
│   │       ├── LoveCardsSection.tsx# Warum ich dich liebe
│   │       ├── BucketListSection.tsx# Unsere Zukunft
│   │       ├── SurprisesSection.tsx# Überraschungsbereich
│   │       ├── ChatAnalysisSection.tsx# Chat-Analyse
│   │       ├── StarrySkySection.tsx # Sternenhimmel
│   │       └── EasterEggsSection.tsx# Easter Eggs
│   ├── context/
│   │   └── LanguageContext.tsx     # Sprache (DE/TR)
│   └── i18n/
│       └── translations.ts         # Übersetzungen
├── data/                           # Konfigurationsdaten (JSON)
│   ├── config.json                 # Globale Einstellungen
│   ├── timeline.json               # Timeline-Ereignisse
│   ├── memories.json               # Erinnerungen
│   ├── love-reasons.json           # Love-Cards
│   ├── bucketlist.json             # Bucket List
│   ├── surprises.json              # Überraschungen
│   └── chat-analysis.json          # Chat-Analyse-Daten
├── public/                         # Statische Assets
│   ├── images/                     # Fotos
│   ├── videos/                     # Videos
│   └── audio/                      # Audio-Dateien
├── next.config.mjs                 # Next.js Konfiguration
├── vercel.json                     # Vercel Deployment
└── package.json                    # Abhängigkeiten
```

---

## 🔐 LockScreen

### Funktion
- Website ist beim Öffnen durch ein Schloss gesperrt
- PIN-Eingabe erforderlich zum Entsperren
- Standard-PIN: **614**

### PIN ändern
In `components/ui/LockScreen.tsx`:

```typescript
const CORRECT_CODE = '614'; // ← Hier neue PIN eingeben
```

### Ablauf
1. 🔒 Schloss-Symbol erscheint
2. Klick auf das Schloss
3. 3-stellige PIN eingeben (614)
4. 💕 Website wird angezeigt

---

## 🌐 Sprache

### Standard-Sprache
Die Website startet standardmäßig auf **Türkisch**.

### Sprache ändern
In `context/LanguageContext.tsx`:

```typescript
const [language, setLanguageState] = useState<Language>('tr'); // 'de' für Deutsch
```

### Verfügbare Sprachen
- 🇩🇪 Deutsch (`de`)
- 🇹🇷 Türkisch (`tr`)

### Sprachumschaltung
Über den Language-Toggle in der Navigation.

---

## 📱 Mobile Optimization

### HeroSection
- Responsive Font-Größen
- Reduzierte Partikel auf Mobile (15 statt 40)
- Kleinere Emojis auf Mobile
- Parallax-Effekt auf Mobile deaktiviert
- Optimierter Countdown

### LockScreen
- Responsive Icon-Größen
- Grid-Layout für Tastatur
- Optimiert für Touch-Geräte

### Navbar
- Mobiles Hamburger-Menü
- Slide-in Animation von rechts

---

## 🎨 Design-System

### Farbpalette
```css
/* Primary - Roségold/Rosa */
--color-primary-400: #FF7A96
--color-primary-500: #E85D7A
--color-primary-600: #D44562

/* Accent - Magenta */
--color-magenta-400: #C46FA0
--color-magenta-500: #8E4585

/* Accent - Gold */
--color-gold-500: #C9A96E
```

### Typografie
- **Headlines:** Playfair Display (Serif)
- **Body:** Inter (Sans-Serif)
- **Handschrift:** Dancing Script

### Effekte
- Glassmorphism (Backdrop-Blur)
- Gradient-Texte
- Schwebende Animationen
- Mikroanimationen

---

## 📊 Daten-Konfiguration

### config.json
Globale Einstellungen wie Startdatum der Beziehung:

```json
{
  "startDate": "2026-06-06T18:00:00",
  "partnerNames": {
    "first": "Jonas",
    "second": "Dilara"
  }
}
```

### timeline.json
Ereignisse der Beziehung:

```json
[
  {
    "date": "2026-06-06",
    "title": "Erster Date",
    "description": "Unsere erste Begegnung",
    "image": "/images/timeline/first-date.jpg"
  }
]
```

### memories.json
Erinnerungsfotos mit Geschichten:

```json
[
  {
    "id": 1,
    "title": "Strandurlaub",
    "date": "2026-07-15",
    "location": "Türkei",
    "story": "Unser Tag am Meer",
    "image": "/images/memories/beach.jpg"
  }
]
```

---

## 🚀 Deployment

### Vercel (Empfohlen)

1. Code auf GitHub pushen
2. Vercel verbindet sich automatisch mit GitHub
3. Bei jedem Push wird automatisch neu gebaut

**Live URL:** https://dilara-website.vercel.app

### Lokaler Build

```bash
npm run build
npm start
```

---

## 🛠️ Technologies

| Technologie | Verwendung |
|-------------|------------|
| **Next.js 14** | Framework, SSR, Routing |
| **TypeScript** | Typsicherheit |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animationen |
| **Vercel** | Deployment |

---

## 📦 Scripts

```bash
# Entwicklung
npm run dev

# Build
npm run build

# Produktion
npm start

# Linting
npm run lint
```

---

## 🔧 Troubleshooting

### Build Error: TypeScript
- `delay` muss in `transition`, nicht in `animate`
- Fehler: `animate={{ delay: 0.3 }}`
- Richtig: `transition={{ delay: 0.3 }}`

### Hydration Mismatch
- Keine `Math.random()` in `initial` Props
- Verwende `suppressHydrationWarning` bei Animationen

### Mobile Performance
- Partikel-Anzahl reduzieren auf Mobile
- Parallax-Effekte auf Mobile deaktivieren

---

## 📝 Customizing

### Beziehungsdauer ändern
In `data/config.json`:
```json
{
  "startDate": "YYYY-MM-DD"
}
```

### Inhalte anpassen
Alle Inhalte sind in `data/*.json` Dateien gespeichert:
- `timeline.json` – Timeline-Ereignisse
- `memories.json` – Erinnerungen
- `love-reasons.json` – Love-Cards
- `bucketlist.json` – Zukunftswünsche
- `surprises.json` – Überraschungen

### Neue Sektion hinzufügen
1. Neue Datei in `components/sections/` erstellen
2. In `app/page.tsx` importieren
3. Unter der gewünschten Position einfügen

---

## 🎁 Features Übersicht

| Feature | Beschreibung |
|---------|-------------|
| 🔐 LockScreen | PIN-geschützt (614) |
| ⏱️ Countdown | Live Beziehungstage-Zähler |
| 📖 Timeline | Interaktive Timeline |
| 🖼️ Memories | Polaroid-Galerie |
| 💕 Love Cards | Flip-Cards mit Gründen |
| 🎯 Bucket List | Zukunftswünsche mit Fortschritt |
| 🎁 Surprises | Versteckte Überraschungen |
| 🌟 Sternenhimmel | Interaktiver Nachthimmel |
| 🎵 Chat-Analyse | Chat-Verlauf Analyse |
| 🥚 Easter Eggs | Versteckte Features |
| 🌐 Sprachen | Deutsch & Türkisch |
| 🌙 Dark Mode | Nacht-Modus |
| 📱 Responsive | Optimiert für alle Geräte |

---

## 📞 Support

Bei Fragen oder Anpassungen einfach die JSON-Dateien in `data/` bearbeiten.

**Erstellt mit ❤️ für Dilara**