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

  // Colori
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

  // Stack (centro)
  const stackX = -50;
  const stackCellWidth = 140;
  const stackCellHeight = 40;
  const stackStartY = -200;
  const addressX = stackX - stackCellWidth / 2 - 70;

  // Code box (destra)
  const codeBoxX = 480;
  const codeBoxY = -50;
  const codeBoxWidth = 380;
  const codeBoxHeight = 400;

  // LIB C box (sinistra)
  const libcBoxX = -500;
  const libcBoxY = -50;
  const libcBoxWidth = 300;
  const libcBoxHeight = 400;

  // Stack addresses (6 celle)
  const stackAddresses = [
    { addr: "0x7FF0", index: 0 },
    { addr: "0x7FE8", index: 1 },
    { addr: "0x7FE0", index: 2 },
    { addr: "0x7FD8", index: 3 },
    { addr: "0x7FD0", index: 4 },
    { addr: "0x7FC8", index: 5 },
  ];

  // ============ REFS ============


  // Stack
  const stackTitle = createRef<Txt>();
  const stackCells = createRefArray<Rect>();
  const stackCellValues = createRefArray<Txt>();
  const stackAddressLabels = createRefArray<Txt>();
  const stackCellLabels = createRefArray<Txt>();

  // RSP/RBP
  const rspArrow = createRef<Line>();
  const rspLabel = createRef<Txt>();
  const rbpArrow = createRef<Line>();
  const rbpLabel = createRef<Txt>();

  // Code box
  const codeBox = createRef<Rect>();
  const codeBoxTitle = createRef<Txt>();
  const cCodeLines = createRefArray<Txt>();
  const codeHighlight = createRef<Rect>();

  // LIB C code box
  const libcCodeBox = createRef<Rect>();
  const libcCodeTitle = createRef<Txt>();
  const libcCodeLines = createRefArray<Txt>();
  const libcHighlight = createRef<Rect>();

  // Overlay
  const outputText = createRef<Txt>();


  // ============ STACK ELEMENTS ============

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
        x={stackX + stackCellWidth / 2 + 160}
        y={y}
        opacity={0}
      />,
    );
  });

  // RSP
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

  // RBP
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

  // C Code (senza win) - indici partono da 0 = void ask_name()
  const cCodeX = codeBoxX - codeBoxWidth / 2 + 25;
  const cCodeStartY = codeBoxY - codeBoxHeight / 2 + 40;
  const cLineSpacing = 24;
  const cFontSize = 16;
  const indent = 30;

  // Line 0: void ask_name()
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
      <Txt fill={YELLOW}>{"ask_name"}</Txt>
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
  // Line 2: char name[16];
  view.add(
    <Txt
      ref={cCodeLines}
      fontSize={cFontSize}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX + indent}
      y={cCodeStartY + cLineSpacing * 2}
      opacity={0}
    >
      <Txt fill={BLUE}>{"char "}</Txt>
      <Txt fill={CYAN}>{"name"}</Txt>
      <Txt fill={GRAY}>{"["}</Txt>
      <Txt fill={NUM_GREEN}>{"16"}</Txt>
      <Txt fill={GRAY}>{"];"}</Txt>
    </Txt>,
  );
  // Line 3: gets(name);
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
      <Txt fill={YELLOW}>{"gets"}</Txt>
      <Txt fill={GRAY}>{"("}</Txt>
      <Txt fill={CYAN}>{"name"}</Txt>
      <Txt fill={GRAY}>{");"}</Txt>
    </Txt>,
  );
  // Line 4: printf("Hello, %s!\n", name);
  view.add(
    <Txt
      ref={cCodeLines}
      fontSize={cFontSize}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX + indent}
      y={cCodeStartY + cLineSpacing * 4}
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
  // Line 5: return;
  view.add(
    <Txt
      ref={cCodeLines}
      fontSize={cFontSize}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX + indent}
      y={cCodeStartY + cLineSpacing * 5}
      opacity={0}
    >
      <Txt fill={PURPLE}>{"return"}</Txt>
      <Txt fill={GRAY}>{";"}</Txt>
    </Txt>,
  );
  // Line 6: }
  view.add(
    <Txt
      ref={cCodeLines}
      text={"}"}
      fontSize={cFontSize}
      fill={GRAY}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX}
      y={cCodeStartY + cLineSpacing * 6}
      opacity={0}
    />,
  );
  // Line 7: (blank)
  // Line 8: int main()
  view.add(
    <Txt
      ref={cCodeLines}
      fontSize={cFontSize}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX}
      y={cCodeStartY + cLineSpacing * 8}
      opacity={0}
    >
      <Txt fill={BLUE}>{"int "}</Txt>
      <Txt fill={YELLOW}>{"main"}</Txt>
      <Txt fill={GRAY}>{"()"}</Txt>
    </Txt>,
  );
  // Line 9: {
  view.add(
    <Txt
      ref={cCodeLines}
      text={"{"}
      fontSize={cFontSize}
      fill={GRAY}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cCodeX}
      y={cCodeStartY + cLineSpacing * 9}
      opacity={0}
    />,
  );
  // Line 10: ask_name();
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
      <Txt fill={YELLOW}>{"ask_name"}</Txt>
      <Txt fill={GRAY}>{"();"}</Txt>
    </Txt>,
  );
  // Line 11: return 0;
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
      <Txt fill={PURPLE}>{"return "}</Txt>
      <Txt fill={NUM_GREEN}>{"0"}</Txt>
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

  // Code highlight
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

  // ============ LIB C CODE BOX ============

  view.add(
    <Rect
      ref={libcCodeBox}
      width={libcBoxWidth}
      height={libcBoxHeight}
      fill={"#1e1e1e"}
      stroke={TEAL}
      lineWidth={3}
      radius={10}
      x={libcBoxX}
      y={libcBoxY}
      opacity={0}
    />,
  );
  view.add(
    <Txt
      ref={libcCodeTitle}
      text="LIB C"
      fontSize={24}
      fill={TEAL}
      fontWeight={700}
      x={libcBoxX}
      y={libcBoxY - libcBoxHeight / 2 - 25}
      opacity={0}
    />,
  );

  const libcCodeX = libcBoxX - libcBoxWidth / 2 + 20;
  const libcCodeStartY = libcBoxY - libcBoxHeight / 2 + 35;
  const libcLineSpacing = 22;
  const libcFontSize = 14;

  // LIB C code: printf
  // Line 0: int printf(...)
  view.add(
    <Txt
      ref={libcCodeLines}
      fontSize={libcFontSize}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={libcCodeX}
      y={libcCodeStartY}
      opacity={0}
    >
      <Txt fill={BLUE}>{"int "}</Txt>
      <Txt fill={YELLOW}>{"printf"}</Txt>
      <Txt fill={GRAY}>{"("}</Txt>
      <Txt fill={BLUE}>{"const char"}</Txt>
      <Txt fill={GRAY}>{"* "}</Txt>
      <Txt fill={CYAN}>{"format"}</Txt>
      <Txt fill={GRAY}>{", ...)"}</Txt>
    </Txt>,
  );
  // Line 1: {
  view.add(
    <Txt
      ref={libcCodeLines}
      text={"{"}
      fontSize={libcFontSize}
      fill={GRAY}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={libcCodeX}
      y={libcCodeStartY + libcLineSpacing}
      opacity={0}
    />,
  );
  // Line 2: // ...
  view.add(
    <Txt
      ref={libcCodeLines}
      text={"  // ..."}
      fontSize={libcFontSize}
      fill={GREEN}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={libcCodeX}
      y={libcCodeStartY + libcLineSpacing * 2}
      opacity={0}
    />,
  );
  // Line 3: }
  view.add(
    <Txt
      ref={libcCodeLines}
      text={"}"}
      fontSize={libcFontSize}
      fill={GRAY}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={libcCodeX}
      y={libcCodeStartY + libcLineSpacing * 3}
      opacity={0}
    />,
  );
  // Line 4: (blank)
  // Line 5: int system(...)
  view.add(
    <Txt
      ref={libcCodeLines}
      fontSize={libcFontSize}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={libcCodeX}
      y={libcCodeStartY + libcLineSpacing * 5}
      opacity={0}
    >
      <Txt fill={BLUE}>{"int "}</Txt>
      <Txt fill={YELLOW}>{"system"}</Txt>
      <Txt fill={GRAY}>{"("}</Txt>
      <Txt fill={BLUE}>{"const char"}</Txt>
      <Txt fill={GRAY}>{"* "}</Txt>
      <Txt fill={CYAN}>{"command"}</Txt>
      <Txt fill={GRAY}>{")"}</Txt>
    </Txt>,
  );
  // Line 6: {
  view.add(
    <Txt
      ref={libcCodeLines}
      text={"{"}
      fontSize={libcFontSize}
      fill={GRAY}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={libcCodeX}
      y={libcCodeStartY + libcLineSpacing * 6}
      opacity={0}
    />,
  );
  // Line 7: // ....
  view.add(
    <Txt
      ref={libcCodeLines}
      text={"  // ...."}
      fontSize={libcFontSize}
      fill={GREEN}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={libcCodeX}
      y={libcCodeStartY + libcLineSpacing * 7}
      opacity={0}
    />,
  );
  // Line 8: }
  view.add(
    <Txt
      ref={libcCodeLines}
      text={"}"}
      fontSize={libcFontSize}
      fill={GRAY}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={libcCodeX}
      y={libcCodeStartY + libcLineSpacing * 8}
      opacity={0}
    />,
  );

  // LIB C highlight (per evidenziare system)
  view.add(
    <Rect
      ref={libcHighlight}
      width={libcBoxWidth - 20}
      height={libcLineSpacing * 4 + 10}
      fill={"#f4474730"}
      stroke={RED}
      lineWidth={2}
      radius={4}
      x={libcBoxX}
      y={libcCodeStartY + libcLineSpacing * 6.5}
      opacity={0}
    />,
  );

  // Output text
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
          stackCellValues[i].fill("#ffffff", 0),
          stackCellLabels[i].text("", 0.2),
          stackCellLabels[i].opacity(0, 0.2),
          stackCellLabels[i].fill(GREEN, 0),
          stackCells[i].stroke(BLUE, 0.2),
          stackCells[i].fill("#2d2d30", 0.2),
        ),
      ),
    );
  };

  // Setup stack (riusato per FASE 2 e 4)
  const setupStack = function* () {
    yield* stackTitle().opacity(1, 0.5);
    yield* all(
      ...stackAddresses.map((_, i) =>
        all(
          stackCells[i].opacity(1, 0.3),
          stackAddressLabels[i].opacity(1, 0.3),
        ),
      ),
    );
    yield* all(rspArrow().opacity(1, 0.4), rspLabel().opacity(1, 0.4));
    yield* showStackCell(0, "...", "main()");
  };

  const setupCodeBox = function* () {
    yield* all(codeBox().opacity(1, 0.5), codeBoxTitle().opacity(1, 0.5));
    for (let i = 0; i < cCodeLines.length; i++) {
      yield* cCodeLines[i].opacity(1, 0.12);
    }
  };

  // Buffer overflow sequence (riusato per FASE 2 e 4)
  const doOverflowSetup = function* () {
    // highlight ask_name()
    codeHighlight().y(cCodeStartY + 10 * cLineSpacing);
    yield* codeHighlight().opacity(1, 0.3);

    yield* beginSlide("LIB: enter ask_name");

    // push main+1, highlight {
    yield* moveRSP(1);
    yield* showStackCell(1, "main+1", "return addr");
    yield* highlightCLine(1);

    yield* beginSlide("LIB: push rbp");

    // push rbp
    yield* moveRSP(2);
    yield* showStackCell(2, "0x7FF0", "saved RBP");
    yield* moveRBP(2);
    yield* highlightCLine(2);

    yield* beginSlide("LIB: char name[16]");

    // sub rsp, highlight gets
    yield* moveRSP(4);
    yield* highlightCLine(3);

    yield* beginSlide("LIB: overflow");
  };

  // ============ ANIMAZIONI ============

  // ==========================================
  // FASE 2: Buffer Overflow → Segmentation Fault
  // ==========================================

  yield* setupCodeBox();
  yield* setupStack();

  yield* beginSlide("LIB: call ask_name");

  yield* doOverflowSetup();

  // Overflow buffer
  yield* overflowCell(4, "AAAAAAAA", "name[0..7]", YELLOW);
  yield* waitFor(0.3);
  yield* overflowCell(3, "AAAAAAAA", "name[8..15]", YELLOW);
  yield* waitFor(0.3);

  yield* beginSlide("LIB: overflow RBP");

  yield* overflowCell(2, "AAAAAAAA", "RBP corrupted!", RED);
  yield* waitFor(0.3);

  yield* beginSlide("LIB: overflow ret");

  // Return address -> win+0 (ma win non esiste -> segfault)
  yield* overflowCell(1, "win+0", "ret addr!", PURPLE);

  yield* beginSlide("LIB: segfault printf");

  // printf
  yield* highlightCLine(4);

  yield* beginSlide("LIB: segfault printf out");

  yield* outputText().text("> Hello, AAAAAAAAAAAAAAAA...!", 0);
  yield* outputText().fill(YELLOW, 0);
  yield* outputText().opacity(1, 0.4);
  yield* highlightCLine(5);

  yield* beginSlide("LIB: segfault return");

  // return → segfault
  yield* outputText().opacity(0, 0.3);

  // Flash cella return address
  yield* all(
    stackCells[1].stroke("#ffffff", 0.2),
    stackCells[1].scale(1.1, 0.2),
  );
  yield* all(stackCells[1].stroke(RED, 0.3), stackCells[1].scale(1, 0.3));

  // Inscurisci celle
  for (let i = 1; i <= 4; i++) {
    yield* all(
      stackCells[i].fill("#1a1a1a", 0.2),
      stackCellValues[i].fill(DIM_GRAY, 0.2),
    );
  }

  // Cella System+x diventa rossa
  yield* all(
    stackCells[1].fill("#3a1a1a", 0.3),
    stackCells[1].stroke(RED, 0.3),
    stackCellValues[1].fill(RED, 0.3),
  );

  // Segmentation fault
  yield* outputText().text("Segmentation fault", 0);
  yield* outputText().fill(RED, 0);
  yield* outputText().opacity(1, 0.4);

  yield* beginSlide("LIB: show libc");

  // ==========================================
  // FASE 3: Mostra LIB C Code Box
  // ==========================================

  // Reset
  yield* all(outputText().opacity(0, 0.3), codeHighlight().opacity(0, 0.3));
  yield* resetStackCells();
  yield* moveRSP(0);
  yield* all(rbpArrow().opacity(0, 0.1), rbpLabel().opacity(0, 0.1));

  // Mostra LIB C code box
  yield* all(libcCodeBox().opacity(1, 0.5), libcCodeTitle().opacity(1, 0.5));
  for (let i = 0; i < libcCodeLines.length; i++) {
    yield* libcCodeLines[i].opacity(1, 0.1);
  }

  yield* beginSlide("LIB: ret2libc setup");

  // ==========================================
  // FASE 4: Return-to-libc (System+x funziona)
  // ==========================================

  // Setup stack
  yield* showStackCell(0, "...", "main()");

  yield* beginSlide("LIB2: call ask_name");

  // Reuse overflow setup
  codeHighlight().y(cCodeStartY + 10 * cLineSpacing);
  yield* codeHighlight().opacity(1, 0.3);

  yield* beginSlide("LIB2: enter ask_name");

  yield* moveRSP(1);
  yield* showStackCell(1, "main+1", "return addr");
  yield* highlightCLine(1);

  yield* beginSlide("LIB2: push rbp");

  yield* moveRSP(2);
  yield* showStackCell(2, "0x7FF0", "saved RBP");
  yield* moveRBP(2);
  yield* highlightCLine(2);

  yield* beginSlide("LIB2: char name[16]");

  yield* moveRSP(4);
  yield* highlightCLine(3);

  yield* beginSlide("LIB2: overflow");

  // Overflow
  yield* overflowCell(4, "AAAAAAAA", "name[0..7]", YELLOW);
  yield* waitFor(0.3);
  yield* overflowCell(3, "AAAAAAAA", "name[8..15]", YELLOW);
  yield* waitFor(0.3);

  yield* beginSlide("LIB2: overflow RBP");

  yield* overflowCell(2, "AAAAAAAA", "RBP corrupted!", RED);
  yield* waitFor(0.3);

  yield* beginSlide("LIB2: overflow ret");

  // Return address -> System+x
  yield* overflowCell(1, "system+x", "ret addr → libc!", PURPLE);

  yield* beginSlide("LIB2: printf");

  yield* highlightCLine(4);

  yield* beginSlide("LIB2: printf out");

  yield* outputText().text("> Hello, AAAAAAAAAAAAAAAA...!", 0);
  yield* outputText().fill(YELLOW, 0);
  yield* outputText().opacity(1, 0.4);
  yield* highlightCLine(5);

  yield* beginSlide("LIB2: return");

  // return → ret2libc
  yield* outputText().opacity(0, 0.3);

  // Flash cella return address
  yield* all(
    stackCells[1].stroke("#ffffff", 0.2),
    stackCells[1].scale(1.1, 0.2),
  );
  yield* all(stackCells[1].stroke(PURPLE, 0.3), stackCells[1].scale(1, 0.3));

  // Inscurisci celle
  for (let i = 1; i <= 4; i++) {
    yield* all(
      stackCells[i].fill("#1a1a1a", 0.2),
      stackCellValues[i].fill(DIM_GRAY, 0.2),
    );
  }

  // Evidenzia system() nel LIB C box
  yield* libcHighlight().opacity(1, 0.4);

  yield* beginSlide("LIB2: shell");

  // /bin/sh
  yield* outputText().text("$ /bin/sh", 0);
  yield* outputText().fill(TEAL, 0);
  yield* outputText().opacity(1, 0.4);

  yield* beginSlide("LIB: End");
});
