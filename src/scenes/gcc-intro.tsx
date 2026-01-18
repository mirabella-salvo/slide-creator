import {
  Circle,
  Rect,
  makeScene2D,
  Txt,
  Line,
  Layout,
  Img,
} from "@motion-canvas/2d";
import { all, createRef, beginSlide, waitFor } from "@motion-canvas/core";
import mainCodeExample from "/main_c_code_example.png";
import {
  SlideTitle,
  TerminalCommand,
  InfoBox,
  OptionRow,
  PhaseBox,
  ComparisonBox,
  ExecutableBox,
  SourceCodeBox,
} from "../components";

export default makeScene2D(function* (view) {
  // Slide 1: Titolo GCC
  const titleSlide = SlideTitle({
    title: "GCC - GNU Compiler Collection",
    subtitle: "Da codice sorgente a eseguibile",
    titleColor: "#ce9178",
    subtitleColor: "#9cdcfe",
    titleFontSize: 70,
    subtitleFontSize: 40,
  });

  titleSlide.nodes.forEach((node) => node && view.add(node));

  yield* all(
    titleSlide.titleRef().opacity(1, 1),
    titleSlide.titleRef().scale(1.1, 0.5).to(1, 0.5),
  );

  yield* titleSlide.subtitleRef().opacity(1, 0.8);

  yield* beginSlide("GCC - Titolo");

  // Slide 2: Storia - GNU vs GCC
  const historyTitle = createRef<Txt>();
  const arrow = createRef<Line>();

  view.add(
    <Txt
      ref={historyTitle}
      text="GNU Compiler → GCC"
      fontSize={60}
      fill={"#4ec9b0"}
      y={-300}
      opacity={0}
    />,
  );

  const gnuComp = ComparisonBox({
    label: "GNU Compiler",
    status: "Obsoleto",
    statusIcon: "❌",
    isActive: false,
    x: -350,
    y: 0,
  });

  gnuComp.nodes.forEach((node) => node && view.add(node));

  // Freccia
  view.add(
    <Line
      ref={arrow}
      points={[
        [-150, 0],
        [150, 0],
      ]}
      stroke={"#dcdcaa"}
      lineWidth={6}
      endArrow
      arrowSize={20}
      opacity={0}
    />,
  );

  const gccComp = ComparisonBox({
    label: "GCC",
    status: "Attuale",
    statusIcon: "✓",
    isActive: true,
    x: 350,
    y: 0,
  });

  gccComp.nodes.forEach((node) => node && view.add(node));

  yield* all(
    titleSlide.titleRef().opacity(0, 0.5),
    titleSlide.subtitleRef().opacity(0, 0.5),
  );

  yield* historyTitle().opacity(1, 0.8);

  yield* all(
    gnuComp.boxRef().opacity(1, 0.6),
    gnuComp.labelRef().opacity(1, 0.6),
    gnuComp.statusRef().opacity(1, 0.6),
  );

  yield* arrow().opacity(1, 0.6);

  yield* all(
    gccComp.boxRef().opacity(1, 0.6),
    gccComp.labelRef().opacity(1, 0.6),
    gccComp.statusRef().opacity(1, 0.6),
  );

  yield* beginSlide("GNU vs GCC");

  // Slide 3: Esempio Codice C
  const codeTitle = createRef<Txt>();
  const codeImage = createRef<Img>();
  const codeCaption = createRef<Txt>();

  view.add(
    <Txt
      ref={codeTitle}
      text="Esempio di Codice C"
      fontSize={60}
      fill={"#569cd6"}
      y={-330}
      opacity={0}
    />,
  );

  view.add(
    <Img
      ref={codeImage}
      src={mainCodeExample}
      width={800}
      y={20}
      opacity={0}
      radius={10}
    />,
  );

  view.add(
    <Txt
      ref={codeCaption}
      text="main.c - Il nostro codice sorgente"
      fontSize={28}
      fill={"#9cdcfe"}
      y={280}
      opacity={0}
    />,
  );

  yield* all(
    historyTitle().opacity(0, 0.5),
    gnuComp.boxRef().opacity(0, 0.5),
    gnuComp.labelRef().opacity(0, 0.5),
    gnuComp.statusRef().opacity(0, 0.5),
    arrow().opacity(0, 0.5),
    gccComp.boxRef().opacity(0, 0.5),
    gccComp.labelRef().opacity(0, 0.5),
    gccComp.statusRef().opacity(0, 0.5),
  );

  yield* codeTitle().opacity(1, 0.8);
  yield* codeImage().opacity(1, 1);
  yield* codeCaption().opacity(1, 0.6);

  yield* beginSlide("Esempio Codice C");

  // Slide 4: Comando Base GCC
  const cmdTitle = createRef<Txt>();

  view.add(
    <Txt
      ref={cmdTitle}
      text="Comando Base"
      fontSize={60}
      fill={"#dcdcaa"}
      y={-300}
      opacity={0}
    />,
  );

  const terminalCmd = TerminalCommand({
    command: "gcc main.c",
    description: "Compila main.c → crea a.out",
  });

  terminalCmd.nodes.forEach((node) => node && view.add(node));

  yield* all(
    codeTitle().opacity(0, 0.5),
    codeImage().opacity(0, 0.5),
    codeCaption().opacity(0, 0.5),
  );

  yield* cmdTitle().opacity(1, 0.8);
  yield* terminalCmd.boxRef().opacity(1, 0.6);
  yield* terminalCmd.promptRef().opacity(1, 0.4);
  yield* terminalCmd.commandRef().opacity(1, 0.6);
  yield* terminalCmd.descRef().opacity(1, 0.6);

  yield* beginSlide("Comando Base");

  // Slide 5: Opzioni Comuni
  const optionsTitle = createRef<Txt>();

  view.add(
    <Txt
      ref={optionsTitle}
      text="Opzioni Comuni"
      fontSize={60}
      fill={"#c586c0"}
      y={-300}
      opacity={0}
    />,
  );

  const option1 = OptionRow({
    command: "gcc main.c -o program",
    description: "Specifica nome output",
    y: -150,
  });

  option1.nodes.forEach((node) => node && view.add(node));

  const option2 = OptionRow({
    command: "gcc main.c -Wall",
    description: "Mostra tutti i warning",
    y: -40,
  });

  option2.nodes.forEach((node) => node && view.add(node));

  const option3 = OptionRow({
    command: "gcc main.c -g",
    description: "Debug symbols",
    y: 70,
  });

  option3.nodes.forEach((node) => node && view.add(node));

  yield* all(
    cmdTitle().opacity(0, 0.5),
    terminalCmd.boxRef().opacity(0, 0.5),
    terminalCmd.promptRef().opacity(0, 0.5),
    terminalCmd.commandRef().opacity(0, 0.5),
    terminalCmd.descRef().opacity(0, 0.5),
  );

  yield* optionsTitle().opacity(1, 0.8);

  yield* all(
    option1.boxRef().opacity(1, 0.5),
    option1.cmdRef().opacity(1, 0.5),
    option1.descRef().opacity(1, 0.5),
  );

  yield* all(
    option2.boxRef().opacity(1, 0.5),
    option2.cmdRef().opacity(1, 0.5),
    option2.descRef().opacity(1, 0.5),
  );

  yield* all(
    option3.boxRef().opacity(1, 0.5),
    option3.cmdRef().opacity(1, 0.5),
    option3.descRef().opacity(1, 0.5),
  );

  yield* beginSlide("Opzioni Comuni");

  // Slide 6: Esempio Pratico
  const exampleTitle = createRef<Txt>();
  const stepBox = createRef<Rect>();
  const step1 = createRef<Txt>();
  const step2 = createRef<Txt>();
  const step3 = createRef<Txt>();

  view.add(
    <Txt
      ref={exampleTitle}
      text="Esempio Pratico"
      fontSize={60}
      fill={"#4ec9b0"}
      y={-300}
      opacity={0}
    />,
  );

  view.add(
    <Rect
      ref={stepBox}
      width={900}
      height={350}
      fill={"#252526"}
      stroke={"#3e3e42"}
      lineWidth={3}
      y={0}
      opacity={0}
      radius={10}
    />,
  );

  view.add(
    <Txt
      ref={step1}
      text="1. $ gcc main.c -o myprogram"
      fontSize={36}
      fill={"#ce9178"}
      fontFamily={"monospace"}
      y={-80}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={step2}
      text="2. $ ./myprogram"
      fontSize={36}
      fill={"#4ec9b0"}
      fontFamily={"monospace"}
      y={0}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={step3}
      text="3. Output: Hello, World!"
      fontSize={36}
      fill={"#9cdcfe"}
      fontFamily={"monospace"}
      y={80}
      opacity={0}
    />,
  );

  yield* all(
    optionsTitle().opacity(0, 0.5),
    option1.boxRef().opacity(0, 0.5),
    option1.cmdRef().opacity(0, 0.5),
    option1.descRef().opacity(0, 0.5),
    option2.boxRef().opacity(0, 0.5),
    option2.cmdRef().opacity(0, 0.5),
    option2.descRef().opacity(0, 0.5),
    option3.boxRef().opacity(0, 0.5),
    option3.cmdRef().opacity(0, 0.5),
    option3.descRef().opacity(0, 0.5),
  );

  yield* exampleTitle().opacity(1, 0.8);
  yield* stepBox().opacity(1, 0.6);
  yield* step1().opacity(1, 0.6);
  yield* step2().opacity(1, 0.6);
  yield* step3().opacity(1, 0.6);

  yield* beginSlide("Esempio Pratico");

  // Slide 7: Processo di Compilazione
  const processTitle = createRef<Txt>();
  const arrow1 = createRef<Line>();
  const arrow2 = createRef<Line>();

  view.add(
    <Txt
      ref={processTitle}
      text="Il Processo di Compilazione"
      fontSize={60}
      fill={"#569cd6"}
      y={-300}
      opacity={0}
    />,
  );

  const sourceInfo = InfoBox({
    title: "main.c",
    content: "📄",
    color: "#569cd6",
    x: -400,
    y: 20,
    description: "Codice sorgente",
  });

  sourceInfo.nodes.forEach((node) => node && view.add(node));

  // Arrow 1
  view.add(
    <Line
      ref={arrow1}
      points={[
        [-280, 20],
        [-120, 20],
      ]}
      stroke={"#dcdcaa"}
      lineWidth={4}
      endArrow
      arrowSize={16}
      opacity={0}
    />,
  );

  const compilerInfo = InfoBox({
    title: "GCC",
    content: "⚙️",
    icon: "",
    color: "#4ec9b0",
    x: 0,
    y: 20,
    description: "Compilatore",
  });

  compilerInfo.nodes.forEach((node) => node && view.add(node));

  // Arrow 2
  view.add(
    <Line
      ref={arrow2}
      points={[
        [120, 20],
        [280, 20],
      ]}
      stroke={"#dcdcaa"}
      lineWidth={4}
      endArrow
      arrowSize={16}
      opacity={0}
    />,
  );

  const execInfo = InfoBox({
    title: "a.out",
    content: "🚀",
    color: "#ce9178",
    x: 400,
    y: 20,
    description: "Eseguibile",
  });

  execInfo.nodes.forEach((node) => node && view.add(node));

  yield* all(
    exampleTitle().opacity(0, 0.5),
    stepBox().opacity(0, 0.5),
    step1().opacity(0, 0.5),
    step2().opacity(0, 0.5),
    step3().opacity(0, 0.5),
  );

  yield* processTitle().opacity(1, 0.8);

  yield* all(
    sourceInfo.boxRef().opacity(1, 0.6),
    sourceInfo.titleRef().opacity(1, 0.6),
    sourceInfo.contentRef().opacity(1, 0.6),
    sourceInfo.descRef().opacity(1, 0.6),
  );

  yield* arrow1().opacity(1, 0.5);

  yield* all(
    compilerInfo.boxRef().opacity(1, 0.6),
    compilerInfo.titleRef().opacity(1, 0.6),
    compilerInfo.contentRef().opacity(1, 0.6),
    compilerInfo.descRef().opacity(1, 0.6),
  );

  yield* arrow2().opacity(1, 0.5);

  yield* all(
    execInfo.boxRef().opacity(1, 0.6),
    execInfo.titleRef().opacity(1, 0.6),
    execInfo.contentRef().opacity(1, 0.6),
    execInfo.descRef().opacity(1, 0.6),
  );

  yield* beginSlide("Processo di Compilazione");

  // Slide 8: Le 4 Fasi di GCC
  const phasesTitle = createRef<Txt>();
  const phasesSubtitle = createRef<Txt>();
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
      text="Le 4 Fasi del Compilatore"
      fontSize={60}
      fill={"#dcdcaa"}
      y={-330}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={phasesSubtitle}
      text="gcc main.c -o main"
      fontSize={35}
      fill={"#ce9178"}
      fontFamily={"monospace"}
      y={-270}
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

  // Arrow IN (sinistra)
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
    x: -405,
    y: 50,
  });

  prePhase.nodes.forEach((node) => node && view.add(node));

  // Arrow 1
  view.add(
    <Line
      ref={arrowPre}
      points={[
        [-265, 50],
        [-195, 50],
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
    x: -135,
    y: 50,
  });

  compPhase.nodes.forEach((node) => node && view.add(node));

  // Arrow 2
  view.add(
    <Line
      ref={arrowComp}
      points={[
        [5, 50],
        [75, 50],
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
    x: 135,
    y: 50,
  });

  asmPhase.nodes.forEach((node) => node && view.add(node));

  // Arrow 3
  view.add(
    <Line
      ref={arrowAsm}
      points={[
        [275, 50],
        [345, 50],
      ]}
      stroke={"#ffffff"}
      lineWidth={4}
      endArrow
      arrowSize={16}
      opacity={0}
    />,
  );

  // 4. Linker
  const linkPhase = PhaseBox({
    title: "Linker",
    description: "Links\nlibraries\n& objects",
    color: "#ce9178",
    x: 405,
    y: 50,
  });

  linkPhase.nodes.forEach((node) => node && view.add(node));

  // Arrow OUT (destra)
  view.add(
    <Line
      ref={arrowOut}
      points={[
        [545, 50],
        [620, 50],
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

  // Nascondi slide precedente
  yield* all(
    processTitle().opacity(0, 0.5),
    sourceInfo.boxRef().opacity(0, 0.5),
    sourceInfo.titleRef().opacity(0, 0.5),
    sourceInfo.contentRef().opacity(0, 0.5),
    sourceInfo.descRef().opacity(0, 0.5),
    arrow1().opacity(0, 0.5),
    compilerInfo.boxRef().opacity(0, 0.5),
    compilerInfo.titleRef().opacity(0, 0.5),
    compilerInfo.contentRef().opacity(0, 0.5),
    compilerInfo.descRef().opacity(0, 0.5),
    arrow2().opacity(0, 0.5),
    execInfo.boxRef().opacity(0, 0.5),
    execInfo.titleRef().opacity(0, 0.5),
    execInfo.contentRef().opacity(0, 0.5),
    execInfo.descRef().opacity(0, 0.5),
  );

  // Mostra titoli
  yield* phasesTitle().opacity(1, 0.8);
  yield* phasesSubtitle().opacity(1, 0.6);

  // Mostra container
  yield* containerBox().opacity(1, 0.6);

  // Mostra source code box
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

  // Mostra arrow in
  yield* arrowIn().opacity(1, 0.5);

  yield* beginSlide("Container");

  // Fase 1: Pre-Processor
  yield* all(
    prePhase.boxRef().opacity(1, 0.6),
    prePhase.titleRef().opacity(1, 0.6),
    prePhase.descRef().opacity(1, 0.6),
  );
  yield* arrowPre().opacity(1, 0.4);

  yield* beginSlide("Pre-Processor");

  // Fase 2: Compiler
  yield* all(
    compPhase.boxRef().opacity(1, 0.6),
    compPhase.titleRef().opacity(1, 0.6),
    compPhase.descRef().opacity(1, 0.6),
  );
  yield* arrowComp().opacity(1, 0.4);

  yield* beginSlide("Compiler");

  // Fase 3: Assembler
  yield* all(
    asmPhase.boxRef().opacity(1, 0.6),
    asmPhase.titleRef().opacity(1, 0.6),
    asmPhase.descRef().opacity(1, 0.6),
  );
  yield* arrowAsm().opacity(1, 0.4);

  yield* beginSlide("Assembler");

  // Fase 4: Linker
  yield* all(
    linkPhase.boxRef().opacity(1, 0.6),
    linkPhase.titleRef().opacity(1, 0.6),
    linkPhase.descRef().opacity(1, 0.6),
  );
  yield* arrowOut().opacity(1, 0.5);

  yield* beginSlide("Linker");

  // Mostra eseguibile finale
  yield* all(
    executableBox.boxRef().opacity(1, 0.6),
    executableBox.iconRef().opacity(1, 0.6),
    executableBox.exeLabelRef().opacity(1, 0.6),
    executableBox.filenameRef().opacity(1, 0.6),
  );
  yield* beginSlide("Eseguibile Finale");
});
