import { Rect, makeScene2D, Txt, Line } from "@motion-canvas/2d";
import {
  all,
  createRef,
  beginSlide,
  createRefArray,
} from "@motion-canvas/core";
import { SlideTitle } from "../components";

export default makeScene2D(function* (view) {
  // ============ COLORI ============
  const TEAL = "#4ec9b0";
  const BLUE = "#569cd6";
  const PURPLE = "#c586c0";
  const YELLOW = "#dcdcaa";
  const CYAN = "#9cdcfe";
  const GRAY = "#d4d4d4";
  const BG_MID = "#2d2d30";

  // ============ CONFIGURAZIONE BARRA EVOLUZIONE ============
  const BAR_HEIGHT = 60;
  const BAR_Y = -30;

  // Posizioni sezioni (barra centrata a x=0, totale 800px: da -400 a +400)
  const AL_X = 350;
  const AL_W = 100;
  const AH_X = 250;
  const AH_W = 100;
  const EAX_X = 100;
  const EAX_W = 200;
  const RAX_X = -200;
  const RAX_W = 400;

  // Bracket Y (sotto la barra)
  const BRACK_BASE = BAR_HEIGHT / 2 + 15;
  const AL_BY = BRACK_BASE;
  const AX_BY = BRACK_BASE + 40;
  const EAX_BY = BRACK_BASE + 80;
  const RAX_BY = BRACK_BASE + 120;

  // ============ CONFIGURAZIONE TABELLA ============
  const REG_BOX_W = 170;
  const REG_BOX_H = 90;
  const TABLE_START_Y = -220;
  const TABLE_COL_SP = 195;
  const TABLE_ROW_SP = 180;

  // Numero colonne per riga (per centrare ogni riga)
  const rowCols: Record<number, number> = { 0: 4, 1: 2, 2: 2 };
  const regX = (row: number, col: number) =>
    (col - (rowCols[row] - 1) / 2) * TABLE_COL_SP;

  const registerTableData = [
    { name: "RAX", desc: "Accumulator", color: YELLOW, row: 0, col: 0 },
    { name: "RBX", desc: "Base", color: YELLOW, row: 0, col: 1 },
    { name: "RCX", desc: "Counter", color: YELLOW, row: 0, col: 2 },
    { name: "RDX", desc: "Data", color: YELLOW, row: 0, col: 3 },
    { name: "RSI", desc: "Source Index", color: CYAN, row: 1, col: 0 },
    { name: "RDI", desc: "Dest Index", color: CYAN, row: 1, col: 1 },
    { name: "RSP", desc: "Stack Pointer", color: TEAL, row: 2, col: 0 },
    { name: "RBP", desc: "Base Pointer", color: TEAL, row: 2, col: 1 },
  ];

  const categoryData = [
    { label: "Data", color: YELLOW, row: 0 },
    { label: "Index", color: CYAN, row: 1 },
    { label: "Pointer", color: TEAL, row: 2 },
  ];

  // ============ REFS ============

  // Barra evoluzione
  const barContainer = createRef<Rect>();
  const evolutionNote = createRef<Txt>();

  const alRect = createRef<Rect>();
  const alLabel = createRef<Txt>();
  const ahRect = createRef<Rect>();
  const ahLabel = createRef<Txt>();
  const eaxUpperRect = createRef<Rect>();
  const raxUpperRect = createRef<Rect>();

  const alBracket = createRef<Line>();
  const alBitLabel = createRef<Txt>();
  const axBracket = createRef<Line>();
  const axBitLabel = createRef<Txt>();
  const eaxBracket = createRef<Line>();
  const eaxBitLabel = createRef<Txt>();
  const raxBracket = createRef<Line>();
  const raxBitLabel = createRef<Txt>();

  // Tabella registri
  const tableContainer = createRef<Rect>();
  const tableTitle = createRef<Txt>();
  const r8Note = createRef<Txt>();
  const tableCategoryLabels = createRefArray<Txt>();
  const tableRegBoxes = createRefArray<Rect>();
  const tableRegNames = createRefArray<Txt>();
  const tableRegDescs = createRefArray<Txt>();

  // ============ JSX: BARRA EVOLUZIONE ============

  view.add(
    <Rect ref={barContainer} x={0} y={BAR_Y} layout={false} opacity={0}>
      {/* RAX upper (leftmost, purple) */}
      <Rect
        ref={raxUpperRect}
        x={RAX_X}
        y={0}
        width={RAX_W}
        height={BAR_HEIGHT}
        fill={"#c586c020"}
        stroke={PURPLE}
        lineWidth={2}
        radius={[8, 0, 0, 8]}
        opacity={0}
      />

      {/* EAX upper (blue) */}
      <Rect
        ref={eaxUpperRect}
        x={EAX_X}
        y={0}
        width={EAX_W}
        height={BAR_HEIGHT}
        fill={"#569cd620"}
        stroke={BLUE}
        lineWidth={2}
        opacity={0}
      />

      {/* AH (teal) */}
      <Rect
        ref={ahRect}
        x={AH_X}
        y={0}
        width={AH_W}
        height={BAR_HEIGHT}
        fill={"#4ec9b030"}
        stroke={TEAL}
        lineWidth={2}
        opacity={0}
      />
      <Txt
        ref={ahLabel}
        x={AH_X}
        y={0}
        text="AH"
        fontSize={22}
        fill={TEAL}
        fontWeight={700}
        fontFamily={"monospace"}
        opacity={0}
      />

      {/* AL (teal, rightmost) */}
      <Rect
        ref={alRect}
        x={AL_X}
        y={0}
        width={AL_W}
        height={BAR_HEIGHT}
        fill={"#4ec9b030"}
        stroke={TEAL}
        lineWidth={2}
        radius={[0, 8, 8, 0]}
        opacity={0}
      />
      <Txt
        ref={alLabel}
        x={AL_X}
        y={0}
        text="AL"
        fontSize={22}
        fill={TEAL}
        fontWeight={700}
        fontFamily={"monospace"}
        opacity={0}
      />

      {/* === BRACKETS === */}

      {/* AL: 8 bits */}
      <Line
        ref={alBracket}
        points={[
          [300, AL_BY - 10],
          [300, AL_BY],
          [400, AL_BY],
          [400, AL_BY - 10],
        ]}
        stroke={TEAL}
        lineWidth={2}
        opacity={0}
      />
      <Txt
        ref={alBitLabel}
        x={350}
        y={AL_BY + 18}
        text="8 bits"
        fontSize={16}
        fill={TEAL}
        fontFamily={"monospace"}
        opacity={0}
      />

      {/* AX: 16 bits */}
      <Line
        ref={axBracket}
        points={[
          [200, AX_BY - 10],
          [200, AX_BY],
          [400, AX_BY],
          [400, AX_BY - 10],
        ]}
        stroke={TEAL}
        lineWidth={2}
        opacity={0}
      />
      <Txt
        ref={axBitLabel}
        x={300}
        y={AX_BY + 18}
        text={"AX \u2014 16 bits"}
        fontSize={16}
        fill={TEAL}
        fontFamily={"monospace"}
        opacity={0}
      />

      {/* EAX: 32 bits */}
      <Line
        ref={eaxBracket}
        points={[
          [0, EAX_BY - 10],
          [0, EAX_BY],
          [400, EAX_BY],
          [400, EAX_BY - 10],
        ]}
        stroke={BLUE}
        lineWidth={2}
        opacity={0}
      />
      <Txt
        ref={eaxBitLabel}
        x={200}
        y={EAX_BY + 18}
        text={"EAX \u2014 32 bits"}
        fontSize={16}
        fill={BLUE}
        fontFamily={"monospace"}
        opacity={0}
      />

      {/* RAX: 64 bits */}
      <Line
        ref={raxBracket}
        points={[
          [-400, RAX_BY - 10],
          [-400, RAX_BY],
          [400, RAX_BY],
          [400, RAX_BY - 10],
        ]}
        stroke={PURPLE}
        lineWidth={2}
        opacity={0}
      />
      <Txt
        ref={raxBitLabel}
        x={0}
        y={RAX_BY + 18}
        text={"RAX \u2014 64 bits"}
        fontSize={16}
        fill={PURPLE}
        fontFamily={"monospace"}
        opacity={0}
      />
    </Rect>,
  );

  // Nota esplicativa sopra la barra
  view.add(
    <Txt
      ref={evolutionNote}
      x={0}
      y={-280}
      text=""
      fontSize={28}
      fill={GRAY}
      opacity={0}
    />,
  );

  // ============ JSX: TABELLA REGISTRI ============

  view.add(
    <Rect ref={tableContainer} x={0} y={0} layout={false} opacity={0}>
      <Txt
        ref={tableTitle}
        x={0}
        y={-350}
        text="x86-64 General Purpose Registers"
        fontSize={42}
        fill={YELLOW}
        fontWeight={600}
        opacity={0}
      />

      <Txt
        ref={r8Note}
        x={0}
        y={TABLE_START_Y + 3 * TABLE_ROW_SP}
        text={"R8 \u2013 R15 : 8 additional registers (x86-64)"}
        fontSize={24}
        fill={"#808080"}
        fontFamily={"monospace"}
        opacity={0}
      />
    </Rect>,
  );

  // Aggiungi category labels (centrate sopra ogni riga)
  categoryData.forEach((cat) => {
    tableContainer().add(
      <Txt
        ref={tableCategoryLabels}
        x={0}
        y={TABLE_START_Y + cat.row * TABLE_ROW_SP - 75}
        text={cat.label}
        fontSize={22}
        fill={cat.color}
        fontWeight={600}
        fontFamily={"monospace"}
        opacity={0}
      />,
    );
  });

  // Aggiungi register boxes (centrati per riga)
  registerTableData.forEach((reg) => {
    const x = regX(reg.row, reg.col);
    const y = TABLE_START_Y + reg.row * TABLE_ROW_SP;

    tableContainer().add(
      <Rect
        ref={tableRegBoxes}
        width={REG_BOX_W}
        height={REG_BOX_H}
        fill={BG_MID}
        stroke={reg.color}
        lineWidth={3}
        radius={8}
        x={x}
        y={y}
        opacity={0}
      />,
    );
    tableContainer().add(
      <Txt
        ref={tableRegNames}
        text={reg.name}
        fontSize={26}
        fill={reg.color}
        fontWeight={700}
        fontFamily={"monospace"}
        x={x}
        y={y - 15}
        opacity={0}
      />,
    );
    tableContainer().add(
      <Txt
        ref={tableRegDescs}
        text={reg.desc}
        fontSize={14}
        fill={GRAY}
        x={x}
        y={y + 20}
        opacity={0}
      />,
    );
  });

  // ============ ANIMAZIONI ============

  // === SLIDE 1: Title ===

  const titleSlide = SlideTitle({
    title: "CPU Registers",
    subtitle: "From 8-bit to 64-bit",
    titleColor: YELLOW,
    subtitleColor: CYAN,
    titleFontSize: 70,
    subtitleFontSize: 40,
    y: -50,
  });

  titleSlide.nodes.forEach((node) => node && view.add(node));

  yield* all(
    titleSlide.titleRef().opacity(1, 1),
    titleSlide.titleRef().scale(1.1, 0.5).to(1, 0.5),
  );
  yield* titleSlide.subtitleRef().opacity(1, 0.8);

  yield* beginSlide("Registers: Title");

  // === SLIDE 2: AL (8-bit) ===

  yield* all(
    titleSlide.titleRef().opacity(0, 0.5),
    titleSlide.subtitleRef().opacity(0, 0.5),
  );

  yield* barContainer().opacity(1, 0.3);

  evolutionNote().text("Accumulator Low");
  yield* evolutionNote().opacity(1, 0.4);

  yield* all(alRect().opacity(1, 0.5), alLabel().opacity(1, 0.5));
  yield* all(alBracket().opacity(1, 0.4), alBitLabel().opacity(1, 0.4));

  yield* beginSlide("Registers: AL (8-bit)");

  // === SLIDE 3: AX (16-bit) ===

  yield* evolutionNote().text("Accumulator eXtended (16-bit)", 0.3);

  yield* all(ahRect().opacity(1, 0.5), ahLabel().opacity(1, 0.5));
  yield* all(axBracket().opacity(1, 0.4), axBitLabel().opacity(1, 0.4));

  yield* beginSlide("Registers: AX (16-bit)");

  // === SLIDE 4: EAX (32-bit) ===

  yield* evolutionNote().text("Extended AX (32-bit, i386)", 0.3);

  yield* eaxUpperRect().opacity(1, 0.5);
  yield* all(eaxBracket().opacity(1, 0.4), eaxBitLabel().opacity(1, 0.4));

  yield* beginSlide("Registers: EAX (32-bit)");

  // === SLIDE 5: RAX (64-bit) ===

  yield* evolutionNote().text("Register AX (64-bit, x86-64)", 0.3);

  yield* raxUpperRect().opacity(1, 0.5);
  yield* all(raxBracket().opacity(1, 0.4), raxBitLabel().opacity(1, 0.4));

  yield* beginSlide("Registers: RAX (64-bit)");

  // === SLIDE 6: Transizione a tabella ===

  yield* all(barContainer().opacity(0, 0.5), evolutionNote().opacity(0, 0.5));

  yield* tableContainer().opacity(1, 0.3);
  yield* tableTitle().opacity(1, 0.6);

  yield* beginSlide("Registers: Full Set Intro");

  // === SLIDE 7: Data Registers ===

  yield* tableCategoryLabels[0].opacity(1, 0.4);

  yield* all(
    ...registerTableData
      .filter((r) => r.row === 0)
      .map((_, i) =>
        all(
          tableRegBoxes[i].opacity(1, 0.3 + i * 0.1),
          tableRegNames[i].opacity(1, 0.3 + i * 0.1),
          tableRegDescs[i].opacity(1, 0.3 + i * 0.1),
        ),
      ),
  );

  yield* beginSlide("Registers: Data Registers");

  // === SLIDE 8: Index Registers ===

  yield* tableCategoryLabels[1].opacity(1, 0.4);

  yield* all(
    ...[4, 5].map((i, j) =>
      all(
        tableRegBoxes[i].opacity(1, 0.3 + j * 0.1),
        tableRegNames[i].opacity(1, 0.3 + j * 0.1),
        tableRegDescs[i].opacity(1, 0.3 + j * 0.1),
      ),
    ),
  );

  yield* beginSlide("Registers: Index Registers");

  // === SLIDE 9: Pointer Registers ===

  yield* tableCategoryLabels[2].opacity(1, 0.4);

  yield* all(
    ...[6, 7].map((i, j) =>
      all(
        tableRegBoxes[i].opacity(1, 0.3 + j * 0.1),
        tableRegNames[i].opacity(1, 0.3 + j * 0.1),
        tableRegDescs[i].opacity(1, 0.3 + j * 0.1),
      ),
    ),
  );

  yield* beginSlide("Registers: Pointer Registers");

  // === SLIDE 10: R8-R15 ===

  yield* r8Note().opacity(1, 0.5);

  yield* beginSlide("Registers: R8-R15");
});
