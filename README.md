# Die Glocke der Mittwelt

Audio-Schnitzeljagd als React-Webapp. 5 Stationen, 4 Endings, Standort-Gating und Wahl-Speicherung im LocalStorage.

## Setup

```bash
npm install
npm run dev
```

Im Browser unter http://localhost:5173 öffnen. Für Probelauf ohne GPS einfach `?dev=1` an die URL anhängen, z.B. http://localhost:5173/#/station/fee?dev=1.

## Audiodateien einfügen

Die App erkennt fehlende Audiodateien automatisch und zeigt nur den Text. Sobald du Audio hast, lege die Dateien hier ab:

```
public/audio/
  01-rabe.mp3
  02-fee-main.mp3
  02-fee-open.mp3
  02-fee-destroy.mp3
  03-wassermann-main.mp3
  03-wassermann-open.mp3
  03-wassermann-destroy.mp3
  04-moosfrau-main.mp3
  04-moosfrau-open.mp3
  04-moosfrau-destroy.mp3
  05-schmiedin-main.mp3
  ending-A-open-honest.mp3
  ending-B-open-lied.mp3
  ending-C-destroy-honest.mp3
  ending-D-destroy-lied.mp3
```

Dateinamen sind in `src/data/stations.js` konfigurierbar.

## Charakterbilder

Ablegen unter:

```
public/images/
  rabe.png
  fee.png
  wassermann.png
  moosfrau.png
  schmiedin.png
```

Solange noch kein Bild da ist, wird ein Sigil im Bronze-Ton angezeigt.

## Koordinaten setzen

In `src/data/stations.js` sind aktuell Platzhalter-Koordinaten im Bereich Genderkingen. Vor Ort die richtigen Werte (Lat/Lon) eintragen und die Toleranz (`locationToleranceMeters`) bei Bedarf anpassen.

**Station 1 (Rabe)** hat absichtlich `location: null` – das ist der öffentliche Geocache-Punkt. Das Standort-Gate wird hier übersprungen.

## Rätsel einbauen

In `src/pages/Station.jsx` gibt es die Komponente `RiddlePlaceholder`. Dort die echten Rätsel einbauen. Der "hardened"-Prop wird automatisch gesetzt, wenn der Spieler gegen die Faktion des Charakters antwortet (Wassermann → Öffnen oder Fee/Moosfrau → Zerstören).

## Spiel-Logik

- Stationen 2–4: Spieler wählt Öffnen oder Zerstören. Bei "Faktion-treffend" gibt's freundliche Reaktion + leichtes Rätsel. Bei Gegenpol: kühle Reaktion + härteres Rätsel. Beide Wege sind ehrlich.
- Station 5 (Schmiedin): Finale Wahl.
- **Ending-Logik** (siehe `determineEnding` in `stations.js`):
  - Alle 4 Antworten = Öffnen → **A: Wahrhaftige holen Schmiedin (Frieden)**
  - Final Öffnen + irgendwo abweichend → **B: Wahrhaftige holen alle (gelogen)**
  - Alle 4 Antworten = Zerstören → **C: Schmiedins Geheimnis (ehrlich)**
  - Final Zerstören + irgendwo abweichend → **D: Schweigen der Schmiedin (gelogen)**

## Spielstand

Wird in `localStorage` unter `glocke-mittwelt-state-v1` gespeichert. Reset entweder über Button auf der Startseite oder per DevTools.

## Deployment via GitHub Pages

### Option A: GitHub Action (empfohlen)

1. Repo auf GitHub anlegen, Code pushen.
2. Repo-Name in `vite.config.js` bei `REPO_NAME` eintragen (Standard: `glocke-mittwelt`).
3. Unter **Settings → Pages → Build and deployment** als Source **GitHub Actions** wählen.
4. Push auf `main` triggert den Workflow `.github/workflows/deploy.yml`.

### Option B: gh-pages-Paket (manuell)

```bash
npm run deploy
```

Pusht den Build in den `gh-pages`-Branch. Den Branch dann unter Settings → Pages auswählen.

### Wichtig

- Die App nutzt `HashRouter`, damit URLs wie `/#/station/fee` direkt aufrufbar sind – das funktioniert auf GitHub Pages ohne 404-Bastelei.
- Für HTTPS+Geolocation: GitHub Pages liefert automatisch HTTPS, also funktioniert Standortzugriff direkt. Im lokalen Dev-Modus über `localhost` ebenfalls.

## Struktur

```
src/
├── App.jsx                  # Router + globaler Reset-Modal
├── main.jsx                 # Einstiegspunkt
├── index.css                # Komplettes Design-System
├── data/
│   └── stations.js          # Alle Texte, Faktionen, Koordinaten, Logik
├── hooks/
│   ├── useGameState.js      # LocalStorage-Persistenz
│   └── useGeolocation.js    # watchPosition + Haversine
├── components/
│   ├── AudioPlayer.jsx      # Mit Fallback bei fehlender Datei
│   ├── CharacterPortrait.jsx
│   ├── ChoiceButtons.jsx
│   └── LocationGate.jsx
└── pages/
    ├── Home.jsx             # Start + Fortschrittsanzeige
    ├── Station.jsx          # Pro Station mit Phasen (main/choice/reaction)
    └── Ending.jsx           # Eins von 4 Endings
```
