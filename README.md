# Slide Creator - Motion Canvas

Progetto per creare presentazioni animate usando [Motion Canvas](https://motioncanvas.io/).

## 📋 Prerequisiti

Prima di iniziare, assicurati di avere installato:

- **Node.js** >= v16.0.0 ([Download](https://nodejs.org/))
- **Yarn** package manager

### Verifica versione Node

```bash
node --version
```

Se la versione è inferiore a v16.0.0, aggiorna Node.js.

### Installare Yarn

Se non hai Yarn installato:

```bash
npm install -g yarn
```

## 🚀 Installazione

1. **Clona il repository** (o naviga nella cartella del progetto)

```bash
cd slide-creator
```

2. **Installa le dipendenze**

```bash
yarn install
```

## 💻 Avvio del Progetto

### Modalità Sviluppo

Per avviare il progetto in modalità sviluppo con hot-reload:

```bash
yarn dev
```

Il progetto sarà disponibile su `http://localhost:9000`

### Build di Produzione

Per creare una build ottimizzata:

```bash
yarn build
```

## 📂 Struttura del Progetto

```
slide-creator/
├── src/
│   ├── scenes/          # Scene delle presentazioni
│   │   ├── gcc-intro.tsx              # Presentazione GCC
│   │   ├── presentation.tsx            # Presentazione generale
│   │   ├── presentazione-tecnica.tsx   # Presentazione tecnica
│   │   └── presentazione-marketing.tsx # Presentazione marketing
│   └── project.ts       # Configurazione del progetto
├── plans/               # Piani delle lezioni
│   └── software-0-1.md
├── public/              # Asset statici (immagini, etc.)
└── package.json
```

## 🎬 Uso delle Presentazioni

### Switchare tra Presentazioni

Apri il file `src/project.ts` e commenta/decommenta le presentazioni che vuoi visualizzare:

```typescript
export default makeProject({
  scenes: [
    gccIntro,                    // ← Attiva
    // presentazioneGenerale,    // ← Disattivata
    // presentazioneTecnica,     // ← Disattivata
    // presentazioneMarketing,   // ← Disattivata
  ],
});
```

### Controlli Durante la Presentazione

- **Space** - Avanza alla prossima slide (con `beginSlide`)
- **Play/Pausa** - Controlla la riproduzione
- **,** (virgola) - Frame precedente
- **.** (punto) - Frame successivo
- **Alt + [** - Slide precedente
- **Alt + ]** - Slide successiva
- **R** - Riavvia dall'inizio

## 📝 Creare Nuove Presentazioni

1. Crea un nuovo file nella cartella `src/scenes/`:

```typescript
// src/scenes/mia-presentazione.tsx
import { makeScene2D, Txt } from "@motion-canvas/2d";
import { createRef, beginSlide } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const title = createRef<Txt>();

  view.add(
    <Txt ref={title} text="La Mia Presentazione" fontSize={60} />
  );

  yield* title().opacity(1, 1);
  yield* beginSlide("Titolo");
});
```

2. Importala in `src/project.ts`:

```typescript
import miaPresentazione from "./scenes/mia-presentazione?scene";

export default makeProject({
  scenes: [miaPresentazione],
});
```

## 🎨 Aggiungere Immagini

1. Inserisci le immagini nella cartella `public/`
2. Importale nella tua scena:

```typescript
import miaImmagine from "/nome-immagine.png";

// Usa l'immagine
view.add(<Img src={miaImmagine} width={800} />);
```

## 📚 Documentazione

- [Motion Canvas Docs](https://motioncanvas.io/docs/)
- [Motion Canvas Examples](https://motioncanvas.io/examples/)
- [API Reference](https://motioncanvas.io/api/)

## 🛠️ Risoluzione Problemi

### Errore: "Cannot find module"

```bash
yarn install
```

### Porta già in uso

Cambia la porta nel file di configurazione o termina il processo sulla porta 9000.

### Hot reload non funziona

Riavvia il server di sviluppo:

```bash
# Ctrl+C per terminare
yarn dev
```

## 📦 Dipendenze Principali

- **@motion-canvas/core** - Core engine
- **@motion-canvas/2d** - Componenti 2D
- **vite** - Build tool e dev server

## 📄 Licenza

Questo progetto è stato creato per scopi educativi.

## 🤝 Contributi

Per contribuire al progetto:

1. Crea una nuova branch
2. Fai le tue modifiche
3. Testa le presentazioni
4. Crea una pull request

---

**Buona creazione di slide!** 🎉
