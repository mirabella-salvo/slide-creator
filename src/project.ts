import { makeProject } from "@motion-canvas/core";

// Importa tutte le tue presentazioni
import presentazioneGenerale from "./scenes/presentation?scene";
import presentazioneTecnica from "./scenes/presentazione-tecnica?scene";
import presentazioneMarketing from "./scenes/presentazione-marketing?scene";
import gccIntro from "./scenes/gcc-intro?scene";
import stack from "./scenes/stack?scene";
import registers from "./scenes/registers?scene";

export default makeProject({
  // Aggiungi qui le scene che vuoi usare
  // Puoi commentare/decommentare per switchare rapidamente
  scenes: [
    gccIntro,
    stack,
    registers,
    // presentazioneGenerale,
    // presentazioneTecnica,
    // presentazioneMarketing,
  ],
});
