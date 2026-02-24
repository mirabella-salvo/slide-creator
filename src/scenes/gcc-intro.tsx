import { Rect, makeScene2D, Txt, Line, Circle } from "@motion-canvas/2d";
import { all, createRef, beginSlide } from "@motion-canvas/core";
import {
  SlideTitle,
  PhaseBox,
  ExecutableBox,
  SourceCodeBox,
} from "../components";

export default makeScene2D(function* (view) {
  // Slide 1: Titolo - Compiler Toolchain
  const titleSlide = SlideTitle({
    title: "Compiler Toolchain",
    subtitle: "From source code to executable",
    titleColor: "#ce9178",
    subtitleColor: "#9cdcfe",
    titleFontSize: 70,
    subtitleFontSize: 40,
    y: 0,
  });

  titleSlide.nodes.forEach((node) => node && view.add(node));

  yield* all(
    titleSlide.titleRef().opacity(1, 1),
    titleSlide.titleRef().scale(1.1, 0.5).to(1, 0.5),
  );

  yield* titleSlide.subtitleRef().opacity(1, 0.8);

  yield* beginSlide("Compiler Toolchain - Titolo");

  // Slide 2: Le 4 Fasi del Compilatore
  const phasesTitle = createRef<Txt>();
  const containerBox = createRef<Rect>();

  // Arrows between phases
  const arrowPre = createRef<Line>();
  const arrowComp = createRef<Line>();
  const arrowAsm = createRef<Line>();
  const arrowIn = createRef<Line>();
  const arrowOut = createRef<Line>();

  view.add(
    <Txt
      ref={phasesTitle}
      text="The 4 Compiler Phases"
      fontSize={60}
      fill={"#dcdcaa"}
      y={-330}
      opacity={0}
    />,
  );

  // Container box con bordo tratteggiato
  view.add(
    <Rect
      ref={containerBox}
      width={1300}
      height={350}
      fill={"#1a1a2e"}
      stroke={"#569cd6"}
      lineWidth={3}
      lineDash={[10, 10]}
      y={50}
      opacity={0}
      radius={15}
    />,
  );

  // Source code box (sinistra)
  const sourceCodeBox = SourceCodeBox({
    filename: "main.c",
    x: -780,
    y: 50,
  });

  sourceCodeBox.nodes.forEach((node) => node && view.add(node));

  // Arrow IN (sinistra) - appare DOPO main.c
  view.add(
    <Line
      ref={arrowIn}
      points={[
        [-700, 50],
        [-600, 50],
      ]}
      stroke={"#ffffff"}
      lineWidth={5}
      endArrow
      arrowSize={18}
      opacity={0}
    />,
  );

  // 1. Pre-Processor
  const prePhase = PhaseBox({
    title: "Pre-Processor",
    description: "#include\n#define\nmacro",
    color: "#569cd6",
    x: -435,
    y: 50,
  });

  prePhase.nodes.forEach((node) => node && view.add(node));

  // Arrow dopo Pre-Processor (tra Pre-Processor x=-435 e Compiler x=-145)
  view.add(
    <Line
      ref={arrowPre}
      points={[
        [-340, 50],
        [-240, 50],
      ]}
      stroke={"#ffffff"}
      lineWidth={4}
      endArrow
      arrowSize={16}
      opacity={0}
    />,
  );

  // 2. Compiler
  const compPhase = PhaseBox({
    title: "Compiler",
    description: "C code\n→\nAssembly",
    color: "#4ec9b0",
    x: -145,
    y: 50,
  });

  compPhase.nodes.forEach((node) => node && view.add(node));

  // Arrow dopo Compiler (tra Compiler x=-145 e Assembler x=145)
  view.add(
    <Line
      ref={arrowComp}
      points={[
        [-50, 50],
        [50, 50],
      ]}
      stroke={"#ffffff"}
      lineWidth={4}
      endArrow
      arrowSize={16}
      opacity={0}
    />,
  );

  // 3. Assembler
  const asmPhase = PhaseBox({
    title: "Assembler",
    description: "Assembly\n→\nMachine code",
    color: "#c586c0",
    x: 145,
    y: 50,
  });

  asmPhase.nodes.forEach((node) => node && view.add(node));

  // Arrow dopo Assembler (tra Assembler x=145 e Linker x=435)
  view.add(
    <Line
      ref={arrowAsm}
      points={[
        [240, 50],
        [340, 50],
      ]}
      stroke={"#ffffff"}
      lineWidth={4}
      endArrow
      arrowSize={16}
      opacity={0}
    />,
  );

  // 4. Linker - aggiornato con main.o e libc
  const linkPhase = PhaseBox({
    title: "Linker",
    description: "main.o\n+\nlibc",
    color: "#ce9178",
    x: 435,
    y: 50,
  });

  linkPhase.nodes.forEach((node) => node && view.add(node));

  // Arrow OUT (destra) - da Linker x=435 a eseguibile x=750
  view.add(
    <Line
      ref={arrowOut}
      points={[
        [530, 50],
        [630, 50],
      ]}
      stroke={"#ffffff"}
      lineWidth={5}
      endArrow
      arrowSize={18}
      opacity={0}
    />,
  );

  // Eseguibile finale
  const executableBox = ExecutableBox({
    filename: "main",
    x: 750,
    y: 50,
  });

  executableBox.nodes.forEach((node) => node && view.add(node));

  // ============ SLIDE PRE-PROCESSOR ZOOM ============
  // Box per gli esempi del Pre-Processor
  const preZoomBox = createRef<Rect>();
  const preZoomTitle = createRef<Txt>();

  // Esempio 1: #define LEN
  const defLenLine1 = createRef<Txt>();
  const defLenLine2 = createRef<Txt>();
  const defLenLine3 = createRef<Txt>();
  const defLenLine4 = createRef<Txt>();
  const defLenHighlight1 = createRef<Rect>();
  const defLenHighlight2 = createRef<Rect>();
  const defLenHighlight3 = createRef<Rect>();

  // Esempio 1.5: #define VALUE rand()
  const defValueBox = createRef<Rect>();
  const defValueTitle = createRef<Txt>();
  const defValueLine1 = createRef<Txt>();
  const defValueLine2 = createRef<Txt>();
  const defValueLine3 = createRef<Txt>();
  const defValueLine4 = createRef<Txt>();
  const defValueHighlight1 = createRef<Rect>();
  const defValueHighlight2 = createRef<Rect>();
  const defValueHighlight3 = createRef<Rect>();

  // Posizione base per il codice (allineato a sinistra)
  const codeBaseX = -280;
  const charWidth = 14.5; // larghezza approssimativa carattere monospace 24px

  view.add(
    <Rect
      ref={preZoomBox}
      width={900}
      height={450}
      fill={"#1e1e1e"}
      stroke={"#569cd6"}
      lineWidth={3}
      x={0}
      y={30}
      opacity={0}
      scale={0.1}
      radius={10}
    />,
  );

  view.add(
    <Txt
      ref={preZoomTitle}
      text="Pre-Processor: #define"
      fontSize={50}
      fill={"#569cd6"}
      fontWeight={600}
      y={-250}
      opacity={0}
    />,
  );

  // Codice esempio #define LEN - allineato a sinistra
  view.add(
    <Txt
      ref={defLenLine1}
      text="#define LEN 200"
      fontSize={28}
      fill={"#c586c0"}
      fontFamily={"monospace"}
      textAlign={"left"}
      x={codeBaseX}
      y={-100}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={defLenLine2}
      text="int array[LEN];"
      fontSize={28}
      fill={"#9cdcfe"}
      fontFamily={"monospace"}
      textAlign={"left"}
      x={codeBaseX}
      y={-40}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={defLenLine3}
      text="for (int i = 0; i < LEN; i++)"
      fontSize={28}
      fill={"#9cdcfe"}
      fontFamily={"monospace"}
      textAlign={"left"}
      x={codeBaseX + 110}
      y={20}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={defLenLine4}
      text="// After: array[200], i < 200"
      fontSize={24}
      fill={"#6a9955"}
      fontFamily={"monospace"}
      textAlign={"left"}
      x={codeBaseX + 60}
      y={120}
      opacity={0}
    />,
  );

  // Highlights per LEN - posizionati come figli del preZoomBox per zoom corretto
  // Calcoli: textCenter=-280, charWidth~14.5px per font 28px monospace
  // Linea 1: "#define LEN 200" - LEN inizia a char 8, centro LEN a x=-251
  view.add(
    <Rect
      ref={defLenHighlight1}
      width={52}
      height={36}
      fill={"#dcdcaa33"}
      stroke={"#dcdcaa"}
      lineWidth={2}
      x={-248.5}
      y={-100}
      opacity={0}
      radius={4}
    />,
  );

  // Linea 2: "int array[LEN];" - LEN inizia a char 10, centro LEN a x=-222
  view.add(
    <Rect
      ref={defLenHighlight2}
      width={52}
      height={36}
      fill={"#dcdcaa33"}
      stroke={"#dcdcaa"}
      lineWidth={2}
      x={-218}
      y={-40}
      opacity={0}
      radius={4}
    />,
  );

  // Linea 3: "for (int i = 0; i < LEN; i++)" - spostato di 110px, quindi x=-178+110=-68
  view.add(
    <Rect
      ref={defLenHighlight3}
      width={52}
      height={36}
      fill={"#dcdcaa33"}
      stroke={"#dcdcaa"}
      lineWidth={2}
      x={-61}
      y={20}
      opacity={0}
      radius={4}
    />,
  );

  // ============ ESEMPIO 1.5: #define VALUE rand() ============
  view.add(
    <Rect
      ref={defValueBox}
      width={900}
      height={450}
      fill={"#1e1e1e"}
      stroke={"#569cd6"}
      lineWidth={3}
      x={0}
      y={30}
      opacity={0}
      scale={0.1}
      radius={10}
    />,
  );

  view.add(
    <Txt
      ref={defValueTitle}
      text="Pre-Processor: #define (2)"
      fontSize={50}
      fill={"#569cd6"}
      fontWeight={600}
      y={-250}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={defValueLine1}
      text="#define VALUE rand()"
      fontSize={28}
      fill={"#c586c0"}
      fontFamily={"monospace"}
      textAlign={"left"}
      x={codeBaseX}
      y={-100}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={defValueLine2}
      text="int array[VALUE];"
      fontSize={28}
      fill={"#9cdcfe"}
      fontFamily={"monospace"}
      textAlign={"left"}
      x={codeBaseX}
      y={-40}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={defValueLine3}
      text="for (int i = 0; i < VALUE; i++)"
      fontSize={28}
      fill={"#9cdcfe"}
      fontFamily={"monospace"}
      textAlign={"left"}
      x={codeBaseX + 130}
      y={20}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={defValueLine4}
      text="// After: array[rand()], i < rand()"
      fontSize={24}
      fill={"#6a9955"}
      fontFamily={"monospace"}
      textAlign={"left"}
      x={codeBaseX + 90}
      y={120}
      opacity={0}
    />,
  );

  // Highlights per VALUE - "VALUE" è 5 caratteri, width ~80px
  // Linea 1: "#define VALUE rand()" - VALUE inizia a char 8
  view.add(
    <Rect
      ref={defValueHighlight1}
      width={80}
      height={36}
      fill={"#dcdcaa33"}
      stroke={"#dcdcaa"}
      lineWidth={2}
      x={-271.5}
      y={-100}
      opacity={0}
      radius={4}
    />,
  );

  // Linea 2: "int array[VALUE];" - VALUE inizia a char 10
  view.add(
    <Rect
      ref={defValueHighlight2}
      width={80}
      height={36}
      fill={"#dcdcaa33"}
      stroke={"#dcdcaa"}
      lineWidth={2}
      x={-218}
      y={-40}
      opacity={0}
      radius={4}
    />,
  );

  // Linea 3: "for (int i = 0; i < VALUE; i++)" - spostato di 130px
  view.add(
    <Rect
      ref={defValueHighlight3}
      width={80}
      height={36}
      fill={"#dcdcaa33"}
      stroke={"#dcdcaa"}
      lineWidth={2}
      x={-44}
      y={20}
      opacity={0}
      radius={4}
    />,
  );

  // ============ ESEMPIO 2: #include ============
  const includeBox = createRef<Rect>();
  const includeTitle = createRef<Txt>();

  // Box codice sorgente (sinistra)
  const inclSrcBox = createRef<Rect>();
  const inclSrcTitle = createRef<Txt>();
  const inclSrcLine1 = createRef<Txt>(); // #include <stdio.h>
  const inclSrcLine2 = createRef<Txt>(); // int main() {
  const inclSrcLine3 = createRef<Txt>(); //     printf("Hello!");
  const inclSrcLine4 = createRef<Txt>(); //     return 0;
  const inclSrcLine5 = createRef<Txt>(); // }

  // Box libreria (destra)
  const inclLibBox = createRef<Rect>();
  const inclLibTitle = createRef<Txt>();
  const inclLibLine1 = createRef<Txt>(); // int printf(const char*, ...);
  const inclLibLine2 = createRef<Txt>(); // int scanf(const char*, ...);
  const inclLibLine3 = createRef<Txt>(); // int fprintf(FILE*, ...);
  const inclLibLine4 = createRef<Txt>(); // int sprintf(char*, ...);
  const inclLibLine5 = createRef<Txt>(); // ...

  // Freccia animata (da libreria a codice)
  const inclArrow = createRef<Line>();

  // Righe risultato (codice C copiato da stdio.h, appare al posto di #include)
  const inclResultLine1 = createRef<Txt>();
  const inclResultLine2 = createRef<Txt>();
  const inclResultLine3 = createRef<Txt>();

  // --- Container box #include ---
  view.add(
    <Rect
      ref={includeBox}
      width={1100}
      height={500}
      fill={"#1e1e1e"}
      stroke={"#569cd6"}
      lineWidth={3}
      x={0}
      y={30}
      opacity={0}
      radius={10}
    />,
  );

  view.add(
    <Txt
      ref={includeTitle}
      text="Pre-Processor: #include"
      fontSize={50}
      fill={"#569cd6"}
      fontWeight={600}
      y={-260}
      opacity={0}
    />,
  );

  // --- Box sinistra: main.c ---
  view.add(
    <Rect
      ref={inclSrcBox}
      width={380}
      height={280}
      fill={"#252526"}
      stroke={"#569cd6"}
      lineWidth={2}
      x={-250}
      y={40}
      opacity={0}
      radius={8}
    />,
  );

  view.add(
    <Txt
      ref={inclSrcTitle}
      text="main.c"
      fontSize={20}
      fill={"#569cd6"}
      fontWeight={600}
      x={-250}
      y={-85}
      opacity={0}
    />,
  );

  const srcCodeX = -415;

  view.add(
    <Txt
      ref={inclSrcLine1}
      text="#include <stdio.h>"
      fontSize={16}
      fill={"#c586c0"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={srcCodeX}
      y={-50}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={inclSrcLine2}
      text="int main() {"
      fontSize={16}
      fill={"#569cd6"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={srcCodeX}
      y={-15}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={inclSrcLine3}
      text='    printf("Hello!");'
      fontSize={16}
      fill={"#dcdcaa"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={srcCodeX}
      y={15}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={inclSrcLine4}
      text="    return 0;"
      fontSize={16}
      fill={"#ce9178"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={srcCodeX}
      y={45}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={inclSrcLine5}
      text="}"
      fontSize={16}
      fill={"#ffffff"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={srcCodeX}
      y={75}
      opacity={0}
    />,
  );

  // --- Box destra: stdio.h ---
  view.add(
    <Rect
      ref={inclLibBox}
      width={380}
      height={280}
      fill={"#252526"}
      stroke={"#4ec9b0"}
      lineWidth={2}
      x={250}
      y={40}
      opacity={0}
      radius={8}
    />,
  );

  view.add(
    <Txt
      ref={inclLibTitle}
      text="stdio.h"
      fontSize={20}
      fill={"#4ec9b0"}
      fontWeight={600}
      x={250}
      y={-85}
      opacity={0}
    />,
  );

  const libCodeX = 85;

  view.add(
    <Txt
      ref={inclLibLine1}
      text="int printf(const char*, ...);"
      fontSize={14}
      fill={"#4ec9b0"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={libCodeX}
      y={-40}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={inclLibLine2}
      text="int scanf(const char*, ...);"
      fontSize={14}
      fill={"#4ec9b0"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={libCodeX}
      y={-10}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={inclLibLine3}
      text="int fprintf(FILE*, ...);"
      fontSize={14}
      fill={"#4ec9b0"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={libCodeX}
      y={20}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={inclLibLine4}
      text="int sprintf(char*, ...);"
      fontSize={14}
      fill={"#4ec9b0"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={libCodeX}
      y={50}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={inclLibLine5}
      text="..."
      fontSize={14}
      fill={"#6a9955"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={libCodeX}
      y={80}
      opacity={0}
    />,
  );

  // --- Freccia da stdio.h a main.c ---
  view.add(
    <Line
      ref={inclArrow}
      points={[
        [60, 40],
        [-60, 40],
      ]}
      stroke={"#dcdcaa"}
      lineWidth={4}
      endArrow
      arrowSize={16}
      opacity={0}
    />,
  );

  // --- Righe risultato (appaiono al posto di #include) ---
  view.add(
    <Txt
      ref={inclResultLine1}
      text="int printf(const char*, ...);"
      fontSize={13}
      fill={"#4ec9b0"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={srcCodeX}
      y={-50}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={inclResultLine2}
      text="int scanf(const char*, ...);"
      fontSize={13}
      fill={"#4ec9b0"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={srcCodeX}
      y={-35}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={inclResultLine3}
      text="..."
      fontSize={13}
      fill={"#6a9955"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={srcCodeX}
      y={-20}
      opacity={0}
    />,
  );

  // ============ ESEMPIO COMPILER: C to Assembly ============
  const compZoomBox = createRef<Rect>();
  const compZoomTitle = createRef<Txt>();
  const cCodeBox = createRef<Rect>();
  const cCodeTitle = createRef<Txt>();
  const cCodeLine1 = createRef<Txt>();
  const cCodeLine2 = createRef<Txt>();
  const cCodeLine3 = createRef<Txt>();
  const cCodeLine4 = createRef<Txt>();
  const compArrow = createRef<Line>();
  const compGear1 = createRef<Txt>();
  const compGear2 = createRef<Txt>();
  const processingText = createRef<Txt>();
  const cCodeCopy = createRef<Rect>(); // Copia visiva del box C che si muove
  const asmCodeBox = createRef<Rect>();
  const asmCodeTitle = createRef<Txt>();
  const asmLine1 = createRef<Txt>();
  const asmLine2 = createRef<Txt>();
  const asmLine3 = createRef<Txt>();
  const asmLine4 = createRef<Txt>();
  const asmLine5 = createRef<Txt>();
  const asmLine6 = createRef<Txt>();
  const asmLine7 = createRef<Txt>();
  const asmLine8 = createRef<Txt>();
  const asmLine9 = createRef<Txt>();
  const asmLine10 = createRef<Txt>();
  const asmLine11 = createRef<Txt>();
  const asmLine12 = createRef<Txt>();

  // ============ ESEMPIO ASSEMBLER: Assembly to Binary ============
  const asmZoomBox = createRef<Rect>();
  const asmZoomTitle = createRef<Txt>();
  const asmSrcBox = createRef<Rect>();
  const asmSrcTitle = createRef<Txt>();
  const asmSrcLine1 = createRef<Txt>();
  const asmSrcLine2 = createRef<Txt>();
  const asmSrcLine3 = createRef<Txt>();
  const asmSrcLine4 = createRef<Txt>();
  const asmSrcLine5 = createRef<Txt>();
  const asmSrcLine6 = createRef<Txt>();
  const asmSrcCopy = createRef<Rect>();
  const asmGear1 = createRef<Txt>();
  const asmGear2 = createRef<Txt>();
  const asmProcessingText = createRef<Txt>();
  const binCodeBox = createRef<Rect>();
  const binCodeTitle = createRef<Txt>();
  const binLine1 = createRef<Txt>();
  const binLine2 = createRef<Txt>();
  const binLine3 = createRef<Txt>();
  const binLine4 = createRef<Txt>();
  const binLine5 = createRef<Txt>();
  const binLine6 = createRef<Txt>();
  const binLine7 = createRef<Txt>();
  const binLine8 = createRef<Txt>();
  const binLine9 = createRef<Txt>();
  const binLine10 = createRef<Txt>();
  const binLine11 = createRef<Txt>();
  const binLine12 = createRef<Txt>();
  const binLine13 = createRef<Txt>();

  // ============ ESEMPIO LINKER: main.o + stdio.o → EXE ============
  const linkZoomBox = createRef<Rect>();
  const linkZoomTitle = createRef<Txt>();
  const linkMainBox = createRef<Rect>();
  const linkMainTitle = createRef<Txt>();
  const linkMainBin = createRef<Txt>();
  const linkStdioBox = createRef<Rect>();
  const linkStdioTitle = createRef<Txt>();
  const linkStdioBin = createRef<Txt>();
  const linkMainBinExpand = createRef<Txt>();
  const linkStdioBinExpand = createRef<Txt>();
  const linkBinWall = createRef<Txt>();
  const linkExeBox = createRef<Rect>();
  const linkExeIcon = createRef<Txt>();
  const linkExeLabel = createRef<Txt>();
  const linkExeName = createRef<Txt>();
  const linkGear1 = createRef<Txt>();
  const linkGear2 = createRef<Txt>();
  const linkProcessingText = createRef<Txt>();



  view.add(
    <Rect
      ref={compZoomBox}
      width={1200}
      height={620}
      fill={"#0d1117"}
      stroke={"#4ec9b0"}
      lineWidth={3}
      x={0}
      y={50}
      opacity={0}
      radius={10}
    />,
  );

  view.add(
    <Txt
      ref={compZoomTitle}
      text="Compiler: C → Assembly"
      fontSize={40}
      fill={"#4ec9b0"}
      fontWeight={600}
      y={-290}
      opacity={0}
    />,
  );

  // Box codice C
  view.add(
    <Rect
      ref={cCodeBox}
      width={400}
      height={220}
      fill={"#1e1e1e"}
      stroke={"#569cd6"}
      lineWidth={2}
      x={-350}
      y={50}
      opacity={0}
      radius={8}
    />,
  );

  // Copia visiva del box C (si muove da sinistra → centro → destra)
  view.add(
    <Rect
      ref={cCodeCopy}
      width={400}
      height={220}
      fill={"#1e1e1e"}
      stroke={"#569cd6"}
      lineWidth={2}
      x={-350}
      y={50}
      opacity={0}
      radius={8}
    />,
  );

  view.add(
    <Txt
      ref={cCodeTitle}
      text="C Code"
      fontSize={24}
      fill={"#569cd6"}
      fontWeight={600}
      x={-350}
      y={-95}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={cCodeLine1}
      text="int sum(int a, int b)"
      fontSize={18}
      fill={"#9cdcfe"}
      fontFamily={"monospace"}
      textAlign={"left"}
      x={-350}
      y={-30}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={cCodeLine2}
      text="{"
      fontSize={18}
      fill={"#ffffff"}
      fontFamily={"monospace"}
      textAlign={"left"}
      x={-420}
      y={0}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={cCodeLine3}
      text="    return a + b;"
      fontSize={18}
      fill={"#ce9178"}
      fontFamily={"monospace"}
      textAlign={"left"}
      x={-350}
      y={30}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={cCodeLine4}
      text="}"
      fontSize={18}
      fill={"#ffffff"}
      fontFamily={"monospace"}
      textAlign={"left"}
      x={-420}
      y={60}
      opacity={0}
    />,
  );

  // Freccia trasformazione
  view.add(
    <Line
      ref={compArrow}
      points={[
        [-100, 70],
        [50, 70],
      ]}
      stroke={"#dcdcaa"}
      lineWidth={4}
      endArrow
      arrowSize={16}
      opacity={0}
    />,
  );

  // Ingranaggio grande (ruota orario)
  view.add(
    <Txt
      ref={compGear1}
      text="⚙"
      fontSize={80}
      fill={"#ce9178"}
      x={-25}
      y={40}
      opacity={0}
    />,
  );
  // Ingranaggio piccolo (ruota antiorario)
  view.add(
    <Txt
      ref={compGear2}
      text="⚙"
      fontSize={50}
      fill={"#dcdcaa"}
      x={30}
      y={75}
      opacity={0}
    />,
  );

  // Processing text (appare durante l'animazione dell'ingranaggio)
  view.add(
    <Txt
      ref={processingText}
      text="Processing..."
      fontSize={24}
      fill={"#dcdcaa"}
      fontWeight={600}
      x={0}
      y={-10}
      opacity={0}
    />,
  );

  // Box codice Assembly
  view.add(
    <Rect
      ref={asmCodeBox}
      width={450}
      height={420}
      fill={"#1e1e1e"}
      stroke={"#c586c0"}
      lineWidth={2}
      x={300}
      y={70}
      opacity={0}
      radius={8}
    />,
  );

  view.add(
    <Txt
      ref={asmCodeTitle}
      text="x86-64 Assembly"
      fontSize={24}
      fill={"#c586c0"}
      fontWeight={600}
      x={300}
      y={-175}
      opacity={0}
    />,
  );

  // Assembly: offset={[-1, 0]} ancora il testo al bordo sinistro
  const asmLeftX = 120; // bordo sinistro per la label
  const asmIndentX = 150; // bordo sinistro + indentazione per le istruzioni

  view.add(
    <Txt
      ref={asmLine1}
      text="sum:"
      fontSize={14}
      fill={"#dcdcaa"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={asmLeftX}
      y={-80}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={asmLine2}
      text="push rbp"
      fontSize={14}
      fill={"#9cdcfe"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={asmIndentX}
      y={-58}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={asmLine3}
      text="mov rbp, rsp"
      fontSize={14}
      fill={"#9cdcfe"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={asmIndentX}
      y={-36}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={asmLine4}
      text="mov QWORD PTR [rbp-24], rdi"
      fontSize={14}
      fill={"#9cdcfe"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={asmIndentX}
      y={-14}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={asmLine5}
      text="mov QWORD PTR [rbp-32], rsi"
      fontSize={14}
      fill={"#9cdcfe"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={asmIndentX}
      y={8}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={asmLine6}
      text="mov rdx, QWORD PTR [rbp-24]"
      fontSize={14}
      fill={"#9cdcfe"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={asmIndentX}
      y={30}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={asmLine7}
      text="mov rax, QWORD PTR [rbp-32]"
      fontSize={14}
      fill={"#9cdcfe"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={asmIndentX}
      y={52}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={asmLine8}
      text="add rax, rdx"
      fontSize={14}
      fill={"#ce9178"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={asmIndentX}
      y={74}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={asmLine9}
      text="mov QWORD PTR [rbp-8], rax"
      fontSize={14}
      fill={"#9cdcfe"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={asmIndentX}
      y={96}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={asmLine10}
      text="mov rax, QWORD PTR [rbp-8]"
      fontSize={14}
      fill={"#9cdcfe"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={asmIndentX}
      y={118}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={asmLine11}
      text="pop rbp"
      fontSize={14}
      fill={"#9cdcfe"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={asmIndentX}
      y={140}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={asmLine12}
      text="ret"
      fontSize={14}
      fill={"#dcdcaa"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={asmIndentX}
      y={162}
      opacity={0}
    />,
  );

  // ============ ELEMENTI ASSEMBLER ZOOM ============

  // Container zoom Assembler
  view.add(
    <Rect
      ref={asmZoomBox}
      width={1200}
      height={620}
      fill={"#0d1117"}
      stroke={"#c586c0"}
      lineWidth={3}
      x={0}
      y={50}
      opacity={0}
      radius={10}
    />,
  );

  view.add(
    <Txt
      ref={asmZoomTitle}
      text="Assembler: Assembly → Machine Code"
      fontSize={40}
      fill={"#c586c0"}
      fontWeight={600}
      x={0}
      y={-290}
      opacity={0}
    />,
  );

  // Box sinistra: Assembly code
  view.add(
    <Rect
      ref={asmSrcBox}
      width={400}
      height={300}
      fill={"#1e1e1e"}
      stroke={"#c586c0"}
      lineWidth={2}
      x={-350}
      y={50}
      opacity={0}
      radius={8}
    />,
  );

  // Copia visiva del box Assembly (si muove da sinistra → centro)
  view.add(
    <Rect
      ref={asmSrcCopy}
      width={400}
      height={300}
      fill={"#1e1e1e"}
      stroke={"#c586c0"}
      lineWidth={2}
      x={-350}
      y={50}
      opacity={0}
      radius={8}
    />,
  );

  view.add(
    <Txt
      ref={asmSrcTitle}
      text="Assembly"
      fontSize={24}
      fill={"#c586c0"}
      fontWeight={600}
      x={-350}
      y={-120}
      opacity={0}
    />,
  );

  const asmSrcLeftX = -510;
  const asmSrcIndentX = -480;

  view.add(
    <Txt
      ref={asmSrcLine1}
      text="sum:"
      fontSize={16}
      fill={"#dcdcaa"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={asmSrcLeftX}
      y={-50}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={asmSrcLine2}
      text="push rbp"
      fontSize={16}
      fill={"#9cdcfe"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={asmSrcIndentX}
      y={-25}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={asmSrcLine3}
      text="mov rbp, rsp"
      fontSize={16}
      fill={"#9cdcfe"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={asmSrcIndentX}
      y={0}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={asmSrcLine4}
      text="mov QWORD PTR [rbp-24], rdi"
      fontSize={16}
      fill={"#9cdcfe"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={asmSrcIndentX}
      y={25}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={asmSrcLine5}
      text="add rax, rdx"
      fontSize={16}
      fill={"#ce9178"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={asmSrcIndentX}
      y={50}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={asmSrcLine6}
      text="ret"
      fontSize={16}
      fill={"#dcdcaa"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={asmSrcIndentX}
      y={75}
      opacity={0}
    />,
  );

  // Ingranaggio grande Assembler (ruota orario)
  view.add(
    <Txt
      ref={asmGear1}
      text="⚙"
      fontSize={80}
      fill={"#ce9178"}
      x={-25}
      y={40}
      opacity={0}
    />,
  );
  // Ingranaggio piccolo Assembler (ruota antiorario)
  view.add(
    <Txt
      ref={asmGear2}
      text="⚙"
      fontSize={50}
      fill={"#dcdcaa"}
      x={30}
      y={75}
      opacity={0}
    />,
  );

  // Processing text Assembler
  view.add(
    <Txt
      ref={asmProcessingText}
      text="Processing..."
      fontSize={24}
      fill={"#dcdcaa"}
      fontWeight={600}
      x={0}
      y={-10}
      opacity={0}
    />,
  );

  // Box destra: Binary/Machine code (main.o)
  view.add(
    <Rect
      ref={binCodeBox}
      width={160}
      height={280}
      fill={"#1e1e1e"}
      stroke={"#ce9178"}
      lineWidth={2}
      x={300}
      y={50}
      opacity={0}
      radius={8}
    />,
  );

  view.add(
    <Txt
      ref={binCodeTitle}
      text="main.o"
      fontSize={22}
      fill={"#ce9178"}
      fontWeight={600}
      x={300}
      y={-110}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={binLine1}
      text="0101010101001000"
      fontSize={14}
      fill={"#808080"}
      fontFamily={"monospace"}
      x={300}
      y={-31}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={binLine2}
      text="1110010101001000"
      fontSize={14}
      fill={"#808080"}
      fontFamily={"monospace"}
      x={300}
      y={-13}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={binLine3}
      text="0111110111101000"
      fontSize={14}
      fill={"#808080"}
      fontFamily={"monospace"}
      x={300}
      y={5}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={binLine4}
      text="0000000111010000"
      fontSize={14}
      fill={"#808080"}
      fontFamily={"monospace"}
      x={300}
      y={23}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={binLine5}
      text="0101110111000011"
      fontSize={14}
      fill={"#808080"}
      fontFamily={"monospace"}
      x={300}
      y={41}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={binLine6}
      text="1001000001001000"
      fontSize={14}
      fill={"#808080"}
      fontFamily={"monospace"}
      x={300}
      y={59}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={binLine7}
      text="1100101010110100"
      fontSize={14}
      fill={"#808080"}
      fontFamily={"monospace"}
      x={300}
      y={77}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={binLine8}
      text="0010110001110010"
      fontSize={14}
      fill={"#808080"}
      fontFamily={"monospace"}
      x={300}
      y={95}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={binLine9}
      text="1011001001010101"
      fontSize={14}
      fill={"#808080"}
      fontFamily={"monospace"}
      x={300}
      y={113}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={binLine10}
      text="0100011100101010"
      fontSize={14}
      fill={"#808080"}
      fontFamily={"monospace"}
      x={300}
      y={131}
      opacity={0}
    />,
  );

  // ============ ELEMENTI LINKER ZOOM ============

  // Container zoom Linker
  view.add(
    <Rect
      ref={linkZoomBox}
      width={1200}
      height={620}
      fill={"#0d1117"}
      stroke={"#ce9178"}
      lineWidth={3}
      x={0}
      y={50}
      opacity={0}
      radius={10}
    />,
  );

  view.add(
    <Txt
      ref={linkZoomTitle}
      text="Linker"
      fontSize={50}
      fill={"#ce9178"}
      fontWeight={600}
      x={0}
      y={-290}
      opacity={0}
    />,
  );

  // Box main.o (alto-sinistra)
  view.add(
    <Rect
      ref={linkMainBox}
      width={200}
      height={180}
      fill={"#1e1e1e"}
      stroke={"#ce9178"}
      lineWidth={2}
      x={-350}
      y={-50}
      opacity={0}
      radius={8}
    />,
  );

  view.add(
    <Txt
      ref={linkMainBin}
      text={
        "0011010100101000\n1001111000101010\n1101010101000011\n0011100100101010\n1001101010010100\n1100111100010101\n0110101010101101\n0100010100011100"
      }
      fontSize={10}
      fill={"#808080"}
      fontFamily={"monospace"}
      x={-350}
      y={-55}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={linkMainTitle}
      text="main.o"
      fontSize={20}
      fill={"#ce9178"}
      fontWeight={600}
      x={-350}
      y={55}
      opacity={0}
    />,
  );

  // Box stdio.o (basso-sinistra)
  view.add(
    <Rect
      ref={linkStdioBox}
      width={200}
      height={180}
      fill={"#1e1e1e"}
      stroke={"#ce9178"}
      lineWidth={2}
      x={-350}
      y={180}
      opacity={0}
      radius={8}
    />,
  );

  view.add(
    <Txt
      ref={linkStdioBin}
      text={
        "0011010100101000\n1001111000101010\n1101010101000011\n0100010100111100\n1001101010100010\n0100101001101010\n1100111000101010\n0100010100011101"
      }
      fontSize={10}
      fill={"#808080"}
      fontFamily={"monospace"}
      x={-350}
      y={175}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={linkStdioTitle}
      text="stdio.o"
      fontSize={20}
      fill={"#ce9178"}
      fontWeight={600}
      x={-350}
      y={285}
      opacity={0}
    />,
  );

  // Binario espanso main.o (fase 2)
  view.add(
    <Txt
      ref={linkMainBinExpand}
      text={
        "00110101001010001010000110100011\n10011110001010101010101010101010\n11010101010000111111000100101001\n00111001001010100100011010010001\n10011010100101001000101000101001\n11001111000101010010101010101010\n01101010101011010110100011010100\n01000101000111001001110001100011"
      }
      fontSize={10}
      fill={"#d4d4d4"}
      fontFamily={"monospace"}
      x={-150}
      y={-55}
      opacity={0}
    />,
  );

  // Binario espanso stdio.o (fase 2)
  view.add(
    <Txt
      ref={linkStdioBinExpand}
      text={
        "00110101001010001010100011001001\n10011110001010100110011101110001\n11010101010000110100010100111100\n01000101001111001001110100010001\n10011010101000101010010110100001\n01001010011010100011001111000101\n11001110001010100100101001101010\n01000101000111010010100011010010"
      }
      fontSize={10}
      fill={"#d4d4d4"}
      fontFamily={"monospace"}
      x={-150}
      y={175}
      opacity={0}
    />,
  );

  // Muro di binario (fase 3)
  view.add(
    <Txt
      ref={linkBinWall}
      text={
        "0011010100101010001010000110100011\n1001111100010101010101010101010010\n1101010101010000111111000100101001\n0011100100101010010001101001000101\n1001101010010100100010100010100110\n1100111100010101001010101010101001\n0110101010101101011010001101010010\n0100010100011100100111000110001110\n0100010100111100100111010001000101\n1001101010100010101001011010000110\n0100101001101010001100111100010101\n1100111000101010010010100110101001\n0100010100011101001010001101001010\n0011010100101000101010001100100110\n1001111000101010011001110111000110\n1101010101000011010001010011110010\n0100010100111100100111010001000100\n1001101010100010101001011010000110\n0100101001101010001100111100010110\n1100111000101010010010100110101001\n0100010100011101001010001101001010\n1001101010010100100010100010100110\n1100111100010101001010101010101001"
      }
      fontSize={11}
      fill={"#ffffff"}
      fontFamily={"monospace"}
      x={0}
      y={50}
      opacity={0}
    />,
  );

  // EXE box (fase 4)
  view.add(
    <Rect
      ref={linkExeBox}
      width={160}
      height={200}
      fill={"#2d2d30"}
      stroke={"#ce9178"}
      lineWidth={3}
      x={0}
      y={30}
      opacity={0}
      radius={8}
    />,
  );

  view.add(
    <Txt
      ref={linkExeIcon}
      text={"010101\n101010\n110011\n010110"}
      fontSize={12}
      fill={"#808080"}
      fontFamily={"monospace"}
      x={0}
      y={-20}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={linkExeLabel}
      text="EXE"
      fontSize={32}
      fill={"#ce9178"}
      fontWeight={800}
      x={0}
      y={30}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={linkExeName}
      text="main"
      fontSize={24}
      fill={"#ffffff"}
      fontWeight={600}
      x={0}
      y={90}
      opacity={0}
    />,
  );

  // ============ GEAR LINKER ============

  // Ingranaggio grande (ruota orario)
  view.add(
    <Txt
      ref={linkGear1}
      text="⚙"
      fontSize={80}
      fill={"#ce9178"}
      x={-30}
      y={40}
      opacity={0}
    />,
  );

  // Ingranaggio piccolo (ruota antiorario)
  view.add(
    <Txt
      ref={linkGear2}
      text="⚙"
      fontSize={50}
      fill={"#dcdcaa"}
      x={30}
      y={75}
      opacity={0}
    />,
  );

  // Processing text linker
  view.add(
    <Txt
      ref={linkProcessingText}
      text="Linking..."
      fontSize={24}
      fill={"#dcdcaa"}
      fontWeight={600}
      x={0}
      y={-10}
      opacity={0}
    />,
  );



  // ============ ANIMAZIONI ============

  // Nascondi titolo iniziale
  yield* all(
    titleSlide.titleRef().opacity(0, 0.5),
    titleSlide.subtitleRef().opacity(0, 0.5),
  );

  // Mostra titoli
  yield* phasesTitle().opacity(1, 0.8);

  // Mostra container
  yield* containerBox().opacity(1, 0.6);

  yield* beginSlide("Container");

  // Mostra source code box (main.c)
  yield* all(
    sourceCodeBox.containerRef().opacity(1, 0.6),
    sourceCodeBox.iconRef().opacity(1, 0.6),
    sourceCodeBox.filenameRef().opacity(1, 0.6),
  );

  // Mostra le linee di codice una alla volta
  yield* sourceCodeBox.line1Ref().opacity(1, 0.3);
  yield* sourceCodeBox.line2Ref().opacity(1, 0.3);
  yield* sourceCodeBox.line3Ref().opacity(1, 0.3);
  yield* sourceCodeBox.line4Ref().opacity(1, 0.3);
  yield* sourceCodeBox.line5Ref().opacity(1, 0.3);
  yield* sourceCodeBox.line6Ref().opacity(1, 0.3);

  yield* beginSlide("main.c");

  // Freccia appare DOPO main.c
  yield* arrowIn().opacity(1, 0.5);

  // Fase 1: Pre-Processor
  yield* all(
    prePhase.boxRef().opacity(1, 0.6),
    prePhase.titleRef().opacity(1, 0.6),
    prePhase.descRef().opacity(1, 0.6),
  );

  yield* beginSlide("Pre-Processor");

  // ============ ZOOM PRE-PROCESSOR: #define ============
  // Nascondi la vista principale
  yield* all(
    phasesTitle().opacity(0, 0.5),
    containerBox().opacity(0, 0.5),
    sourceCodeBox.containerRef().opacity(0, 0.5),
    sourceCodeBox.iconRef().opacity(0, 0.5),
    sourceCodeBox.filenameRef().opacity(0, 0.5),
    sourceCodeBox.line1Ref().opacity(0, 0.5),
    sourceCodeBox.line2Ref().opacity(0, 0.5),
    sourceCodeBox.line3Ref().opacity(0, 0.5),
    sourceCodeBox.line4Ref().opacity(0, 0.5),
    sourceCodeBox.line5Ref().opacity(0, 0.5),
    sourceCodeBox.line6Ref().opacity(0, 0.5),
    arrowIn().opacity(0, 0.5),
    prePhase.boxRef().opacity(0, 0.5),
    prePhase.titleRef().opacity(0, 0.5),
    prePhase.descRef().opacity(0, 0.5),
  );

  // ZOOM ANIMATION: Box appare piccolo e si ingrandisce
  yield* all(preZoomBox().opacity(1, 0.3), preZoomBox().scale(1, 0.8));

  // Dopo lo zoom, mostra il contenuto
  yield* preZoomTitle().opacity(1, 0.5);
  yield* defLenLine1().opacity(1, 0.4);
  yield* defLenLine2().opacity(1, 0.4);
  yield* defLenLine3().opacity(1, 0.4);

  yield* beginSlide("Pre-Processor: #define LEN");

  // Evidenzia il primo LEN
  yield* defLenHighlight1().opacity(1, 0.4);

  yield* beginSlide("Highlight #define");

  // Evidenzia gli altri LEN
  yield* all(
    defLenHighlight2().opacity(1, 0.4),
    defLenHighlight3().opacity(1, 0.4),
  );

  yield* beginSlide("Highlight other LEN");

  // Mostra risultato sostituzione
  yield* defLenLine4().opacity(1, 0.6);

  yield* beginSlide("Substitution LEN → 200");

  // Nascondi esempio #define con zoom-out
  yield* all(
    preZoomBox().opacity(0, 0.4),
    preZoomBox().scale(0.1, 0.4),
    preZoomTitle().opacity(0, 0.4),
    defLenLine1().opacity(0, 0.4),
    defLenLine2().opacity(0, 0.4),
    defLenLine3().opacity(0, 0.4),
    defLenLine4().opacity(0, 0.4),
    defLenHighlight1().opacity(0, 0.4),
    defLenHighlight2().opacity(0, 0.4),
    defLenHighlight3().opacity(0, 0.4),
  );

  // ============ ZOOM PRE-PROCESSOR: #define VALUE rand() ============
  yield* all(defValueBox().opacity(1, 0.3), defValueBox().scale(1, 0.8));

  yield* defValueTitle().opacity(1, 0.5);
  yield* defValueLine1().opacity(1, 0.4);
  yield* defValueLine2().opacity(1, 0.4);
  yield* defValueLine3().opacity(1, 0.4);

  yield* beginSlide("Pre-Processor: #define VALUE");

  // Evidenzia il primo VALUE
  yield* defValueHighlight1().opacity(1, 0.4);

  yield* beginSlide("Highlight #define VALUE");

  // Evidenzia gli altri VALUE
  yield* all(
    defValueHighlight2().opacity(1, 0.4),
    defValueHighlight3().opacity(1, 0.4),
  );

  yield* beginSlide("Highlight other VALUE");

  // Mostra risultato sostituzione
  yield* defValueLine4().opacity(1, 0.6);

  yield* beginSlide("Substitution VALUE → rand()");

  // Nascondi esempio #define VALUE con zoom-out
  yield* all(
    defValueBox().opacity(0, 0.4),
    defValueBox().scale(0.1, 0.4),
    defValueTitle().opacity(0, 0.4),
    defValueLine1().opacity(0, 0.4),
    defValueLine2().opacity(0, 0.4),
    defValueLine3().opacity(0, 0.4),
    defValueLine4().opacity(0, 0.4),
    defValueHighlight1().opacity(0, 0.4),
    defValueHighlight2().opacity(0, 0.4),
    defValueHighlight3().opacity(0, 0.4),
  );

  // ============ ZOOM PRE-PROCESSOR: #include ============
  // Zoom in animation per includeBox
  includeBox().scale(0.1);
  yield* all(includeBox().opacity(1, 0.3), includeBox().scale(1, 0.8));
  yield* includeTitle().opacity(1, 0.5);

  // Mostra box main.c con codice sorgente
  yield* all(inclSrcBox().opacity(1, 0.4), inclSrcTitle().opacity(1, 0.4));
  yield* inclSrcLine1().opacity(1, 0.3);
  yield* inclSrcLine2().opacity(1, 0.3);
  yield* inclSrcLine3().opacity(1, 0.3);
  yield* inclSrcLine4().opacity(1, 0.3);
  yield* inclSrcLine5().opacity(1, 0.3);

  yield* beginSlide("Pre-Processor: #include");

  // Mostra box stdio.h con contenuto libreria
  yield* all(inclLibBox().opacity(1, 0.4), inclLibTitle().opacity(1, 0.4));
  yield* inclLibLine1().opacity(1, 0.3);
  yield* inclLibLine2().opacity(1, 0.3);
  yield* inclLibLine3().opacity(1, 0.3);
  yield* inclLibLine4().opacity(1, 0.3);
  yield* inclLibLine5().opacity(1, 0.3);

  yield* beginSlide("#include: stdio.h content");

  // Freccia da stdio.h a main.c
  yield* inclArrow().opacity(1, 0.5);

  yield* beginSlide("#include: copy");

  // Sostituzione: #include scompare, al suo posto appaiono le dichiarazioni C copiate
  // Le righe sotto si spostano in basso per fare spazio
  yield* all(
    inclSrcLine1().opacity(0, 0.4),
    inclSrcLine2().y(5, 0.5),
    inclSrcLine3().y(35, 0.5),
    inclSrcLine4().y(65, 0.5),
    inclSrcLine5().y(95, 0.5),
  );

  yield* all(
    inclResultLine1().opacity(1, 0.4),
    inclResultLine2().opacity(1, 0.4),
    inclResultLine3().opacity(1, 0.4),
  );

  yield* beginSlide("#include expansion");

  // Nascondi #include con zoom-out e torna alla vista principale
  yield* all(
    includeBox().opacity(0, 0.4),
    includeBox().scale(0.1, 0.4),
    includeTitle().opacity(0, 0.4),
    inclSrcBox().opacity(0, 0.4),
    inclSrcTitle().opacity(0, 0.4),
    inclSrcLine1().opacity(0, 0.4),
    inclSrcLine2().opacity(0, 0.4),
    inclSrcLine3().opacity(0, 0.4),
    inclSrcLine4().opacity(0, 0.4),
    inclSrcLine5().opacity(0, 0.4),
    inclLibBox().opacity(0, 0.4),
    inclLibTitle().opacity(0, 0.4),
    inclLibLine1().opacity(0, 0.4),
    inclLibLine2().opacity(0, 0.4),
    inclLibLine3().opacity(0, 0.4),
    inclLibLine4().opacity(0, 0.4),
    inclLibLine5().opacity(0, 0.4),
    inclArrow().opacity(0, 0.4),
    inclResultLine1().opacity(0, 0.4),
    inclResultLine2().opacity(0, 0.4),
    inclResultLine3().opacity(0, 0.4),
  );

  // Ripristina vista principale con freccia Pre-Processor
  yield* all(
    phasesTitle().opacity(1, 0.5),
    containerBox().opacity(1, 0.5),
    sourceCodeBox.containerRef().opacity(1, 0.5),
    sourceCodeBox.iconRef().opacity(1, 0.5),
    sourceCodeBox.filenameRef().opacity(1, 0.5),
    sourceCodeBox.line1Ref().opacity(1, 0.5),
    sourceCodeBox.line2Ref().opacity(1, 0.5),
    sourceCodeBox.line3Ref().opacity(1, 0.5),
    sourceCodeBox.line4Ref().opacity(1, 0.5),
    sourceCodeBox.line5Ref().opacity(1, 0.5),
    sourceCodeBox.line6Ref().opacity(1, 0.5),
    arrowIn().opacity(1, 0.5),
    arrowPre().opacity(1, 0.5),
    prePhase.boxRef().opacity(1, 0.5),
    prePhase.titleRef().opacity(1, 0.5),
    prePhase.descRef().opacity(1, 0.5),
  );

  // Fase 2: Compiler
  yield* all(
    compPhase.boxRef().opacity(1, 0.6),
    compPhase.titleRef().opacity(1, 0.6),
    compPhase.descRef().opacity(1, 0.6),
  );

  yield* beginSlide("Compiler");

  // ============ ZOOM COMPILER: C to Assembly ============
  // Nascondi vista principale
  yield* all(
    phasesTitle().opacity(0, 0.5),
    containerBox().opacity(0, 0.5),
    sourceCodeBox.containerRef().opacity(0, 0.5),
    sourceCodeBox.iconRef().opacity(0, 0.5),
    sourceCodeBox.filenameRef().opacity(0, 0.5),
    sourceCodeBox.line1Ref().opacity(0, 0.5),
    sourceCodeBox.line2Ref().opacity(0, 0.5),
    sourceCodeBox.line3Ref().opacity(0, 0.5),
    sourceCodeBox.line4Ref().opacity(0, 0.5),
    sourceCodeBox.line5Ref().opacity(0, 0.5),
    sourceCodeBox.line6Ref().opacity(0, 0.5),
    arrowIn().opacity(0, 0.5),
    arrowPre().opacity(0, 0.5),
    prePhase.boxRef().opacity(0, 0.5),
    prePhase.titleRef().opacity(0, 0.5),
    prePhase.descRef().opacity(0, 0.5),
    compPhase.boxRef().opacity(0, 0.5),
    compPhase.titleRef().opacity(0, 0.5),
    compPhase.descRef().opacity(0, 0.5),
  );

  // ZOOM ANIMATION: Compiler box zooms in
  compZoomBox().scale(0.1);
  yield* all(compZoomBox().opacity(1, 0.3), compZoomBox().scale(1, 0.8));
  yield* compZoomTitle().opacity(1, 0.5);

  // FASE 1: Mostra codice C completo a sinistra
  yield* cCodeBox().opacity(1, 0.5);
  yield* cCodeTitle().opacity(1, 0.5);
  yield* cCodeLine1().opacity(1, 0.4);
  yield* cCodeLine2().opacity(1, 0.3);
  yield* cCodeLine3().opacity(1, 0.4);
  yield* cCodeLine4().opacity(1, 0.3);

  yield* beginSlide("Compiler: C Code");

  // FASE 2: Duplica box C → copia scorre al centro e si rimpicciolisce
  yield* cCodeCopy().opacity(1, 0.3);
  yield* all(cCodeCopy().x(0, 0.8), cCodeCopy().scale(0, 0.8));

  // FASE 3: Due ingranaggi girano al centro
  yield* all(compGear1().opacity(1, 0.3), compGear2().opacity(1, 0.3));
  yield* all(
    compGear1().rotation(360, 1.5),
    compGear2().rotation(-360, 1.5),
    processingText().opacity(1, 0.3),
  );

  yield* beginSlide("Compiler: Processing");

  // FASE 4: Assembly box esce dal centro e si sposta a destra
  yield* processingText().opacity(0, 0.3);
  // Posiziona asmCodeBox al centro con scale 0, poi anima verso la sua posizione finale
  asmCodeBox().x(0);
  asmCodeBox().scale(0);
  asmCodeBox().opacity(1);
  yield* all(
    asmCodeBox().x(300, 0.8),
    asmCodeBox().scale(1, 0.8),
    compGear1().opacity(0, 0.4),
    compGear2().opacity(0, 0.4),
  );
  yield* asmCodeTitle().opacity(1, 0.5);
  yield* asmLine1().opacity(1, 0.3);
  yield* asmLine2().opacity(1, 0.3);
  yield* asmLine3().opacity(1, 0.3);
  yield* asmLine4().opacity(1, 0.3);
  yield* asmLine5().opacity(1, 0.3);
  yield* asmLine6().opacity(1, 0.3);
  yield* asmLine7().opacity(1, 0.3);
  yield* asmLine8().opacity(1, 0.3);
  yield* asmLine9().opacity(1, 0.3);
  yield* asmLine10().opacity(1, 0.3);
  yield* asmLine11().opacity(1, 0.3);
  yield* asmLine12().opacity(1, 0.3);

  yield* beginSlide("Compiler: Assembly Output");

  // Nascondi zoom Compiler con zoom-out
  yield* all(
    compZoomBox().opacity(0, 0.4),
    compZoomBox().scale(0.1, 0.4),
    compZoomTitle().opacity(0, 0.4),
    cCodeBox().opacity(0, 0.4),
    cCodeTitle().opacity(0, 0.4),
    cCodeLine1().opacity(0, 0.4),
    cCodeLine2().opacity(0, 0.4),
    cCodeLine3().opacity(0, 0.4),
    cCodeLine4().opacity(0, 0.4),
    cCodeCopy().opacity(0, 0.4),
    compArrow().opacity(0, 0.4),
    compGear1().opacity(0, 0.4),
    compGear2().opacity(0, 0.4),
    processingText().opacity(0, 0.4),
    asmCodeBox().opacity(0, 0.4),
    asmCodeTitle().opacity(0, 0.4),
    asmLine1().opacity(0, 0.4),
    asmLine2().opacity(0, 0.4),
    asmLine3().opacity(0, 0.4),
    asmLine4().opacity(0, 0.4),
    asmLine5().opacity(0, 0.4),
    asmLine6().opacity(0, 0.4),
    asmLine7().opacity(0, 0.4),
    asmLine8().opacity(0, 0.4),
    asmLine9().opacity(0, 0.4),
    asmLine10().opacity(0, 0.4),
    asmLine11().opacity(0, 0.4),
    asmLine12().opacity(0, 0.4),
  );

  // Ripristina vista principale con Pre-Processor, Compiler e frecce
  yield* all(
    phasesTitle().opacity(1, 0.5),
    containerBox().opacity(1, 0.5),
    sourceCodeBox.containerRef().opacity(1, 0.5),
    sourceCodeBox.iconRef().opacity(1, 0.5),
    sourceCodeBox.filenameRef().opacity(1, 0.5),
    sourceCodeBox.line1Ref().opacity(1, 0.5),
    sourceCodeBox.line2Ref().opacity(1, 0.5),
    sourceCodeBox.line3Ref().opacity(1, 0.5),
    sourceCodeBox.line4Ref().opacity(1, 0.5),
    sourceCodeBox.line5Ref().opacity(1, 0.5),
    sourceCodeBox.line6Ref().opacity(1, 0.5),
    arrowIn().opacity(1, 0.5),
    arrowPre().opacity(1, 0.5),
    arrowComp().opacity(1, 0.5),
    prePhase.boxRef().opacity(1, 0.5),
    prePhase.titleRef().opacity(1, 0.5),
    prePhase.descRef().opacity(1, 0.5),
    compPhase.boxRef().opacity(1, 0.5),
    compPhase.titleRef().opacity(1, 0.5),
    compPhase.descRef().opacity(1, 0.5),
  );

  // Fase 3: Assembler
  yield* all(
    asmPhase.boxRef().opacity(1, 0.6),
    asmPhase.titleRef().opacity(1, 0.6),
    asmPhase.descRef().opacity(1, 0.6),
  );

  yield* beginSlide("Assembler");

  // ============ ZOOM ASSEMBLER: Assembly to Binary ============
  // Nascondi vista principale
  yield* all(
    phasesTitle().opacity(0, 0.5),
    containerBox().opacity(0, 0.5),
    sourceCodeBox.containerRef().opacity(0, 0.5),
    sourceCodeBox.iconRef().opacity(0, 0.5),
    sourceCodeBox.filenameRef().opacity(0, 0.5),
    sourceCodeBox.line1Ref().opacity(0, 0.5),
    sourceCodeBox.line2Ref().opacity(0, 0.5),
    sourceCodeBox.line3Ref().opacity(0, 0.5),
    sourceCodeBox.line4Ref().opacity(0, 0.5),
    sourceCodeBox.line5Ref().opacity(0, 0.5),
    sourceCodeBox.line6Ref().opacity(0, 0.5),
    arrowIn().opacity(0, 0.5),
    arrowPre().opacity(0, 0.5),
    arrowComp().opacity(0, 0.5),
    prePhase.boxRef().opacity(0, 0.5),
    prePhase.titleRef().opacity(0, 0.5),
    prePhase.descRef().opacity(0, 0.5),
    compPhase.boxRef().opacity(0, 0.5),
    compPhase.titleRef().opacity(0, 0.5),
    compPhase.descRef().opacity(0, 0.5),
    asmPhase.boxRef().opacity(0, 0.5),
    asmPhase.titleRef().opacity(0, 0.5),
    asmPhase.descRef().opacity(0, 0.5),
  );

  // ZOOM ANIMATION: Assembler box zooms in
  asmZoomBox().scale(0.1);
  yield* all(asmZoomBox().opacity(1, 0.3), asmZoomBox().scale(1, 0.8));
  yield* asmZoomTitle().opacity(1, 0.5);

  // FASE 1: Mostra assembly code a sinistra
  yield* asmSrcBox().opacity(1, 0.5);
  yield* asmSrcTitle().opacity(1, 0.5);
  yield* asmSrcLine1().opacity(1, 0.3);
  yield* asmSrcLine2().opacity(1, 0.3);
  yield* asmSrcLine3().opacity(1, 0.3);
  yield* asmSrcLine4().opacity(1, 0.3);
  yield* asmSrcLine5().opacity(1, 0.3);
  yield* asmSrcLine6().opacity(1, 0.3);

  yield* beginSlide("Assembler: Assembly Code");

  // FASE 2: Copia si rimpicciolisce al centro
  yield* asmSrcCopy().opacity(1, 0.3);
  yield* all(asmSrcCopy().x(0, 0.8), asmSrcCopy().scale(0, 0.8));

  // FASE 3: Due ingranaggi girano al centro
  yield* all(asmGear1().opacity(1, 0.3), asmGear2().opacity(1, 0.3));
  yield* all(
    asmGear1().rotation(360, 1.5),
    asmGear2().rotation(-360, 1.5),
    asmProcessingText().opacity(1, 0.3),
  );

  yield* beginSlide("Assembler: Processing");

  // FASE 4: binCodeBox esce dal centro e si sposta a destra
  yield* asmProcessingText().opacity(0, 0.3);
  binCodeBox().x(0);
  binCodeBox().scale(0);
  binCodeBox().opacity(1);
  yield* all(
    binCodeBox().x(300, 0.8),
    binCodeBox().scale(1, 0.8),
    asmGear1().opacity(0, 0.4),
    asmGear2().opacity(0, 0.4),
  );
  yield* binCodeTitle().opacity(1, 0.5);
  yield* binLine1().opacity(1, 0.3);
  yield* binLine2().opacity(1, 0.3);
  yield* binLine3().opacity(1, 0.3);
  yield* binLine4().opacity(1, 0.3);
  yield* binLine5().opacity(1, 0.3);
  yield* binLine6().opacity(1, 0.3);
  yield* binLine7().opacity(1, 0.3);
  yield* binLine8().opacity(1, 0.3);
  yield* binLine9().opacity(1, 0.3);
  yield* binLine10().opacity(1, 0.3);

  yield* beginSlide("Assembler: Machine Code Output");

  // Nascondi zoom Assembler con zoom-out
  yield* all(
    asmZoomBox().opacity(0, 0.4),
    asmZoomBox().scale(0.1, 0.4),
    asmZoomTitle().opacity(0, 0.4),
    asmSrcBox().opacity(0, 0.4),
    asmSrcTitle().opacity(0, 0.4),
    asmSrcLine1().opacity(0, 0.4),
    asmSrcLine2().opacity(0, 0.4),
    asmSrcLine3().opacity(0, 0.4),
    asmSrcLine4().opacity(0, 0.4),
    asmSrcLine5().opacity(0, 0.4),
    asmSrcLine6().opacity(0, 0.4),
    asmSrcCopy().opacity(0, 0.4),
    asmGear1().opacity(0, 0.4),
    asmGear2().opacity(0, 0.4),
    asmProcessingText().opacity(0, 0.4),
    binCodeBox().opacity(0, 0.4),
    binCodeTitle().opacity(0, 0.4),
    binLine1().opacity(0, 0.4),
    binLine2().opacity(0, 0.4),
    binLine3().opacity(0, 0.4),
    binLine4().opacity(0, 0.4),
    binLine5().opacity(0, 0.4),
    binLine6().opacity(0, 0.4),
    binLine7().opacity(0, 0.4),
    binLine8().opacity(0, 0.4),
    binLine9().opacity(0, 0.4),
    binLine10().opacity(0, 0.4),
  );

  // Ripristina vista principale con Pre-Processor, Compiler, Assembler e frecce
  yield* all(
    phasesTitle().opacity(1, 0.5),
    containerBox().opacity(1, 0.5),
    sourceCodeBox.containerRef().opacity(1, 0.5),
    sourceCodeBox.iconRef().opacity(1, 0.5),
    sourceCodeBox.filenameRef().opacity(1, 0.5),
    sourceCodeBox.line1Ref().opacity(1, 0.5),
    sourceCodeBox.line2Ref().opacity(1, 0.5),
    sourceCodeBox.line3Ref().opacity(1, 0.5),
    sourceCodeBox.line4Ref().opacity(1, 0.5),
    sourceCodeBox.line5Ref().opacity(1, 0.5),
    sourceCodeBox.line6Ref().opacity(1, 0.5),
    arrowIn().opacity(1, 0.5),
    arrowPre().opacity(1, 0.5),
    arrowComp().opacity(1, 0.5),
    prePhase.boxRef().opacity(1, 0.5),
    prePhase.titleRef().opacity(1, 0.5),
    prePhase.descRef().opacity(1, 0.5),
    compPhase.boxRef().opacity(1, 0.5),
    compPhase.titleRef().opacity(1, 0.5),
    compPhase.descRef().opacity(1, 0.5),
    asmPhase.boxRef().opacity(1, 0.5),
    asmPhase.titleRef().opacity(1, 0.5),
    asmPhase.descRef().opacity(1, 0.5),
  );

  // Freccia dopo Assembler
  yield* arrowAsm().opacity(1, 0.4);

  // Fase 4: Linker
  yield* all(
    linkPhase.boxRef().opacity(1, 0.6),
    linkPhase.titleRef().opacity(1, 0.6),
    linkPhase.descRef().opacity(1, 0.6),
  );

  yield* beginSlide("Linker");

  // ============ ZOOM LINKER: main.o + stdio.o → EXE ============
  // Nascondi vista principale
  yield* all(
    phasesTitle().opacity(0, 0.5),
    containerBox().opacity(0, 0.5),
    sourceCodeBox.containerRef().opacity(0, 0.5),
    sourceCodeBox.iconRef().opacity(0, 0.5),
    sourceCodeBox.filenameRef().opacity(0, 0.5),
    sourceCodeBox.line1Ref().opacity(0, 0.5),
    sourceCodeBox.line2Ref().opacity(0, 0.5),
    sourceCodeBox.line3Ref().opacity(0, 0.5),
    sourceCodeBox.line4Ref().opacity(0, 0.5),
    sourceCodeBox.line5Ref().opacity(0, 0.5),
    sourceCodeBox.line6Ref().opacity(0, 0.5),
    arrowIn().opacity(0, 0.5),
    arrowPre().opacity(0, 0.5),
    arrowComp().opacity(0, 0.5),
    arrowAsm().opacity(0, 0.5),
    prePhase.boxRef().opacity(0, 0.5),
    prePhase.titleRef().opacity(0, 0.5),
    prePhase.descRef().opacity(0, 0.5),
    compPhase.boxRef().opacity(0, 0.5),
    compPhase.titleRef().opacity(0, 0.5),
    compPhase.descRef().opacity(0, 0.5),
    asmPhase.boxRef().opacity(0, 0.5),
    asmPhase.titleRef().opacity(0, 0.5),
    asmPhase.descRef().opacity(0, 0.5),
    linkPhase.boxRef().opacity(0, 0.5),
    linkPhase.titleRef().opacity(0, 0.5),
    linkPhase.descRef().opacity(0, 0.5),
  );

  // Zoom in
  linkZoomBox().scale(0.1);
  yield* all(linkZoomBox().opacity(1, 0.3), linkZoomBox().scale(1, 0.8));
  yield* linkZoomTitle().opacity(1, 0.5);

  // FASE 1: Mostra main.o e stdio.o a sinistra
  yield* all(
    linkMainBox().opacity(1, 0.5),
    linkMainBin().opacity(1, 0.5),
    linkMainTitle().opacity(1, 0.5),
  );
  yield* all(
    linkStdioBox().opacity(1, 0.5),
    linkStdioBin().opacity(1, 0.5),
    linkStdioTitle().opacity(1, 0.5),
  );

  yield* beginSlide("Linker: main.o + stdio.o");

  // FASE 2: Binario si espande a destra da entrambi i box
  yield* all(
    linkMainBinExpand().opacity(1, 0.6),
    linkStdioBinExpand().opacity(1, 0.6),
  );

  yield* beginSlide("Linker: Binary Expanding");

  // FASE 3: Binari espansi si rimpiccioliscono al centro (come compiler/assembler)
  // I box main.o e stdio.o restano fermi a sinistra
  yield* all(
    linkMainBinExpand().x(0, 0.8),
    linkMainBinExpand().y(50, 0.8),
    linkMainBinExpand().scale(0, 0.8),
    linkStdioBinExpand().x(0, 0.8),
    linkStdioBinExpand().y(50, 0.8),
    linkStdioBinExpand().scale(0, 0.8),
  );

  // FASE 4: Due ingranaggi girano (linking)
  yield* all(linkGear1().opacity(1, 0.3), linkGear2().opacity(1, 0.3));
  yield* all(
    linkGear1().rotation(360, 1.5),
    linkGear2().rotation(-360, 1.5),
    linkProcessingText().opacity(1, 0.3),
  );

  yield* beginSlide("Linker: Processing");

  // FASE 5: Ingranaggi svaniscono, muro binario esce dal centro
  yield* linkProcessingText().opacity(0, 0.3);
  linkBinWall().scale(0);
  linkBinWall().opacity(1);
  yield* all(
    linkBinWall().scale(1, 0.8),
    linkGear1().opacity(0, 0.4),
    linkGear2().opacity(0, 0.4),
    linkMainBox().opacity(0, 0.4),
    linkMainBin().opacity(0, 0.4),
    linkMainTitle().opacity(0, 0.4),
    linkStdioBox().opacity(0, 0.4),
    linkStdioBin().opacity(0, 0.4),
    linkStdioTitle().opacity(0, 0.4),
  );

  yield* beginSlide("Linker: Binary Wall");

  // FASE 6: Muro si condensa in EXE
  yield* all(
    linkBinWall().scale(0.2, 0.8),
    linkBinWall().opacity(0, 0.8),
    linkExeBox().opacity(1, 0.8),
    linkExeIcon().opacity(1, 0.8),
    linkExeLabel().opacity(1, 0.8),
    linkExeName().opacity(1, 0.8),
  );

  yield* beginSlide("Linker: EXE Output");

  // Zoom-out Linker
  yield* all(
    linkZoomBox().opacity(0, 0.4),
    linkZoomBox().scale(0.1, 0.4),
    linkZoomTitle().opacity(0, 0.4),
    linkExeBox().opacity(0, 0.4),
    linkExeIcon().opacity(0, 0.4),
    linkExeLabel().opacity(0, 0.4),
    linkExeName().opacity(0, 0.4),
    linkGear1().opacity(0, 0.4),
    linkGear2().opacity(0, 0.4),
    linkProcessingText().opacity(0, 0.4),
  );

  // Ripristina vista principale con tutte le fasi e frecce
  yield* all(
    phasesTitle().opacity(1, 0.5),
    containerBox().opacity(1, 0.5),
    sourceCodeBox.containerRef().opacity(1, 0.5),
    sourceCodeBox.iconRef().opacity(1, 0.5),
    sourceCodeBox.filenameRef().opacity(1, 0.5),
    sourceCodeBox.line1Ref().opacity(1, 0.5),
    sourceCodeBox.line2Ref().opacity(1, 0.5),
    sourceCodeBox.line3Ref().opacity(1, 0.5),
    sourceCodeBox.line4Ref().opacity(1, 0.5),
    sourceCodeBox.line5Ref().opacity(1, 0.5),
    sourceCodeBox.line6Ref().opacity(1, 0.5),
    arrowIn().opacity(1, 0.5),
    arrowPre().opacity(1, 0.5),
    arrowComp().opacity(1, 0.5),
    arrowAsm().opacity(1, 0.5),
    prePhase.boxRef().opacity(1, 0.5),
    prePhase.titleRef().opacity(1, 0.5),
    prePhase.descRef().opacity(1, 0.5),
    compPhase.boxRef().opacity(1, 0.5),
    compPhase.titleRef().opacity(1, 0.5),
    compPhase.descRef().opacity(1, 0.5),
    asmPhase.boxRef().opacity(1, 0.5),
    asmPhase.titleRef().opacity(1, 0.5),
    asmPhase.descRef().opacity(1, 0.5),
    linkPhase.boxRef().opacity(1, 0.5),
    linkPhase.titleRef().opacity(1, 0.5),
    linkPhase.descRef().opacity(1, 0.5),
  );

  // Freccia verso eseguibile
  yield* arrowOut().opacity(1, 0.5);

  // Mostra eseguibile finale
  yield* all(
    executableBox.boxRef().opacity(1, 0.6),
    executableBox.iconRef().opacity(1, 0.6),
    executableBox.exeLabelRef().opacity(1, 0.6),
    executableBox.filenameRef().opacity(1, 0.6),
  );

  yield* beginSlide("Eseguibile Finale");
});
