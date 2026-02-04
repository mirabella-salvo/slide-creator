import { Rect, makeScene2D, Txt, Line } from "@motion-canvas/2d";
import {
  all,
  createRef,
  beginSlide,
  createRefArray,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  // ============ CONFIGURAZIONE ============

  // Stack (sinistra)
  const stackX = -420;
  const stackCellWidth = 140;
  const stackCellHeight = 40;
  const stackStartY = -200;
  const addressX = stackX - stackCellWidth / 2 - 70;

  // Code box (destra)
  const codeBoxX = 280;
  const codeBoxY = -80;
  const codeBoxWidth = 480;
  const codeBoxHeight = 380;

  // Registers (in basso)
  const regY = 330;
  const regBoxWidth = 110;
  const regBoxHeight = 70;
  const regStartX = -400;
  const regSpacing = 130;

  // Indirizzi di memoria stack (dal più alto al più basso per visualizzazione)
  const stackAddresses = [
    { addr: "0xFFF8", index: 0 },
    { addr: "0xFFF0", index: 1 },
    { addr: "0xFFE8", index: 2 },
    { addr: "0xFFE0", index: 3 },
    { addr: "0xFFD8", index: 4 },
    { addr: "0xFFD0", index: 5 },
  ];

  // ============ REFS ============

  // Stack
  const stackTitle = createRef<Txt>();
  const stackCells = createRefArray<Rect>();
  const stackCellValues = createRefArray<Txt>();
  const stackAddressLabels = createRefArray<Txt>();
  const stackCellLabels = createRefArray<Txt>(); // Labels come "old RBP", "a", "b", "result"

  // Indicatori RSP e RBP
  const rspArrow = createRef<Line>();
  const rspLabel = createRef<Txt>();
  const rbpArrow = createRef<Line>();
  const rbpLabel = createRef<Txt>();

  // Code box
  const codeBox = createRef<Rect>();
  const codeBoxTitle = createRef<Txt>();

  // C code lines
  const cCodeLine1 = createRef<Txt>();
  const cCodeLine2 = createRef<Txt>();
  const cCodeLine3 = createRef<Txt>();
  const cCodeLine4 = createRef<Txt>();
  const cCodeLine5 = createRef<Txt>();

  // Assembly lines
  const asmLines = createRefArray<Txt>();
  const asmHighlight = createRef<Rect>();

  // Registers
  const regBoxes = createRefArray<Rect>();
  const regLabels = createRefArray<Txt>();
  const regValues = createRefArray<Txt>();

  // ============ ELEMENTI STACK ============

  view.add(
    <Txt
      ref={stackTitle}
      text="Stack Memory"
      fontSize={32}
      fill={"#dcdcaa"}
      fontWeight={600}
      x={stackX}
      y={stackStartY - 60}
      opacity={0}
    />,
  );

  // Crea celle stack e indirizzi
  stackAddresses.forEach((item, i) => {
    const y = stackStartY + i * (stackCellHeight + 5);

    // Indirizzo memoria
    view.add(
      <Txt
        ref={stackAddressLabels}
        text={item.addr}
        fontSize={18}
        fill={"#808080"}
        fontFamily={"monospace"}
        x={addressX}
        y={y}
        opacity={0}
      />,
    );

    // Cella stack
    view.add(
      <Rect
        ref={stackCells}
        width={stackCellWidth}
        height={stackCellHeight}
        fill={"#2d2d30"}
        stroke={"#569cd6"}
        lineWidth={2}
        radius={4}
        x={stackX}
        y={y}
        opacity={0}
      />,
    );

    // Valore dentro la cella
    view.add(
      <Txt
        ref={stackCellValues}
        text=""
        fontSize={16}
        fill={"#ffffff"}
        fontFamily={"monospace"}
        fontWeight={600}
        x={stackX}
        y={y}
        opacity={0}
      />,
    );

    // Label descrittiva (a destra della cella)
    view.add(
      <Txt
        ref={stackCellLabels}
        text=""
        fontSize={14}
        fill={"#6a9955"}
        fontFamily={"monospace"}
        x={stackX + stackCellWidth / 2 + 50}
        y={y}
        opacity={0}
      />,
    );
  });

  // Indicatore RSP
  const rspY = stackStartY; // Inizialmente punta a 0xFFF8
  view.add(
    <Line
      ref={rspArrow}
      points={[
        [stackX + stackCellWidth / 2 + 100, rspY],
        [stackX + stackCellWidth / 2 + 10, rspY],
      ]}
      stroke={"#4ec9b0"}
      lineWidth={3}
      endArrow
      arrowSize={12}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={rspLabel}
      text="RSP"
      fontSize={18}
      fill={"#4ec9b0"}
      fontWeight={700}
      fontFamily={"monospace"}
      x={stackX + stackCellWidth / 2 + 130}
      y={rspY}
      opacity={0}
    />,
  );

  // Indicatore RBP
  view.add(
    <Line
      ref={rbpArrow}
      points={[
        [stackX + stackCellWidth / 2 + 100, rspY],
        [stackX + stackCellWidth / 2 + 10, rspY],
      ]}
      stroke={"#ce9178"}
      lineWidth={3}
      endArrow
      arrowSize={12}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={rbpLabel}
      text="RBP"
      fontSize={18}
      fill={"#ce9178"}
      fontWeight={700}
      fontFamily={"monospace"}
      x={stackX + stackCellWidth / 2 + 130}
      y={rspY}
      opacity={0}
    />,
  );

  // ============ CODE BOX ============

  view.add(
    <Rect
      ref={codeBox}
      width={codeBoxWidth}
      height={codeBoxHeight}
      fill={"#1e1e1e"}
      stroke={"#3e3e42"}
      lineWidth={3}
      radius={10}
      x={codeBoxX}
      y={codeBoxY}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={codeBoxTitle}
      text="C Code"
      fontSize={24}
      fill={"#569cd6"}
      fontWeight={600}
      x={codeBoxX}
      y={codeBoxY - codeBoxHeight / 2 - 25}
      opacity={0}
    />,
  );

  // C Code lines
  const cCodeX = codeBoxX - codeBoxWidth / 2 + 30;
  const cCodeStartY = codeBoxY - 120;
  const cLineSpacing = 32;

  view.add(
    <Txt
      ref={cCodeLine1}
      text="int sum(int a, int b)"
      fontSize={20}
      fill={"#dcdcaa"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX}
      y={cCodeStartY}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={cCodeLine2}
      text="{"
      fontSize={20}
      fill={"#ffffff"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX}
      y={cCodeStartY + cLineSpacing}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={cCodeLine3}
      text="    int result = a + b;"
      fontSize={20}
      fill={"#9cdcfe"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX}
      y={cCodeStartY + cLineSpacing * 2}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={cCodeLine4}
      text="    return result;"
      fontSize={20}
      fill={"#c586c0"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX}
      y={cCodeStartY + cLineSpacing * 3}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={cCodeLine5}
      text="}"
      fontSize={20}
      fill={"#ffffff"}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX}
      y={cCodeStartY + cLineSpacing * 4}
      opacity={0}
    />,
  );

  // Assembly highlight (rettangolo per evidenziare linea corrente)
  view.add(
    <Rect
      ref={asmHighlight}
      width={codeBoxWidth - 20}
      height={24}
      fill={"#264f78"}
      radius={4}
      x={codeBoxX}
      y={cCodeStartY}
      opacity={0}
    />,
  );

  // Assembly lines
  const asmCode = [
    "sum:",
    "    push rbp",
    "    mov rbp, rsp",
    "    mov QWORD PTR [rbp-24], rdi",
    "    mov QWORD PTR [rbp-32], rsi",
    "    mov rdx, QWORD PTR [rbp-24]",
    "    mov rax, QWORD PTR [rbp-32]",
    "    add rax, rdx",
    "    mov QWORD PTR [rbp-8], rax",
    "    mov rax, QWORD PTR [rbp-8]",
    "    pop rbp",
    "    ret",
  ];

  const asmStartY = cCodeStartY - 20;
  const asmLineSpacing = 26;

  asmCode.forEach((line, i) => {
    const isLabel = line.endsWith(":");
    view.add(
      <Txt
        ref={asmLines}
        text={line}
        fontSize={16}
        fill={isLabel ? "#dcdcaa" : "#9cdcfe"}
        fontFamily={"monospace"}
        fontWeight={isLabel ? 700 : 400}
        offset={[-1, 0]}
        x={cCodeX}
        y={asmStartY + i * asmLineSpacing}
        opacity={0}
      />,
    );
  });

  // ============ REGISTERS ============

  const registers = ["RSP", "RBP", "RDI", "RSI", "RAX"];
  const regInitialValues = ["0xFFF8", "0xFFFF", "5", "3", "?"];
  const regColors = ["#4ec9b0", "#ce9178", "#dcdcaa", "#dcdcaa", "#c586c0"];

  registers.forEach((reg, i) => {
    const x = regStartX + i * regSpacing;

    // Box registro
    view.add(
      <Rect
        ref={regBoxes}
        width={regBoxWidth}
        height={regBoxHeight}
        fill={"#2d2d30"}
        stroke={regColors[i]}
        lineWidth={3}
        radius={8}
        x={x}
        y={regY}
        opacity={0}
      />,
    );

    // Nome registro
    view.add(
      <Txt
        ref={regLabels}
        text={reg}
        fontSize={18}
        fill={regColors[i]}
        fontWeight={700}
        fontFamily={"monospace"}
        x={x}
        y={regY - 18}
        opacity={0}
      />,
    );

    // Valore registro
    view.add(
      <Txt
        ref={regValues}
        text={regInitialValues[i]}
        fontSize={20}
        fill={"#ffffff"}
        fontWeight={600}
        fontFamily={"monospace"}
        x={x}
        y={regY + 12}
        opacity={0}
      />,
    );
  });

  // ============ ANIMAZIONI ============

  // === FASE 1: Setup iniziale ===

  yield* beginSlide("Stack: Intro");

  // Mostra titolo stack
  yield* stackTitle().opacity(1, 0.5);

  // Mostra indirizzi e celle (solo le prime 2 inizialmente visibili)
  yield* all(
    stackAddressLabels[0].opacity(1, 0.3),
    stackAddressLabels[1].opacity(1, 0.3),
    stackCells[0].opacity(1, 0.3),
    stackCells[1].opacity(1, 0.3),
  );

  // Mostra registri
  yield* all(
    ...regBoxes.map((box, i) => box.opacity(1, 0.3 + i * 0.1)),
    ...regLabels.map((label, i) => label.opacity(1, 0.3 + i * 0.1)),
    ...regValues.map((value, i) => value.opacity(1, 0.3 + i * 0.1)),
  );

  // Mostra indicatore RSP (punta a 0xFFF8)
  yield* all(rspArrow().opacity(1, 0.4), rspLabel().opacity(1, 0.4));

  yield* beginSlide("Stack: Initial State");

  // === FASE 2: Mostra C Code ===

  yield* all(codeBox().opacity(1, 0.5), codeBoxTitle().opacity(1, 0.5));

  yield* cCodeLine1().opacity(1, 0.3);
  yield* cCodeLine2().opacity(1, 0.2);
  yield* cCodeLine3().opacity(1, 0.3);
  yield* cCodeLine4().opacity(1, 0.3);
  yield* cCodeLine5().opacity(1, 0.2);

  yield* beginSlide("Stack: C Code");

  // === FASE 3: Transizione a Assembly ===

  // Fade out C code
  yield* all(
    cCodeLine1().opacity(0, 0.4),
    cCodeLine2().opacity(0, 0.4),
    cCodeLine3().opacity(0, 0.4),
    cCodeLine4().opacity(0, 0.4),
    cCodeLine5().opacity(0, 0.4),
    codeBoxTitle().text("x86-64 Assembly", 0.4),
  );

  // Mostra assembly code
  for (let i = 0; i < asmLines.length; i++) {
    yield* asmLines[i].opacity(1, 0.15);
  }

  yield* beginSlide("Stack: Assembly Code");

  // === FASE 4: Esecuzione Assembly ===

  // Helper per muovere highlight
  const highlightLine = function* (lineIndex: number) {
    const y = asmStartY + lineIndex * asmLineSpacing;
    yield* all(asmHighlight().opacity(1, 0.2), asmHighlight().y(y, 0.3));
  };

  // Helper per aggiornare valore registro
  const updateRegValue = function* (regIndex: number, newValue: string) {
    yield* regValues[regIndex].text(newValue, 0.3);
  };

  // Helper per mostrare cella stack
  const showStackCell = function* (
    cellIndex: number,
    value: string,
    label: string,
  ) {
    yield* all(
      stackAddressLabels[cellIndex].opacity(1, 0.3),
      stackCells[cellIndex].opacity(1, 0.3),
    );
    yield* all(
      stackCellValues[cellIndex].text(value, 0.3),
      stackCellValues[cellIndex].opacity(1, 0.3),
      stackCellLabels[cellIndex].text(label, 0.3),
      stackCellLabels[cellIndex].opacity(1, 0.3),
    );
  };

  // Helper per muovere RSP
  const moveRSP = function* (cellIndex: number) {
    const y = stackStartY + cellIndex * (stackCellHeight + 5);
    yield* all(
      rspArrow().points(
        [
          [stackX + stackCellWidth / 2 + 100, y],
          [stackX + stackCellWidth / 2 + 10, y],
        ],
        0.4,
      ),
      rspLabel().y(y, 0.4),
    );
  };

  // Helper per muovere/mostrare RBP
  const moveRBP = function* (cellIndex: number) {
    const y = stackStartY + cellIndex * (stackCellHeight + 5);
    yield* all(
      rbpArrow().opacity(1, 0.3),
      rbpLabel().opacity(1, 0.3),
      rbpArrow().points(
        [
          [stackX + stackCellWidth / 2 + 160, y],
          [stackX + stackCellWidth / 2 + 10, y],
        ],
        0.4,
      ),
      rbpLabel().y(y, 0.4),
      rbpLabel().x(stackX + stackCellWidth / 2 + 190, 0.4),
    );
  };

  // --- Istruzione 1: push rbp ---
  yield* highlightLine(1); // "push rbp"

  // RSP si sposta a 0xFFF0, salva old RBP value
  yield* updateRegValue(0, "0xFFF0"); // RSP = 0xFFF0
  yield* moveRSP(1); // RSP punta a cella 1 (0xFFF0)
  yield* showStackCell(1, "0xFFFF", "old RBP");

  yield* beginSlide("Stack: push rbp");

  // --- Istruzione 2: mov rbp, rsp ---
  yield* highlightLine(2); // "mov rbp, rsp"

  yield* updateRegValue(1, "0xFFF0"); // RBP = RSP = 0xFFF0
  yield* moveRBP(1); // RBP punta alla stessa cella di RSP

  yield* beginSlide("Stack: mov rbp, rsp");

  // --- Istruzione 3: mov QWORD PTR [rbp-24], rdi ---
  yield* highlightLine(3);

  // Mostra cella a rbp-24 (0xFFD8)
  yield* showStackCell(4, "5", "a (rdi)");

  yield* beginSlide("Stack: store a");

  // --- Istruzione 4: mov QWORD PTR [rbp-32], rsi ---
  yield* highlightLine(4);

  // Mostra cella a rbp-32 (0xFFD0)
  yield* showStackCell(5, "3", "b (rsi)");

  yield* beginSlide("Stack: store b");

  // --- Istruzione 5: mov rdx, QWORD PTR [rbp-24] ---
  yield* highlightLine(5);

  // rdx = 5 (carica a da memoria) - mostra visivamente
  yield* stackCells[4].stroke("#dcdcaa", 0.3);
  yield* stackCells[4].stroke("#569cd6", 0.3);

  yield* beginSlide("Stack: load a → rdx");

  // --- Istruzione 6: mov rax, QWORD PTR [rbp-32] ---
  yield* highlightLine(6);

  yield* updateRegValue(4, "3"); // RAX = 3
  yield* stackCells[5].stroke("#c586c0", 0.3);
  yield* stackCells[5].stroke("#569cd6", 0.3);

  yield* beginSlide("Stack: load b → rax");

  // --- Istruzione 7: add rax, rdx ---
  yield* highlightLine(7);

  yield* updateRegValue(4, "8"); // RAX = 3 + 5 = 8

  yield* beginSlide("Stack: add rax, rdx");

  // --- Istruzione 8: mov QWORD PTR [rbp-8], rax ---
  yield* highlightLine(8);

  // Mostra cella result a rbp-8 (0xFFE8)
  yield* showStackCell(2, "8", "result");

  yield* beginSlide("Stack: store result");

  // --- Istruzione 9: mov rax, QWORD PTR [rbp-8] ---
  yield* highlightLine(9);

  yield* stackCells[2].stroke("#c586c0", 0.3);
  yield* stackCells[2].stroke("#569cd6", 0.3);

  yield* beginSlide("Stack: load result → rax");

  // --- Istruzione 10: pop rbp ---
  yield* highlightLine(10);

  yield* updateRegValue(1, "0xFFFF"); // RBP ripristinato
  yield* updateRegValue(0, "0xFFF8"); // RSP torna a 0xFFF8

  yield* all(
    moveRSP(0),
    rbpArrow().opacity(0, 0.3),
    rbpLabel().opacity(0, 0.3),
  );

  // Cella old RBP diventa grigia (deallocata)
  yield* stackCells[1].fill("#1a1a1a", 0.3);
  yield* stackCellValues[1].fill("#808080", 0.3);

  yield* beginSlide("Stack: pop rbp");

  // --- Istruzione 11: ret ---
  yield* highlightLine(11);

  // Animazione finale - highlight verde per successo
  yield* asmHighlight().fill("#2d4a2d", 0.3);

  yield* beginSlide("Stack: ret (return 8)");

  // Fine - mostra risultato finale
  yield* asmHighlight().opacity(0, 0.3);
  yield* regBoxes[4].stroke("#4ec9b0", 0.5); // Evidenzia RAX con il risultato

  yield* beginSlide("Stack: Complete");
});
