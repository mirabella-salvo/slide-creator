import { makeProject } from "@motion-canvas/core";

// Importa tutte le tue presentazioni
// import gccIntro from "./scenes/gcc-intro?scene";
// import stack from "./scenes/stack?scene";
// import registers from "./scenes/registers?scene";
// import elfFile from "./scenes/elf-file?scene";
// import stackOverflow from "./scenes/stack-overflow?scene";
import libcAttack from "./scenes/libc-attack?scene";
import rop from "./scenes/rop?scene";
import pltGot from "./scenes/plt-got?scene";

export default makeProject({
  // Aggiungi qui le scene che vuoi usare
  // Puoi commentare/decommentare per switchare rapidamente
  scenes: [rop, pltGot, libcAttack],
});
