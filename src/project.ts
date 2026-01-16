import { makeProject } from "@motion-canvas/core";

// Importa tutte le tue presentazioni
import presentazioneGenerale from "./scenes/presentation?scene";
import presentazioneTecnica from "./scenes/presentazione-tecnica?scene";
import presentazioneMarketing from "./scenes/presentazione-marketing?scene";

export default makeProject({
  // Aggiungi qui le scene che vuoi usare
  // Puoi commentare/decommentare per switchare rapidamente
  scenes: [presentazioneGenerale, presentazioneTecnica, presentazioneMarketing],
});
