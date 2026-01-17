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

export default makeScene2D(function* (view) {
  // Slide 1: Titolo GCC
  const title = createRef<Txt>();
  const subtitle = createRef<Txt>();

  view.add(
    <Txt
      ref={title}
      text="GCC - GNU Compiler Collection"
      fontSize={70}
      fill={"#ce9178"}
      fontWeight={700}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={subtitle}
      text="Da codice sorgente a eseguibile"
      fontSize={40}
      fill={"#9cdcfe"}
      y={100}
      opacity={0}
    />,
  );

  yield* all(title().opacity(1, 1), title().scale(1.1, 0.5).to(1, 0.5));

  yield* subtitle().opacity(1, 0.8);

  yield* beginSlide("GCC - Titolo");

  // Slide 2: Storia - GNU vs GCC
  const historyTitle = createRef<Txt>();
  const gnuBox = createRef<Rect>();
  const gnuText = createRef<Txt>();
  const gnuLabel = createRef<Txt>();
  const arrow = createRef<Line>();
  const gccBox = createRef<Rect>();
  const gccText = createRef<Txt>();
  const gccLabel = createRef<Txt>();

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

  // Box GNU (obsoleto)
  view.add(
    <Rect
      ref={gnuBox}
      width={350}
      height={200}
      fill={"#3e3e42"}
      stroke={"#808080"}
      lineWidth={3}
      x={-350}
      y={0}
      opacity={0}
      radius={10}
    />,
  );

  view.add(
    <Txt
      ref={gnuLabel}
      text="GNU Compiler"
      fontSize={32}
      fill={"#808080"}
      fontWeight={600}
      x={-350}
      y={-60}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={gnuText}
      text="Obsoleto\n❌"
      fontSize={40}
      fill={"#f48771"}
      textAlign={"center"}
      x={-350}
      y={30}
      opacity={0}
    />,
  );

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

  // Box GCC (attuale)
  view.add(
    <Rect
      ref={gccBox}
      width={350}
      height={200}
      fill={"#1e1e1e"}
      stroke={"#4ec9b0"}
      lineWidth={4}
      x={350}
      y={0}
      opacity={0}
      radius={10}
    />,
  );

  view.add(
    <Txt
      ref={gccLabel}
      text="GCC"
      fontSize={32}
      fill={"#4ec9b0"}
      fontWeight={700}
      x={350}
      y={-60}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={gccText}
      text="Attuale\n✓"
      fontSize={40}
      fill={"#4ec9b0"}
      textAlign={"center"}
      x={350}
      y={30}
      opacity={0}
    />,
  );

  yield* all(title().opacity(0, 0.5), subtitle().opacity(0, 0.5));

  yield* historyTitle().opacity(1, 0.8);

  yield* all(
    gnuBox().opacity(1, 0.6),
    gnuLabel().opacity(1, 0.6),
    gnuText().opacity(1, 0.6),
  );

  yield* arrow().opacity(1, 0.6);

  yield* all(
    gccBox().opacity(1, 0.6),
    gccLabel().opacity(1, 0.6),
    gccText().opacity(1, 0.6),
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
    gnuBox().opacity(0, 0.5),
    gnuLabel().opacity(0, 0.5),
    gnuText().opacity(0, 0.5),
    arrow().opacity(0, 0.5),
    gccBox().opacity(0, 0.5),
    gccLabel().opacity(0, 0.5),
    gccText().opacity(0, 0.5),
  );

  yield* codeTitle().opacity(1, 0.8);
  yield* codeImage().opacity(1, 1);
  yield* codeCaption().opacity(1, 0.6);

  yield* beginSlide("Esempio Codice C");

  // Slide 4: Comando Base GCC
  const cmdTitle = createRef<Txt>();
  const terminalBox = createRef<Rect>();
  const prompt = createRef<Txt>();
  const command = createRef<Txt>();
  const explanation = createRef<Txt>();

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

  view.add(
    <Rect
      ref={terminalBox}
      width={900}
      height={200}
      fill={"#1e1e1e"}
      stroke={"#3e3e42"}
      lineWidth={3}
      y={0}
      opacity={0}
      radius={10}
    />,
  );

  view.add(
    <Txt
      ref={prompt}
      text="$"
      fontSize={40}
      fill={"#4ec9b0"}
      fontFamily={"monospace"}
      x={-420}
      y={0}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={command}
      text="gcc main.c"
      fontSize={40}
      fill={"#ce9178"}
      fontFamily={"monospace"}
      x={-250}
      y={0}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={explanation}
      text="Compila main.c → crea a.out"
      fontSize={32}
      fill={"#9cdcfe"}
      y={200}
      opacity={0}
    />,
  );

  yield* all(
    codeTitle().opacity(0, 0.5),
    codeImage().opacity(0, 0.5),
    codeCaption().opacity(0, 0.5),
  );

  yield* cmdTitle().opacity(1, 0.8);
  yield* terminalBox().opacity(1, 0.6);
  yield* prompt().opacity(1, 0.4);
  yield* command().opacity(1, 0.6);
  yield* explanation().opacity(1, 0.6);

  yield* beginSlide("Comando Base");

  // Slide 5: Opzioni Comuni
  const optionsTitle = createRef<Txt>();
  const option1Box = createRef<Rect>();
  const option1Cmd = createRef<Txt>();
  const option1Desc = createRef<Txt>();
  const option2Box = createRef<Rect>();
  const option2Cmd = createRef<Txt>();
  const option2Desc = createRef<Txt>();
  const option3Box = createRef<Rect>();
  const option3Cmd = createRef<Txt>();
  const option3Desc = createRef<Txt>();

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

  // Opzione -o
  view.add(
    <Rect
      ref={option1Box}
      width={850}
      height={80}
      fill={"#1e1e1e"}
      stroke={"#3e3e42"}
      lineWidth={2}
      y={-150}
      opacity={0}
      radius={6}
    />,
  );

  view.add(
    <Txt
      ref={option1Cmd}
      text="gcc main.c -o program"
      fontSize={32}
      fill={"#ce9178"}
      fontFamily={"monospace"}
      x={-200}
      y={-150}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={option1Desc}
      text="Specifica nome output"
      fontSize={28}
      fill={"#9cdcfe"}
      x={250}
      y={-150}
      opacity={0}
    />,
  );

  // Opzione -Wall
  view.add(
    <Rect
      ref={option2Box}
      width={850}
      height={80}
      fill={"#1e1e1e"}
      stroke={"#3e3e42"}
      lineWidth={2}
      y={-40}
      opacity={0}
      radius={6}
    />,
  );

  view.add(
    <Txt
      ref={option2Cmd}
      text="gcc main.c -Wall"
      fontSize={32}
      fill={"#ce9178"}
      fontFamily={"monospace"}
      x={-220}
      y={-40}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={option2Desc}
      text="Mostra tutti i warning"
      fontSize={28}
      fill={"#9cdcfe"}
      x={250}
      y={-40}
      opacity={0}
    />,
  );

  // Opzione -g
  view.add(
    <Rect
      ref={option3Box}
      width={850}
      height={80}
      fill={"#1e1e1e"}
      stroke={"#3e3e42"}
      lineWidth={2}
      y={70}
      opacity={0}
      radius={6}
    />,
  );

  view.add(
    <Txt
      ref={option3Cmd}
      text="gcc main.c -g"
      fontSize={32}
      fill={"#ce9178"}
      fontFamily={"monospace"}
      x={-240}
      y={70}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={option3Desc}
      text="Debug symbols"
      fontSize={28}
      fill={"#9cdcfe"}
      x={250}
      y={70}
      opacity={0}
    />,
  );

  yield* all(
    cmdTitle().opacity(0, 0.5),
    terminalBox().opacity(0, 0.5),
    prompt().opacity(0, 0.5),
    command().opacity(0, 0.5),
    explanation().opacity(0, 0.5),
  );

  yield* optionsTitle().opacity(1, 0.8);

  yield* all(
    option1Box().opacity(1, 0.5),
    option1Cmd().opacity(1, 0.5),
    option1Desc().opacity(1, 0.5),
  );

  yield* all(
    option2Box().opacity(1, 0.5),
    option2Cmd().opacity(1, 0.5),
    option2Desc().opacity(1, 0.5),
  );

  yield* all(
    option3Box().opacity(1, 0.5),
    option3Cmd().opacity(1, 0.5),
    option3Desc().opacity(1, 0.5),
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
      height={400}
      fill={"#252526"}
      stroke={"#3e3e42"}
      lineWidth={3}
      y={50}
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
    option1Box().opacity(0, 0.5),
    option1Cmd().opacity(0, 0.5),
    option1Desc().opacity(0, 0.5),
    option2Box().opacity(0, 0.5),
    option2Cmd().opacity(0, 0.5),
    option2Desc().opacity(0, 0.5),
    option3Box().opacity(0, 0.5),
    option3Cmd().opacity(0, 0.5),
    option3Desc().opacity(0, 0.5),
  );

  yield* exampleTitle().opacity(1, 0.8);
  yield* stepBox().opacity(1, 0.6);
  yield* step1().opacity(1, 0.6);
  yield* step2().opacity(1, 0.6);
  yield* step3().opacity(1, 0.6);

  yield* beginSlide("Esempio Pratico");

  // Slide 7: Processo di Compilazione
  const processTitle = createRef<Txt>();
  const sourceBox = createRef<Rect>();
  const sourceText = createRef<Txt>();
  const sourceDesc = createRef<Txt>();
  const compilerBox = createRef<Rect>();
  const compilerText = createRef<Txt>();
  const compilerDesc = createRef<Txt>();
  const execBox = createRef<Rect>();
  const execText = createRef<Txt>();
  const execDesc = createRef<Txt>();
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

  // Source code
  view.add(
    <Rect
      ref={sourceBox}
      width={200}
      height={150}
      fill={"#264f78"}
      stroke={"#569cd6"}
      lineWidth={3}
      x={-400}
      y={20}
      opacity={0}
      radius={8}
    />,
  );

  view.add(
    <Txt
      ref={sourceText}
      text="main.c\n📄"
      fontSize={36}
      fill={"#ffffff"}
      textAlign={"center"}
      x={-400}
      y={20}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={sourceDesc}
      text="Codice sorgente"
      fontSize={22}
      fill={"#9cdcfe"}
      textAlign={"center"}
      x={-400}
      y={130}
      opacity={0}
    />,
  );

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

  // Compiler
  view.add(
    <Rect
      ref={compilerBox}
      width={200}
      height={150}
      fill={"#1a472a"}
      stroke={"#4ec9b0"}
      lineWidth={3}
      x={0}
      y={20}
      opacity={0}
      radius={8}
    />,
  );

  view.add(
    <Txt
      ref={compilerText}
      text="GCC\n⚙️"
      fontSize={36}
      fill={"#ffffff"}
      textAlign={"center"}
      x={0}
      y={20}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={compilerDesc}
      text="Compilatore"
      fontSize={22}
      fill={"#9cdcfe"}
      textAlign={"center"}
      x={0}
      y={130}
      opacity={0}
    />,
  );

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

  // Executable
  view.add(
    <Rect
      ref={execBox}
      width={200}
      height={150}
      fill={"#4d1f00"}
      stroke={"#ce9178"}
      lineWidth={3}
      x={400}
      y={20}
      opacity={0}
      radius={8}
    />,
  );

  view.add(
    <Txt
      ref={execText}
      text="a.out\n🚀"
      fontSize={36}
      fill={"#ffffff"}
      textAlign={"center"}
      x={400}
      y={20}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={execDesc}
      text="Eseguibile"
      fontSize={22}
      fill={"#9cdcfe"}
      textAlign={"center"}
      x={400}
      y={130}
      opacity={0}
    />,
  );

  yield* all(
    exampleTitle().opacity(0, 0.5),
    stepBox().opacity(0, 0.5),
    step1().opacity(0, 0.5),
    step2().opacity(0, 0.5),
    step3().opacity(0, 0.5),
  );

  yield* processTitle().opacity(1, 0.8);

  yield* all(
    sourceBox().opacity(1, 0.6),
    sourceText().opacity(1, 0.6),
    sourceDesc().opacity(1, 0.6),
  );

  yield* arrow1().opacity(1, 0.5);

  yield* all(
    compilerBox().opacity(1, 0.6),
    compilerText().opacity(1, 0.6),
    compilerDesc().opacity(1, 0.6),
  );

  yield* arrow2().opacity(1, 0.5);

  yield* all(
    execBox().opacity(1, 0.6),
    execText().opacity(1, 0.6),
    execDesc().opacity(1, 0.6),
  );

  yield* beginSlide("Processo di Compilazione");

  // Slide 8: Le 4 Fasi di GCC
  const phasesTitle = createRef<Txt>();
  const phasesSubtitle = createRef<Txt>();
  const containerBox = createRef<Rect>();

  // Pre-Processor
  const preBox = createRef<Rect>();
  const preText = createRef<Txt>();
  const preDesc = createRef<Txt>();

  // Compiler
  const compBox = createRef<Rect>();
  const compText = createRef<Txt>();
  const compDesc = createRef<Txt>();

  // Assembler
  const asmBox = createRef<Rect>();
  const asmText = createRef<Txt>();
  const asmDesc = createRef<Txt>();

  // Linker
  const linkBox = createRef<Rect>();
  const linkText = createRef<Txt>();
  const linkDesc = createRef<Txt>();

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

  // Arrow IN (sinistra)
  view.add(
    <Line
      ref={arrowIn}
      points={[
        [-720, 50],
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
  view.add(
    <Rect
      ref={preBox}
      width={260}
      height={200}
      fill={"#3e3e42"}
      stroke={"#569cd6"}
      lineWidth={2}
      x={-405}
      y={50}
      opacity={0}
      radius={8}
    />,
  );

  view.add(
    <Txt
      ref={preText}
      text="Pre-Processor"
      fontSize={24}
      fill={"#569cd6"}
      fontWeight={600}
      textAlign={"center"}
      x={-405}
      y={-10}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={preDesc}
      text="#include\n#define\nmacro"
      fontSize={20}
      fill={"#9cdcfe"}
      textAlign={"center"}
      lineHeight={32}
      x={-405}
      y={60}
      opacity={0}
    />,
  );

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
  view.add(
    <Rect
      ref={compBox}
      width={260}
      height={200}
      fill={"#3e3e42"}
      stroke={"#4ec9b0"}
      lineWidth={2}
      x={-135}
      y={50}
      opacity={0}
      radius={8}
    />,
  );

  view.add(
    <Txt
      ref={compText}
      text="Compiler"
      fontSize={24}
      fill={"#4ec9b0"}
      fontWeight={600}
      textAlign={"center"}
      x={-135}
      y={-10}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={compDesc}
      text="C code\n→\nAssembly"
      fontSize={20}
      fill={"#9cdcfe"}
      textAlign={"center"}
      lineHeight={32}
      x={-135}
      y={60}
      opacity={0}
    />,
  );

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
  view.add(
    <Rect
      ref={asmBox}
      width={260}
      height={200}
      fill={"#3e3e42"}
      stroke={"#c586c0"}
      lineWidth={2}
      x={135}
      y={50}
      opacity={0}
      radius={8}
    />,
  );

  view.add(
    <Txt
      ref={asmText}
      text="Assembler"
      fontSize={24}
      fill={"#c586c0"}
      fontWeight={600}
      textAlign={"center"}
      x={135}
      y={-10}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={asmDesc}
      text="Assembly\n→\nMachine code"
      fontSize={20}
      fill={"#9cdcfe"}
      textAlign={"center"}
      lineHeight={32}
      x={135}
      y={60}
      opacity={0}
    />,
  );

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
  view.add(
    <Rect
      ref={linkBox}
      width={260}
      height={200}
      fill={"#3e3e42"}
      stroke={"#ce9178"}
      lineWidth={2}
      x={405}
      y={50}
      opacity={0}
      radius={8}
    />,
  );

  view.add(
    <Txt
      ref={linkText}
      text="Linker"
      fontSize={24}
      fill={"#ce9178"}
      fontWeight={600}
      textAlign={"center"}
      x={405}
      y={-10}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={linkDesc}
      text="Links\nlibraries\n& objects"
      fontSize={20}
      fill={"#9cdcfe"}
      textAlign={"center"}
      lineHeight={32}
      x={405}
      y={60}
      opacity={0}
    />,
  );

  // Arrow OUT (destra)
  view.add(
    <Line
      ref={arrowOut}
      points={[
        [545, 50],
        [670, 50],
      ]}
      stroke={"#ffffff"}
      lineWidth={5}
      endArrow
      arrowSize={18}
      opacity={0}
    />,
  );

  // Nascondi slide precedente
  yield* all(
    processTitle().opacity(0, 0.5),
    sourceBox().opacity(0, 0.5),
    sourceText().opacity(0, 0.5),
    sourceDesc().opacity(0, 0.5),
    arrow1().opacity(0, 0.5),
    compilerBox().opacity(0, 0.5),
    compilerText().opacity(0, 0.5),
    compilerDesc().opacity(0, 0.5),
    arrow2().opacity(0, 0.5),
    execBox().opacity(0, 0.5),
    execText().opacity(0, 0.5),
    execDesc().opacity(0, 0.5),
  );

  // Mostra titoli
  yield* phasesTitle().opacity(1, 0.8);
  yield* phasesSubtitle().opacity(1, 0.6);

  // Mostra container e arrow in
  yield* containerBox().opacity(1, 0.6);
  yield* arrowIn().opacity(1, 0.5);

  yield* beginSlide("Container");

  // Fase 1: Pre-Processor
  yield* all(
    preBox().opacity(1, 0.6),
    preText().opacity(1, 0.6),
    preDesc().opacity(1, 0.6),
  );
  yield* arrowPre().opacity(1, 0.4);

  yield* beginSlide("Pre-Processor");

  // Fase 2: Compiler
  yield* all(
    compBox().opacity(1, 0.6),
    compText().opacity(1, 0.6),
    compDesc().opacity(1, 0.6),
  );
  yield* arrowComp().opacity(1, 0.4);

  yield* beginSlide("Compiler");

  // Fase 3: Assembler
  yield* all(
    asmBox().opacity(1, 0.6),
    asmText().opacity(1, 0.6),
    asmDesc().opacity(1, 0.6),
  );
  yield* arrowAsm().opacity(1, 0.4);

  yield* beginSlide("Assembler");

  // Fase 4: Linker
  yield* all(
    linkBox().opacity(1, 0.6),
    linkText().opacity(1, 0.6),
    linkDesc().opacity(1, 0.6),
  );
  yield* arrowOut().opacity(1, 0.5);

  yield* beginSlide("Linker");
});
