# Content Tracker

Et internt redaktionelt workflow-system til Frihedsbrevet, der erstatter eksisterende spreadsheets med en webapplikation til at tracke indhold i produktion.

(Case projekt)

Er overblik over nogle af de user stories der er arbejdet efter kan ses på dette projekt: https://github.com/users/louissse/projects/4/views/1

---

## Tech Stack

- **Frontend:** React + Vite + Tailwind + TanStack Router + TanStack Query + Base UI
- **Backend:** Hono (Node)
- **Database:** Prisma + SQLite
- **Auth:** JWT via Hono middleware

---

## Kom i gang

### Krav

- Node.js 18+
- npm

### Installation

```bash
# Klon projektet
git clone https://github.com/louissse/content-tracker.git
cd content-tracker
```

### Backend

```bash
cd server
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

Backend kører på `http://localhost:3001`

### Frontend

```bash
# Åbn en ny terminal
cd client
npm install
npm run dev
```

Frontend kører på `http://localhost:5173`

---

## Brugere

Systemet har to hardcodede brugere:

| Brugernavn | Password      | Rolle       |
|------------|---------------|-------------|
| andreas    | andreas123    | Editor      |
| louise     | louise123     | Contributor |

---

## Roller

**Editor**
- Kan se alle content items
- Kan oprette, redigere og slette alle items
- Kan publicere og arkivere alle items

**Contributor**
- Kan se alle content items
- Kan kun oprette, redigere og publisere egne items

---

## Antagelser og beslutninger

**SQLite frem for cloud-database**
SQLite er valgt for at gøre lokal opsætning så simpel som mulig.

**Hardcodede brugere**
Brugerne er hardcodet. En naturlig næste skridt ville være at flytte dem til databasen og tilføje brugeroprettelse, samt at lave rigtig auth med f.eks. better-auth.

**Hono frem for Next.js**
Jeg valgte denne backend løsning, da jeg for nyligt har arbejdet i denne stack. Det var altså udviklerens tech kendskab, der endte med at veje tungest. 

**Authors som kommasepareret streng**
`authors`-feltet gemmes som en kommasepareret streng (fx `"andreas, louise"`) frem for et JSON-array, for enkelhedens skyld. Hvis brugere flyttes til databasen ville det være naturligt, at hente en liste med brugere der kan vælges til listen der fra. 

**Arkivering frem for sletning**
Items slettes ikke. de sættes til status `ARCHIVED`. Det bevarer historikken og giver mulighed for at gendanne items senere. Lige nu er der ikke mulighed for at se arkiverede items. Ved behov kunne dette tilføjes rimeligt simpelt.

**Kanban-layout**
Dashboard er implementeret som et Kanban-board grupperet efter status (Idé, Kladde, Review, Publiceret), da jeg antager det passer naturligt til et redaktionelt workflow. Ideen var at man kunne tilføje flere views, hvis det er et reelt behov. F.eks. en kalender oversigt. 

## Mulig videreudvikling

- Som nævnt ville det være naturligt at tilføje rigtig auth som det næste skridt

- Hvis trackeren skulle tages rigtigt i brug ville jeg foretrække at holde et par korte interviews med de brugere der i dag benytter det originale regneark. Her kunne man afdække om der er nogle "skjulte" behov, der ikke umiddelbart træder frem i beskrivelsen af opgaven

- Jeg ville gerne have tilføjet mulighed for at filtrere items, da boardet kan blive uoverskueligt med mange brugere og items. Det er en mindre opgave at tilføje, men ville give mening først at gøre efter interviews med brugergrupperne