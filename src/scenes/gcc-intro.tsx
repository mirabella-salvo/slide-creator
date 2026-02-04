import { Rect, makeScene2D, Txt, Line } from "@motion-canvas/2d";
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

  // ============ ESEMPIO 2: #include ============
  const includeBox = createRef<Rect>();
  const includeTitle = createRef<Txt>();
  const includeLine1 = createRef<Txt>();
  const includeLine2 = createRef<Txt>();
  const includeArrow = createRef<Txt>();
  const includeResult = createRef<Txt>();

  view.add(
    <Rect
      ref={includeBox}
      width={900}
      height={450}
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
      y={-250}
      opacity={0}
    />,
  );

  // Box va da -450 a +450, centrato nella box
  const includeCodeX = -200;

  view.add(
    <Txt
      ref={includeLine1}
      text="#include <stdio.h>"
      fontSize={28}
      fill={"#c586c0"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={includeCodeX}
      y={-100}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={includeLine2}
      text='printf("Hello, World!\\n");'
      fontSize={28}
      fill={"#dcdcaa"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={includeCodeX}
      y={-30}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={includeArrow}
      text="↓ Copy content from stdio.h"
      fontSize={24}
      fill={"#6a9955"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={includeCodeX}
      y={50}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={includeResult}
      text="int printf(const char*, ...);"
      fontSize={26}
      fill={"#4ec9b0"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={includeCodeX}
      y={120}
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
  const compGear = createRef<Txt>();
  const processingText = createRef<Txt>();
  const asmCodeBox = createRef<Rect>();
  const asmCodeTitle = createRef<Txt>();
  const asmLine1 = createRef<Txt>();
  const asmLine2 = createRef<Txt>();
  const asmLine3 = createRef<Txt>();
  const asmLine4 = createRef<Txt>();
  const asmLine5 = createRef<Txt>();
  const asmLine6 = createRef<Txt>();

  view.add(
    <Rect
      ref={compZoomBox}
      width={1200}
      height={500}
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
      y={-230}
      opacity={0}
    />,
  );

  // Box codice C
  view.add(
    <Rect
      ref={cCodeBox}
      width={400}
      height={300}
      fill={"#1e1e1e"}
      stroke={"#569cd6"}
      lineWidth={2}
      x={-350}
      y={70}
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
      y={-110}
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

  // Ingranaggio sopra la freccia
  view.add(
    <Txt
      ref={compGear}
      text="⚙️"
      fontSize={40}
      x={-25}
      y={30}
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
      x={-25}
      y={-10}
      opacity={0}
    />,
  );

  // Box codice Assembly
  view.add(
    <Rect
      ref={asmCodeBox}
      width={450}
      height={300}
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
      y={-110}
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
      fontSize={16}
      fill={"#dcdcaa"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={asmLeftX}
      y={-40}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={asmLine2}
      text="push rbp"
      fontSize={16}
      fill={"#9cdcfe"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={asmIndentX}
      y={-15}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={asmLine3}
      text="mov rbp, rsp"
      fontSize={16}
      fill={"#9cdcfe"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={asmIndentX}
      y={10}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={asmLine4}
      text="add edi, esi"
      fontSize={16}
      fill={"#ce9178"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={asmIndentX}
      y={35}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={asmLine5}
      text="mov eax, edi"
      fontSize={16}
      fill={"#9cdcfe"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={asmIndentX}
      y={60}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={asmLine6}
      text="pop rbp"
      fontSize={16}
      fill={"#9cdcfe"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={asmIndentX}
      y={85}
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

  // ============ ZOOM PRE-PROCESSOR: #include ============
  // Zoom in animation per includeBox
  includeBox().scale(0.1);
  yield* all(includeBox().opacity(1, 0.3), includeBox().scale(1, 0.8));
  yield* includeTitle().opacity(1, 0.5);
  yield* includeLine1().opacity(1, 0.4);
  yield* includeLine2().opacity(1, 0.4);

  yield* beginSlide("Pre-Processor: #include");

  yield* includeArrow().opacity(1, 0.5);
  yield* includeResult().opacity(1, 0.6);

  yield* beginSlide("#include expansion");

  // Nascondi #include con zoom-out e torna alla vista principale
  yield* all(
    includeBox().opacity(0, 0.4),
    includeBox().scale(0.1, 0.4),
    includeTitle().opacity(0, 0.4),
    includeLine1().opacity(0, 0.4),
    includeLine2().opacity(0, 0.4),
    includeArrow().opacity(0, 0.4),
    includeResult().opacity(0, 0.4),
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

  // Mostra codice C completo
  yield* cCodeBox().opacity(1, 0.5);
  yield* cCodeTitle().opacity(1, 0.5);
  yield* cCodeLine1().opacity(1, 0.4);
  yield* cCodeLine2().opacity(1, 0.3);
  yield* cCodeLine3().opacity(1, 0.4);
  yield* cCodeLine4().opacity(1, 0.3);

  yield* beginSlide("Compiler: C Code");

  // Solo ingranaggio (no freccia)
  yield* compGear().opacity(1, 0.5);
  yield* all(
    compGear().rotation(360, 1),
    processingText().opacity(1, 0.3),
  );

  yield* beginSlide("Compiler: Processing");

  // Nascondi processing, mostra freccia e assembly
  yield* processingText().opacity(0, 0.3);
  yield* compArrow().opacity(1, 0.4);
  yield* asmCodeBox().opacity(1, 0.5);
  yield* asmCodeTitle().opacity(1, 0.5);
  yield* asmLine1().opacity(1, 0.3);
  yield* asmLine2().opacity(1, 0.3);
  yield* asmLine3().opacity(1, 0.3);
  yield* asmLine4().opacity(1, 0.3);
  yield* asmLine5().opacity(1, 0.3);
  yield* asmLine6().opacity(1, 0.3);

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
    compArrow().opacity(0, 0.4),
    compGear().opacity(0, 0.4),
    processingText().opacity(0, 0.4),
    asmCodeBox().opacity(0, 0.4),
    asmCodeTitle().opacity(0, 0.4),
    asmLine1().opacity(0, 0.4),
    asmLine2().opacity(0, 0.4),
    asmLine3().opacity(0, 0.4),
    asmLine4().opacity(0, 0.4),
    asmLine5().opacity(0, 0.4),
    asmLine6().opacity(0, 0.4),
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

  // Freccia dopo Assembler
  yield* arrowAsm().opacity(1, 0.4);

  // Fase 4: Linker
  yield* all(
    linkPhase.boxRef().opacity(1, 0.6),
    linkPhase.titleRef().opacity(1, 0.6),
    linkPhase.descRef().opacity(1, 0.6),
  );

  yield* beginSlide("Linker");

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
