import { Rect, makeScene2D, Txt, Line } from "@motion-canvas/2d";
import {
  all,
  createRef,
  beginSlide,
  createRefArray,
  waitFor,
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
  const codeBoxY = -60;
  const codeBoxWidth = 480;
  const codeBoxHeight = 500;

  // Colori (identici a stack.tsx)
  const TEAL = "#4ec9b0";
  const ORANGE = "#ce9178";
  const BLUE = "#569cd6";
  const YELLOW = "#dcdcaa";
  const CYAN = "#9cdcfe";
  const PURPLE = "#c586c0";
  const GRAY = "#d4d4d4";
  const DIM_GRAY = "#808080";
  const GREEN = "#6a9955";
  const RED = "#f44747";
  const GOLD = "#e6db74";
  const NUM_GREEN = "#b5cea8";

  // Stack addresses (8 celle)
  const stackAddresses = [
    { addr: "0x7FF0", index: 0 },
    { addr: "0x7FE8", index: 1 },
    { addr: "0x7FE0", index: 2 },
    { addr: "0x7FD8", index: 3 },
    { addr: "0x7FD0", index: 4 },
    { addr: "0x7FC8", index: 5 },
    { addr: "0x7FC0", index: 6 },
    { addr: "0x7FB8", index: 7 },
  ];

  // ============ REFS ============

  // Stack
  const stackTitle = createRef<Txt>();
  const stackCells = createRefArray<Rect>();
  const stackCellValues = createRefArray<Txt>();
  const stackAddressLabels = createRefArray<Txt>();
  const stackCellLabels = createRefArray<Txt>();

  // Indicatori RSP e RBP
  const rspArrow = createRef<Line>();
  const rspLabel = createRef<Txt>();
  const rbpArrow = createRef<Line>();
  const rbpLabel = createRef<Txt>();

  // Code box
  const codeBox = createRef<Rect>();
  const codeBoxTitle = createRef<Txt>();

  // C code lines
  const cCodeLines = createRefArray<Txt>();

  // Overlay effects
  const phaseTitle = createRef<Txt>();
  const phaseSubtitle = createRef<Txt>();
  const crashBg = createRef<Rect>();
  const outputText = createRef<Txt>();

  // Memory layout diagram
  const memSections = createRefArray<Rect>();
  const memAddrTop = createRef<Txt>();
  const memAddrBottom = createRef<Txt>();
  const memGapLine = createRef<Rect>();
  const stackArrow1 = createRef<Line>();
  const stackArrow2 = createRef<Line>();
  const heapArrow1 = createRef<Line>();
  const heapArrow2 = createRef<Line>();

  // ============ ELEMENTI STACK ============

  view.add(
    <Txt
      ref={stackTitle}
      text="Stack Memory"
      fontSize={32}
      fill={YELLOW}
      fontWeight={600}
      x={stackX}
      y={stackStartY - 60}
      opacity={0}
    />,
  );

  // Crea celle stack e indirizzi
  stackAddresses.forEach((item, i) => {
    const y = stackStartY + i * (stackCellHeight + 5);

    view.add(
      <Txt
        ref={stackAddressLabels}
        text={item.addr}
        fontSize={18}
        fill={DIM_GRAY}
        fontFamily={"monospace"}
        x={addressX}
        y={y}
        opacity={0}
      />,
    );

    view.add(
      <Rect
        ref={stackCells}
        width={stackCellWidth}
        height={stackCellHeight}
        fill={"#2d2d30"}
        stroke={BLUE}
        lineWidth={2}
        radius={4}
        x={stackX}
        y={y}
        opacity={0}
      />,
    );

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

    view.add(
      <Txt
        ref={stackCellLabels}
        text=""
        fontSize={14}
        fill={GREEN}
        fontFamily={"monospace"}
        offset={[-1, 0]}
        x={stackX + stackCellWidth / 2 + 210}
        y={y}
        opacity={0}
      />,
    );
  });

  // Indicatore RSP
  const rspY = stackStartY;
  view.add(
    <Line
      ref={rspArrow}
      points={[
        [stackX + stackCellWidth / 2 + 100, rspY],
        [stackX + stackCellWidth / 2 + 10, rspY],
      ]}
      stroke={TEAL}
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
      fill={TEAL}
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
      stroke={ORANGE}
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
      fill={ORANGE}
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
      fill={BLUE}
      fontWeight={600}
      x={codeBoxX}
      y={codeBoxY - codeBoxHeight / 2 - 25}
      opacity={0}
    />,
  );

  // C Code lines - posizionate relative alla box con padding
  const cCodeX = codeBoxX - codeBoxWidth / 2 + 30;
  const cCodeStartY = codeBoxY - codeBoxHeight / 2 + 35;
  const cLineSpacing = 24;
  const cFontSize = 16;
  const indent = 30;

  // Line 0: void win()
  view.add(
    <Txt
      ref={cCodeLines}
      fontSize={cFontSize}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX}
      y={cCodeStartY}
      opacity={0}
    >
      <Txt fill={BLUE}>{"void "}</Txt>
      <Txt fill={YELLOW}>{"win"}</Txt>
      <Txt fill={GRAY}>{"()"}</Txt>
    </Txt>,
  );

  // Line 1: {
  view.add(
    <Txt
      ref={cCodeLines}
      text={"{"}
      fontSize={cFontSize}
      fill={GRAY}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX}
      y={cCodeStartY + cLineSpacing}
      opacity={0}
    />,
  );

  // Line 2:     // ...
  view.add(
    <Txt
      ref={cCodeLines}
      text={"    // ..."}
      fontSize={cFontSize}
      fill={GREEN}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX}
      y={cCodeStartY + cLineSpacing * 2}
      opacity={0}
    />,
  );

  // Line 3:     return;
  view.add(
    <Txt
      ref={cCodeLines}
      fontSize={cFontSize}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX + indent}
      y={cCodeStartY + cLineSpacing * 3}
      opacity={0}
    >
      <Txt fill={PURPLE}>{"return"}</Txt>
      <Txt fill={GRAY}>{";"}</Txt>
    </Txt>,
  );

  // Line 4: }
  view.add(
    <Txt
      ref={cCodeLines}
      text={"}"}
      fontSize={cFontSize}
      fill={GRAY}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX}
      y={cCodeStartY + cLineSpacing * 4}
      opacity={0}
    />,
  );

  // Line 5: (blank spacer)
  view.add(
    <Txt
      ref={cCodeLines}
      text={""}
      fontSize={cFontSize}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX}
      y={cCodeStartY + cLineSpacing * 5}
      opacity={0}
    />,
  );

  // Line 6: void ask_name()
  view.add(
    <Txt
      ref={cCodeLines}
      fontSize={cFontSize}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX}
      y={cCodeStartY + cLineSpacing * 6}
      opacity={0}
    >
      <Txt fill={BLUE}>{"void "}</Txt>
      <Txt fill={YELLOW}>{"ask_name"}</Txt>
      <Txt fill={GRAY}>{"()"}</Txt>
    </Txt>,
  );

  // Line 7: {
  view.add(
    <Txt
      ref={cCodeLines}
      text={"{"}
      fontSize={cFontSize}
      fill={GRAY}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX}
      y={cCodeStartY + cLineSpacing * 7}
      opacity={0}
    />,
  );

  // Line 8:     char name[16];
  view.add(
    <Txt
      ref={cCodeLines}
      fontSize={cFontSize}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX + indent}
      y={cCodeStartY + cLineSpacing * 8}
      opacity={0}
    >
      <Txt fill={BLUE}>{"char "}</Txt>
      <Txt fill={CYAN}>{"name"}</Txt>
      <Txt fill={GRAY}>{"["}</Txt>
      <Txt fill={NUM_GREEN}>{"16"}</Txt>
      <Txt fill={GRAY}>{"];"}</Txt>
    </Txt>,
  );

  // Line 9:     gets(name);
  view.add(
    <Txt
      ref={cCodeLines}
      fontSize={cFontSize}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX + indent}
      y={cCodeStartY + cLineSpacing * 9}
      opacity={0}
    >
      <Txt fill={YELLOW}>{"gets"}</Txt>
      <Txt fill={GRAY}>{"("}</Txt>
      <Txt fill={CYAN}>{"name"}</Txt>
      <Txt fill={GRAY}>{");"}</Txt>
    </Txt>,
  );

  // Line 10:     printf("Hello, %s!\n", name);
  view.add(
    <Txt
      ref={cCodeLines}
      fontSize={cFontSize}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX + indent}
      y={cCodeStartY + cLineSpacing * 10}
      opacity={0}
    >
      <Txt fill={YELLOW}>{"printf"}</Txt>
      <Txt fill={GRAY}>{"("}</Txt>
      <Txt fill={ORANGE}>{'"Hello, %s!\\n"'}</Txt>
      <Txt fill={GRAY}>{", "}</Txt>
      <Txt fill={CYAN}>{"name"}</Txt>
      <Txt fill={GRAY}>{");"}</Txt>
    </Txt>,
  );

  // Line 11:     return;
  view.add(
    <Txt
      ref={cCodeLines}
      fontSize={cFontSize}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX + indent}
      y={cCodeStartY + cLineSpacing * 11}
      opacity={0}
    >
      <Txt fill={PURPLE}>{"return"}</Txt>
      <Txt fill={GRAY}>{";"}</Txt>
    </Txt>,
  );

  // Line 12: }
  view.add(
    <Txt
      ref={cCodeLines}
      text={"}"}
      fontSize={cFontSize}
      fill={GRAY}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX}
      y={cCodeStartY + cLineSpacing * 12}
      opacity={0}
    />,
  );

  // Line 13: (blank)
  view.add(
    <Txt
      ref={cCodeLines}
      text={""}
      fontSize={cFontSize}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX}
      y={cCodeStartY + cLineSpacing * 13}
      opacity={0}
    />,
  );

  // Line 14: int main()
  view.add(
    <Txt
      ref={cCodeLines}
      fontSize={cFontSize}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX}
      y={cCodeStartY + cLineSpacing * 14}
      opacity={0}
    >
      <Txt fill={BLUE}>{"int "}</Txt>
      <Txt fill={YELLOW}>{"main"}</Txt>
      <Txt fill={GRAY}>{"()"}</Txt>
    </Txt>,
  );

  // Line 15: {
  view.add(
    <Txt
      ref={cCodeLines}
      text={"{"}
      fontSize={cFontSize}
      fill={GRAY}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX}
      y={cCodeStartY + cLineSpacing * 15}
      opacity={0}
    />,
  );

  // Line 16:     ask_name();
  view.add(
    <Txt
      ref={cCodeLines}
      fontSize={cFontSize}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX + indent}
      y={cCodeStartY + cLineSpacing * 16}
      opacity={0}
    >
      <Txt fill={YELLOW}>{"ask_name"}</Txt>
      <Txt fill={GRAY}>{"();"}</Txt>
    </Txt>,
  );

  // Line 17:     return 0;
  view.add(
    <Txt
      ref={cCodeLines}
      fontSize={cFontSize}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX + indent}
      y={cCodeStartY + cLineSpacing * 17}
      opacity={0}
    >
      <Txt fill={PURPLE}>{"return "}</Txt>
      <Txt fill={NUM_GREEN}>{"0"}</Txt>
      <Txt fill={GRAY}>{";"}</Txt>
    </Txt>,
  );

  // Line 18: }
  view.add(
    <Txt
      ref={cCodeLines}
      text={"}"}
      fontSize={cFontSize}
      fill={GRAY}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX}
      y={cCodeStartY + cLineSpacing * 18}
      opacity={0}
    />,
  );

  // Code highlight rectangle
  const codeHighlight = createRef<Rect>();
  view.add(
    <Rect
      ref={codeHighlight}
      width={codeBoxWidth - 20}
      height={22}
      fill={"#264f7880"}
      radius={4}
      x={codeBoxX}
      y={cCodeStartY}
      opacity={0}
    />,
  );

  // ============ OVERLAY ELEMENTS ============

  view.add(
    <Txt
      ref={outputText}
      text=""
      fontSize={18}
      fill={GREEN}
      fontWeight={600}
      fontFamily={"monospace"}
      x={codeBoxX}
      y={codeBoxY + codeBoxHeight / 2 + 30}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={phaseTitle}
      text=""
      fontSize={52}
      fill={RED}
      fontWeight={900}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={phaseSubtitle}
      text=""
      fontSize={28}
      fill={"#ffffff"}
      fontWeight={600}
      fontFamily={"monospace"}
      y={50}
      opacity={0}
    />,
  );

  view.add(
    <Rect ref={crashBg} width={1920} height={1080} fill={RED} opacity={0} />,
  );

  // ============ MEMORY LAYOUT DIAGRAM ============

  const memColX = 0;
  const memWidth = 380;
  const memAddrX = memColX + memWidth / 2 + 110;

  // Sezioni: nome, descrizione, altezza, colore fill, colore bordo, y center
  const memSectionData = [
    {
      title: "OS Kernel Space",
      desc: "User code cannot read/write\nSegmentation Fault",
      h: 75,
      fill: "#5D1A1A",
      stroke: "#8B0000",
      yCenter: -233,
    },
    {
      title: "Stack",
      desc: "Function frames, return address\n(grows towards lower addresses)",
      h: 75,
      fill: "#1B3A1B",
      stroke: "#4CAF50",
      yCenter: -150,
    },
    {
      title: "Heap",
      desc: "Dynamic memory allocation\nmalloc / free\n(grows towards higher addresses)",
      h: 82,
      fill: "#3A2A00",
      stroke: "#FFB300",
      yCenter: 65,
    },
    {
      title: "BSS",
      desc: "Uninitialized static variables\nfilled with zeros",
      h: 75,
      fill: "#3A2200",
      stroke: "#FF9800",
      yCenter: 152,
    },
    {
      title: "Data",
      desc: "Static variables\nexplicitly initialized",
      h: 75,
      fill: "#2A1A3A",
      stroke: "#CE93D8",
      yCenter: 235,
    },
    {
      title: "Text",
      desc: "Binary image of the process",
      h: 55,
      fill: "#1A1A3A",
      stroke: "#7E57C2",
      yCenter: 308,
    },
  ];

  memSectionData.forEach((sec) => {
    view.add(
      <Rect
        ref={memSections}
        width={memWidth}
        height={sec.h}
        layout
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={4}
        fill={sec.fill}
        stroke={sec.stroke}
        lineWidth={2}
        radius={6}
        x={memColX}
        y={sec.yCenter}
        opacity={0}
      >
        <Txt text={sec.title} fontSize={20} fill={"#ffffff"} fontWeight={700} />
        <Txt
          text={sec.desc}
          fontSize={12}
          fill={"#cccccc"}
          fontFamily={"monospace"}
          textAlign={"center"}
        />
      </Rect>,
    );
  });

  // Indirizzi
  view.add(
    <Txt
      ref={memAddrTop}
      text="0xFFFFFFFFFFFFFFFF"
      fontSize={16}
      fill={DIM_GRAY}
      fontFamily={"monospace"}
      fontWeight={600}
      x={memAddrX}
      y={-275}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={memAddrBottom}
      text="0x0000000000000000"
      fontSize={16}
      fill={DIM_GRAY}
      fontFamily={"monospace"}
      fontWeight={600}
      x={memAddrX}
      y={340}
      opacity={0}
    />,
  );

  // Gap tratteggiato tra Stack e Heap (box vuota)
  view.add(
    <Rect
      ref={memGapLine}
      width={memWidth}
      height={120}
      fill={"#00000000"}
      stroke={DIM_GRAY}
      lineWidth={2}
      lineDash={[8, 6]}
      radius={6}
      x={memColX}
      y={-44}
      opacity={0}
    />,
  );

  // Frecce Stack (verso il basso ↓) - ai lati del box
  const stackSecY = -150;
  const arrowOffsetX = memWidth / 2 + 20;
  view.add(
    <Line
      ref={stackArrow1}
      points={[
        [memColX - arrowOffsetX, stackSecY - 20],
        [memColX - arrowOffsetX, stackSecY + 40],
      ]}
      stroke={"#4CAF50"}
      lineWidth={3}
      endArrow
      arrowSize={14}
      opacity={0}
    />,
  );
  view.add(
    <Line
      ref={stackArrow2}
      points={[
        [memColX + arrowOffsetX, stackSecY - 20],
        [memColX + arrowOffsetX, stackSecY + 40],
      ]}
      stroke={"#4CAF50"}
      lineWidth={3}
      endArrow
      arrowSize={14}
      opacity={0}
    />,
  );

  // Frecce Heap (verso l'alto ↑) - ai lati del box
  const heapSecY = 65;
  view.add(
    <Line
      ref={heapArrow1}
      points={[
        [memColX - arrowOffsetX, heapSecY + 20],
        [memColX - arrowOffsetX, heapSecY - 40],
      ]}
      stroke={"#FFB300"}
      lineWidth={3}
      endArrow
      arrowSize={14}
      opacity={0}
    />,
  );
  view.add(
    <Line
      ref={heapArrow2}
      points={[
        [memColX + arrowOffsetX, heapSecY + 20],
        [memColX + arrowOffsetX, heapSecY - 40],
      ]}
      stroke={"#FFB300"}
      lineWidth={3}
      endArrow
      arrowSize={14}
      opacity={0}
    />,
  );

  // ============ HELPER FUNCTIONS ============

  const highlightCLine = function* (lineIndex: number) {
    const y = cCodeStartY + lineIndex * cLineSpacing;
    yield* all(codeHighlight().opacity(1, 0.2), codeHighlight().y(y, 0.3));
  };

  const showStackCell = function* (
    cellIndex: number,
    value: string,
    label: string,
  ) {
    yield* all(
      stackCellValues[cellIndex].text(value, 0.3),
      stackCellValues[cellIndex].opacity(1, 0.3),
      stackCellLabels[cellIndex].text(label, 0.3),
      stackCellLabels[cellIndex].opacity(1, 0.3),
    );
  };

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

  const moveRBP = function* (cellIndex: number) {
    const y = stackStartY + cellIndex * (stackCellHeight + 5) + 14;
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

  const overflowCell = function* (
    cellIndex: number,
    value: string,
    label: string,
    strokeColor: string,
  ) {
    yield* all(
      stackCellValues[cellIndex].text(value, 0.3),
      stackCellValues[cellIndex].opacity(1, 0.3),
      stackCellValues[cellIndex].fill(
        strokeColor === RED ? RED : "#ffffff",
        0.3,
      ),
      stackCellLabels[cellIndex].text(label, 0.3),
      stackCellLabels[cellIndex].opacity(1, 0.3),
      stackCellLabels[cellIndex].fill(strokeColor === RED ? RED : GREEN, 0.3),
      stackCells[cellIndex].stroke(strokeColor, 0.3),
    );
  };

  const resetStackCells = function* () {
    yield* all(
      ...stackAddresses.map((_, i) =>
        all(
          stackCellValues[i].text("", 0.2),
          stackCellValues[i].opacity(0, 0.2),
          stackCellValues[i].fill("#ffffff", 0.2),
          stackCellLabels[i].text("", 0.2),
          stackCellLabels[i].opacity(0, 0.2),
          stackCellLabels[i].fill(GREEN, 0.2),
          stackCells[i].stroke(BLUE, 0.2),
          stackCells[i].fill("#2d2d30", 0.2),
        ),
      ),
    );
  };

  // ============ ANIMAZIONI ============

  // ==========================================
  // MEMORY LAYOUT DIAGRAM (prima slide)
  // ==========================================

  // Fade in tutto il memory layout
  yield* all(
    memAddrTop().opacity(1, 0.5),
    memAddrBottom().opacity(1, 0.5),
    ...memSectionData.map((_, i) => memSections[i].opacity(1, 0.5)),
    memGapLine().opacity(1, 0.5),
    stackArrow1().opacity(1, 0.5),
    stackArrow2().opacity(1, 0.5),
    heapArrow1().opacity(1, 0.5),
    heapArrow2().opacity(1, 0.5),
  );

  yield* beginSlide("Mem: Full Layout");

  // Fade out memory layout
  yield* all(
    memAddrTop().opacity(0, 0.4),
    memAddrBottom().opacity(0, 0.4),
    ...memSectionData.map((_, i) => memSections[i].opacity(0, 0.4)),
    memGapLine().opacity(0, 0.4),
    stackArrow1().opacity(0, 0.4),
    stackArrow2().opacity(0, 0.4),
    heapArrow1().opacity(0, 0.4),
    heapArrow2().opacity(0, 0.4),
  );

  // ==========================================
  // FASE 1: Mostra Codice C
  // ==========================================

  yield* all(codeBox().opacity(1, 0.5), codeBoxTitle().opacity(1, 0.5));

  for (let i = 0; i < cCodeLines.length; i++) {
    if (i === 5 || i === 13) continue; // Skip blank lines
    yield* cCodeLines[i].opacity(1, 0.15);
  }

  yield* beginSlide("BO: Stack Setup");

  // ==========================================
  // FASE 2: Setup Stack SENZA canary + esecuzione normale
  // ==========================================

  // Mostra stack
  yield* stackTitle().opacity(1, 0.5);
  yield* all(
    ...stackAddresses.map((_, i) =>
      all(stackCells[i].opacity(1, 0.3), stackAddressLabels[i].opacity(1, 0.3)),
    ),
  );

  // Mostra registri (solo 6, senza R8)
  for (let i = 0; i < 6; i++) {
    yield* all();
  }

  // RSP e main() frame (già presente, senza highlight)
  yield* all(rspArrow().opacity(1, 0.4), rspLabel().opacity(1, 0.4));
  yield* showStackCell(0, "...", "main()");

  yield* beginSlide("BO: call ask_name");

  // Evidenzia ask_name() - appare direttamente senza slide
  codeHighlight().y(cCodeStartY + 16 * cLineSpacing);
  yield* codeHighlight().opacity(1, 0.3);

  yield* beginSlide("BO: enter ask_name");

  // call: RSP scende, poi appare return address
  yield* moveRSP(1);
  yield* showStackCell(1, "main+1", "return addr");

  // Evidenzia { di ask_name
  yield* highlightCLine(7);

  yield* beginSlide("BO: push rbp");

  // push rbp
  yield* moveRSP(2);
  yield* showStackCell(2, "0x7FF0", "saved RBP");

  // mov rbp, rsp
  yield* moveRBP(2);

  // char name[16] -> sub rsp, 16
  yield* highlightCLine(8);

  yield* beginSlide("BO: char name[16]");

  yield* moveRSP(4);
  yield* highlightCLine(9);

  yield* beginSlide("BO: gets Alice");

  // gets(name) - input "Alice"
  yield* showStackCell(4, "Alice\\0", "name[0..7]");
  yield* showStackCell(3, "", "name[8..15]");

  // printf
  yield* highlightCLine(10);

  yield* beginSlide("BO: printf Alice");

  yield* outputText().text("> Hello, Alice!", 0);
  yield* outputText().opacity(1, 0.4);

  // return;
  yield* highlightCLine(11);

  yield* beginSlide("BO: return");

  // leave + ret
  yield* moveRSP(2);
  yield* all(rbpArrow().opacity(0, 0.3), rbpLabel().opacity(0, 0.3));
  yield* moveRSP(0);

  // Celle deallocate
  for (let i = 1; i <= 4; i++) {
    yield* all(
      stackCells[i].fill("#1a1a1a", 0.2),
      stackCellValues[i].fill(DIM_GRAY, 0.2),
    );
  }

  // Fade out output e highlight return 0 di main
  yield* outputText().opacity(0, 0.3);
  yield* highlightCLine(17);

  yield* beginSlide("BO: Attack Setup");

  // ==========================================
  // FASE 3: Overflow SENZA canary (attacco riesce)
  // ==========================================

  // Reset
  yield* all(
    codeHighlight().opacity(0, 0.3),
    codeHighlight().fill("#264f7880", 0),
    outputText().opacity(0, 0.3),
    outputText().fill(GREEN, 0),
  );
  yield* resetStackCells();
  yield* moveRSP(0);

  // Ri-setup stack (senza canary)
  yield* showStackCell(0, "...", "main()");

  yield* beginSlide("BO2: call ask_name");

  codeHighlight().y(cCodeStartY + 16 * cLineSpacing);
  yield* codeHighlight().opacity(1, 0.3); // ask_name()

  yield* beginSlide("BO2: enter ask_name");

  yield* moveRSP(1);
  yield* showStackCell(1, "main+1", "return addr");
  yield* highlightCLine(7); // { di ask_name

  yield* beginSlide("BO2: push rbp");

  yield* moveRSP(2);
  yield* showStackCell(2, "0x7FF0", "saved RBP");
  yield* moveRBP(2);
  yield* highlightCLine(8);

  yield* beginSlide("BO2: char name[16]");

  yield* moveRSP(4);
  yield* highlightCLine(9);

  yield* beginSlide("BO: Overflow Input");

  // Buffer (2 celle: 4 e 3)
  yield* overflowCell(4, "AAAAAAAA", "name[0..7]", YELLOW);
  yield* waitFor(0.3);
  yield* overflowCell(3, "AAAAAAAA", "name[8..15]", YELLOW);
  yield* waitFor(0.3);

  yield* beginSlide("BO: Overflow RBP");

  // Saved RBP sovrascritta
  yield* overflowCell(2, "AAAAAAAA", "RBP corrupted!", RED);
  yield* waitFor(0.3);

  yield* beginSlide("BO: Overflow Return Addr");

  // Return address -> &win()
  yield* overflowCell(1, "win+0", "ret addr -> win()!", PURPLE);

  yield* beginSlide("BO: printf overflow");

  // printf - evidenziatore si sposta
  yield* highlightCLine(10);

  yield* beginSlide("BO: printf output");

  // output appare
  yield* outputText().text("> Hello, AAAAAAAAAAAAAAAA...!", 0);
  yield* outputText().fill(YELLOW, 0);
  yield* outputText().opacity(1, 0.4);
  yield* highlightCLine(11);

  yield* beginSlide("BO: Hijacked Return");

  // return; - flash + inscurisci celle, poi evidenziatore su win()
  yield* outputText().opacity(0, 0.3);

  // Flash cella return address
  yield* all(
    stackCells[1].stroke("#ffffff", 0.2),
    stackCells[1].scale(1.1, 0.2),
  );
  yield* all(stackCells[1].stroke(PURPLE, 0.3), stackCells[1].scale(1, 0.3));

  // Inscurisci celle stack (deallocate)
  for (let i = 1; i <= 4; i++) {
    yield* all(
      stackCells[i].fill("#1a1a1a", 0.2),
      stackCellValues[i].fill(DIM_GRAY, 0.2),
    );
  }

  // Poi evidenziatore su win()
  yield* highlightCLine(0);
  yield* codeHighlight().fill("#f4474780", 0.3);

  yield* beginSlide("SC: Shellcode Intro");

  // ==========================================
  // FASE 3b: Shellcode Injection (senza win)
  // ==========================================

  yield* all(
    codeHighlight().opacity(0, 0.3),
    codeHighlight().fill("#264f7880", 0),
  );

  // Reset stack
  yield* resetStackCells();
  yield* moveRSP(0);
  yield* all(rbpArrow().opacity(0, 0.1), rbpLabel().opacity(0, 0.1));

  // Nascondi win() nel codice C (righe 0-4)
  yield* all(
    cCodeLines[0].opacity(0, 0.3),
    cCodeLines[1].opacity(0, 0.3),
    cCodeLines[2].opacity(0, 0.3),
    cCodeLines[3].opacity(0, 0.3),
    cCodeLines[4].opacity(0, 0.3),
  );

  // Ri-setup stack (senza canary)
  yield* showStackCell(0, "...", "main()");

  yield* beginSlide("SC: call ask_name");

  codeHighlight().y(cCodeStartY + 16 * cLineSpacing);
  yield* codeHighlight().opacity(1, 0.3); // ask_name()

  yield* beginSlide("SC: enter ask_name");

  yield* moveRSP(1);
  yield* showStackCell(1, "main+1", "return addr");
  yield* highlightCLine(7); // { di ask_name

  yield* beginSlide("SC: push rbp");

  yield* moveRSP(2);
  yield* showStackCell(2, "0x7FF0", "saved RBP");
  yield* moveRBP(2);
  yield* highlightCLine(8);

  yield* beginSlide("SC: char name[16]");

  yield* moveRSP(4);
  yield* highlightCLine(9);

  yield* beginSlide("SC: Shellcode Overflow");

  // Overflow con shellcode (tutti e 3 insieme)
  yield* overflowCell(4, "push /bin/sh", "shellcode", YELLOW);
  yield* waitFor(0.3);
  yield* overflowCell(3, "mov rdi, rsp", "shellcode", YELLOW);
  yield* waitFor(0.3);
  yield* overflowCell(2, "call execve", "shellcode", YELLOW);
  yield* waitFor(0.3);

  yield* beginSlide("SC: Shellcode Ret");

  // Return address -> $RSP (punta allo stack!)
  yield* overflowCell(1, "$RSP", "ret addr -> stack!", PURPLE);

  yield* beginSlide("SC: printf");

  // printf
  yield* highlightCLine(10);

  yield* beginSlide("SC: printf output");

  yield* outputText().text("> Hello, shellcode...!", 0);
  yield* outputText().fill(YELLOW, 0);
  yield* outputText().opacity(1, 0.4);
  yield* highlightCLine(11);

  yield* beginSlide("SC: return");

  // return; - fade output, flash return addr, inscurisci celle
  yield* outputText().opacity(0, 0.3);

  yield* all(
    stackCells[1].stroke("#ffffff", 0.2),
    stackCells[1].scale(1.1, 0.2),
  );
  yield* all(stackCells[1].stroke(PURPLE, 0.3), stackCells[1].scale(1, 0.3));

  // Inscurisci celle stack
  for (let i = 1; i <= 4; i++) {
    yield* all(
      stackCells[i].fill("#1a1a1a", 0.2),
      stackCellValues[i].fill(DIM_GRAY, 0.2),
    );
  }

  // Fade out code highlight
  yield* codeHighlight().opacity(0, 0.3);

  // Evidenziatore ROSSO sulla cella 4 (0x7FD0) - esecuzione shellcode
  yield* all(
    stackCells[4].fill("#3a1a1a", 0.3),
    stackCells[4].stroke(RED, 0.3),
    stackCellValues[4].fill("#ffffff", 0.3),
  );

  yield* beginSlide("SC: exec cell 3");

  // Evidenziatore sale a cella 3 (cella 4 torna normale)
  yield* all(
    stackCells[4].fill("#2d2d30", 0.2),
    stackCells[4].stroke(YELLOW, 0.2),
  );
  yield* all(
    stackCells[3].fill("#3a1a1a", 0.3),
    stackCells[3].stroke(RED, 0.3),
    stackCellValues[3].fill("#ffffff", 0.3),
  );

  yield* beginSlide("SC: exec cell 2");

  // Evidenziatore sale a cella 2 (cella 3 torna normale)
  yield* all(
    stackCells[3].fill("#2d2d30", 0.2),
    stackCells[3].stroke(YELLOW, 0.2),
  );
  yield* all(
    stackCells[2].fill("#3a1a1a", 0.3),
    stackCells[2].stroke(RED, 0.3),
    stackCellValues[2].fill("#ffffff", 0.3),
  );

  yield* beginSlide("SC: shell");

  // Prompt bash sotto il codice C
  yield* outputText().text("$ /bin/sh", 0);
  yield* outputText().fill(TEAL, 0);
  yield* outputText().opacity(1, 0.4);

  yield* beginSlide("SC: Canary Intro");

  // Cleanup: ripristina win(), nascondi output e resetta
  yield* all(
    stackCells[2].fill("#1a1a1a", 0.2),
    stackCells[2].stroke(DIM_GRAY, 0.2),
    outputText().opacity(0, 0.3),
  );
  yield* all(
    cCodeLines[0].opacity(1, 0.3),
    cCodeLines[1].opacity(1, 0.3),
    cCodeLines[2].opacity(1, 0.3),
    cCodeLines[3].opacity(1, 0.3),
    cCodeLines[4].opacity(1, 0.3),
  );

  // ==========================================
  // FASE 4: Introduzione Canary
  // ==========================================

  // Reset stack
  yield* resetStackCells();
  yield* moveRSP(0);
  yield* all(rbpArrow().opacity(0, 0.1), rbpLabel().opacity(0, 0.1));

  // Ri-setup stack CON canary
  yield* showStackCell(0, "...", "main()");

  yield* beginSlide("CAN: call ask_name");

  codeHighlight().y(cCodeStartY + 16 * cLineSpacing);
  yield* codeHighlight().opacity(1, 0.3); // ask_name()

  yield* beginSlide("CAN: enter ask_name");

  yield* moveRSP(1);
  yield* showStackCell(1, "main+1", "return addr");
  yield* highlightCLine(7); // { di ask_name

  yield* beginSlide("CAN: push rbp");

  yield* moveRSP(2);
  yield* showStackCell(2, "0x7FF0", "saved RBP");
  yield* moveRBP(2);

  // Store canary
  yield* showStackCell(3, "0xDEAD", "canary");
  yield* stackCells[3].stroke(GOLD, 0.3);
  yield* highlightCLine(8);

  yield* beginSlide("CAN: char name[16]");

  yield* moveRSP(5);
  yield* highlightCLine(9);

  yield* beginSlide("BO: Canary Overflow Input");

  // ==========================================
  // FASE 5: Overflow CON canary (attacco bloccato)
  // ==========================================

  // Buffer
  yield* overflowCell(5, "AAAAAAAA", "name[0..7]", YELLOW);
  yield* waitFor(0.3);
  yield* overflowCell(4, "AAAAAAAA", "name[8..15]", YELLOW);
  yield* waitFor(0.3);

  yield* beginSlide("BO: Canary Overflow Canary");

  // Canary sovrascritta!
  yield* overflowCell(3, "AAAAAAAA", "canary corrupted!", RED);
  yield* waitFor(0.3);

  yield* beginSlide("BO: Canary Overflow RBP");

  // Saved RBP sovrascritta
  yield* overflowCell(2, "AAAAAAAA", "RBP corrupted!", RED);
  yield* waitFor(0.3);

  yield* beginSlide("BO: Canary Overflow Ret");

  // Return address -> &win()
  yield* overflowCell(1, "win+0", "ret addr -> win()!", PURPLE);

  yield* beginSlide("BO: Canary printf");

  // printf - evidenziatore si sposta
  yield* highlightCLine(10);

  yield* beginSlide("BO: Canary printf output");

  // output appare
  yield* outputText().text("> Hello, AAAAAAAAAAAAAAAA...!", 0);
  yield* outputText().fill(YELLOW, 0);
  yield* outputText().opacity(1, 0.4);
  yield* highlightCLine(11);

  yield* beginSlide("BO: Canary Return");

  // return; -> canary check failed
  yield* outputText().opacity(0, 0.3);
  yield* codeHighlight().fill("#f4474780", 0.3);
  yield* outputText().text("*** stack smashing detected ***", 0);
  yield* outputText().fill(RED, 0);
  yield* outputText().opacity(1, 0.4);

  yield* beginSlide("BO: Lesson");

  // ==========================================
  // SLIDE FINALE
  // ==========================================

  // Fade out tutto
  yield* all(
    outputText().opacity(0, 0.3),
    codeHighlight().opacity(0, 0.3),
    codeBox().opacity(0, 0.3),
    codeBoxTitle().opacity(0, 0.3),
    ...cCodeLines.map((line) => line.opacity(0, 0.3)),
    stackTitle().opacity(0, 0.3),
    ...stackAddresses.map((_, i) =>
      all(
        stackCells[i].opacity(0, 0.3),
        stackCellValues[i].opacity(0, 0.3),
        stackAddressLabels[i].opacity(0, 0.3),
        stackCellLabels[i].opacity(0, 0.3),
      ),
    ),
    rspArrow().opacity(0, 0.3),
    rspLabel().opacity(0, 0.3),
    rbpArrow().opacity(0, 0.3),
    rbpLabel().opacity(0, 0.3),
  );

});
