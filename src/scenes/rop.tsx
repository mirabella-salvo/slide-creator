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
  const NUM_GREEN = "#b5cea8";

  // ============ REFS ============

  // FASE 1: C source + asm box
  const mainBox = createRef<Rect>();
  const mainBoxTitle = createRef<Txt>();
  const cSourceLines = createRefArray<Txt>();
  const asmLines = createRefArray<Txt>();
  const gadgetHighlight = createRef<Rect>();

  // FASE 2: Gadget sparsi + chain
  const scatteredGadgets = createRefArray<Rect>();
  const chainArrows = createRefArray<Line>();

  // FASE 3: Stack + assembly box
  const stackTitle = createRef<Txt>();
  const stackCells = createRefArray<Rect>();
  const stackCellValues = createRefArray<Txt>();
  const stackAddressLabels = createRefArray<Txt>();
  const stackCellLabels = createRefArray<Txt>();
  const rspArrow = createRef<Line>();
  const rspLabel = createRef<Txt>();
  const asmBox = createRef<Rect>();
  const asmBoxTitle = createRef<Txt>();
  const asmBoxLines = createRefArray<Txt>();
  const asmHighlight = createRef<Rect>();


  // ============ FASE 1: ELEMENTI ============

  const mainBoxX = 0;
  const mainBoxY = 0;
  const mainBoxWidth = 700;
  const mainBoxHeight = 380;

  view.add(
    <Rect
      ref={mainBox}
      width={mainBoxWidth}
      height={mainBoxHeight}
      fill={"#1e1e1e"}
      stroke={"#3e3e42"}
      lineWidth={3}
      radius={10}
      x={mainBoxX}
      y={mainBoxY}
      opacity={0}
    />,
  );
  view.add(
    <Txt
      ref={mainBoxTitle}
      text="C Code"
      fontSize={28}
      fill={BLUE}
      fontWeight={600}
      x={mainBoxX}
      y={mainBoxY - mainBoxHeight / 2 - 30}
      opacity={0}
    />,
  );

  // C source: int sum(int a, int b) { int result = a+b; return result; }
  const cStartX = mainBoxX - mainBoxWidth / 2 + 40;
  const cStartY = mainBoxY - 90;
  const cLineSpacing = 32;
  const cFontSize = 22;
  const indent = 40;

  // Line 0: int sum(int a, int b) {
  view.add(
    <Txt
      ref={cSourceLines}
      fontSize={cFontSize}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cStartX}
      y={cStartY}
      opacity={0}
    >
      <Txt fill={BLUE}>{"int "}</Txt>
      <Txt fill={YELLOW}>{"sum"}</Txt>
      <Txt fill={GRAY}>{"("}</Txt>
      <Txt fill={BLUE}>{"int "}</Txt>
      <Txt fill={CYAN}>{"a"}</Txt>
      <Txt fill={GRAY}>{", "}</Txt>
      <Txt fill={BLUE}>{"int "}</Txt>
      <Txt fill={CYAN}>{"b"}</Txt>
      <Txt fill={GRAY}>{") {"}</Txt>
    </Txt>,
  );
  // Line 1: int result = a + b;
  view.add(
    <Txt
      ref={cSourceLines}
      fontSize={cFontSize}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cStartX + indent}
      y={cStartY + cLineSpacing}
      opacity={0}
    >
      <Txt fill={BLUE}>{"int "}</Txt>
      <Txt fill={CYAN}>{"result"}</Txt>
      <Txt fill={GRAY}>{" = "}</Txt>
      <Txt fill={CYAN}>{"a"}</Txt>
      <Txt fill={GRAY}>{" + "}</Txt>
      <Txt fill={CYAN}>{"b"}</Txt>
      <Txt fill={GRAY}>{";"}</Txt>
    </Txt>,
  );
  // Line 2: return result;
  view.add(
    <Txt
      ref={cSourceLines}
      fontSize={cFontSize}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cStartX + indent}
      y={cStartY + cLineSpacing * 2}
      opacity={0}
    >
      <Txt fill={PURPLE}>{"return "}</Txt>
      <Txt fill={CYAN}>{"result"}</Txt>
      <Txt fill={GRAY}>{";"}</Txt>
    </Txt>,
  );
  // Line 3: }
  view.add(
    <Txt
      ref={cSourceLines}
      text={"}"}
      fontSize={cFontSize}
      fill={GRAY}
      fontFamily={"monospace"}
      offset={[-1, 0]}
      x={cStartX}
      y={cStartY + cLineSpacing * 3}
      opacity={0}
    />,
  );

  // Assembly: sum:
  const asmStartY = mainBoxY - mainBoxHeight / 2 + 35;
  const asmLineSpacing = 28;
  const asmFontSize = 18;
  const asmTextLines = [
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
  asmTextLines.forEach((line, i) => {
    const isLabel = line.endsWith(":");
    view.add(
      <Txt
        ref={asmLines}
        text={line}
        fontSize={asmFontSize}
        fill={isLabel ? YELLOW : CYAN}
        fontWeight={isLabel ? 700 : 400}
        fontFamily={"monospace"}
        offset={[-1, 0]}
        x={cStartX}
        y={asmStartY + i * asmLineSpacing}
        opacity={0}
      />,
    );
  });

  // Gadget highlight (rettangolo rosso su pop rbp + ret)
  view.add(
    <Rect
      ref={gadgetHighlight}
      width={mainBoxWidth - 40}
      height={asmLineSpacing * 2 + 10}
      stroke={RED}
      lineWidth={3}
      radius={6}
      fill={"#00000000"}
      x={mainBoxX}
      y={asmStartY + 10.5 * asmLineSpacing}
      opacity={0}
    />,
  );

  // ============ FASE 2: GADGET SPARSI ============

  const gadgetTexts = [
    "pop rax; ret;",
    "pop rbp; mov eax, r11d; ret;",
    "pop rsp; pop r13; ret;",
    "push rsi; add rsp, 0x10; pop rbx; ret;",
    "add rsp, 8; ret;",
    "xor eax, eax; ret;",
    "pop rbx; pop rbp; pop r12; ret;",
    "pop rsi; ret;",
    "pop rdi; ret;",
    "pop rdx; ret;",
    "syscall; ret;",
  ];

  // Posizioni sparse deterministiche per gli 11 gadget
  const gadgetPositions: { x: number; y: number; rot: number }[] = [
    { x: -580, y: -300, rot: -4 },
    { x: -200, y: -330, rot: 3 },
    { x: 200, y: -280, rot: -2 },
    { x: 560, y: -310, rot: 5 },
    { x: -560, y: -80, rot: 2 },
    { x: -150, y: -100, rot: -3 },
    { x: 250, y: -60, rot: 4 },
    { x: 600, y: -90, rot: -2 },
    { x: -500, y: 150, rot: 3 },
    { x: -100, y: 180, rot: -4 },
    { x: 380, y: 170, rot: 2 },
  ];

  gadgetTexts.forEach((text, i) => {
    const pos = gadgetPositions[i];
    view.add(
      <Rect
        ref={scatteredGadgets}
        width={Math.max(180, text.length * 11 + 20)}
        height={45}
        fill={"#1e1e1e"}
        stroke={BLUE}
        lineWidth={2}
        radius={6}
        x={pos.x}
        y={pos.y}
        rotation={pos.rot}
        opacity={0}
        layout
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Txt
          text={text}
          fontSize={16}
          fill={CYAN}
          fontFamily={"monospace"}
        />
      </Rect>,
    );
  });

  // Indici dei 5 gadget da tenere: pop rax(0), pop rdi(8), pop rsi(7), pop rdx(9), syscall(10)
  const chainIndices = [0, 8, 7, 9, 10];

  // Frecce della chain (tra i 5 gadget = 4 frecce)
  for (let i = 0; i < 4; i++) {
    const yTop = -200 + i * 100 + 22;
    const yBot = yTop + 55;
    view.add(
      <Line
        ref={chainArrows}
        points={[
          [0, yTop],
          [0, yBot],
        ]}
        stroke={RED}
        lineWidth={3}
        endArrow
        arrowSize={12}
        opacity={0}
      />,
    );
  }

  // ============ FASE 3: STACK + ASSEMBLY BOX ============

  const stackX = -380;
  const stackCellWidth = 160;
  const stackCellHeight = 42;
  const stackStartY = -240;
  const addressX = stackX - stackCellWidth / 2 - 70;
  const stackAddresses = [
    "0x7FF0",
    "0x7FE8",
    "0x7FE0",
    "0x7FD8",
    "0x7FD0",
    "0x7FC8",
    "0x7FC0",
    "0x7FB8",
    "0x7FB0",
  ];

  view.add(
    <Txt
      ref={stackTitle}
      text="Stack Memory"
      fontSize={28}
      fill={YELLOW}
      fontWeight={600}
      x={stackX}
      y={stackStartY - 55}
      opacity={0}
    />,
  );

  stackAddresses.forEach((addr, i) => {
    const y = stackStartY + i * (stackCellHeight + 5);
    view.add(
      <Txt
        ref={stackAddressLabels}
        text={addr}
        fontSize={16}
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
        fontSize={15}
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
        fontSize={13}
        fill={GREEN}
        fontFamily={"monospace"}
        offset={[-1, 0]}
        x={stackX + stackCellWidth / 2 + 15}
        y={y}
        opacity={0}
      />,
    );
  });

  // RSP
  view.add(
    <Line
      ref={rspArrow}
      points={[
        [stackX + stackCellWidth / 2 + 100, stackStartY],
        [stackX + stackCellWidth / 2 + 10, stackStartY],
      ]}
      stroke={TEAL}
      lineWidth={3}
      endArrow
      arrowSize={10}
      opacity={0}
    />,
  );
  view.add(
    <Txt
      ref={rspLabel}
      text="RSP"
      fontSize={16}
      fill={TEAL}
      fontWeight={700}
      fontFamily={"monospace"}
      x={stackX + stackCellWidth / 2 + 130}
      y={stackStartY}
      opacity={0}
    />,
  );

  // Assembly box a destra
  const asmBoxX = 280;
  const asmBoxY = 0;
  const asmBoxWidth = 560;
  const asmBoxHeight = 520;

  view.add(
    <Rect
      ref={asmBox}
      width={asmBoxWidth}
      height={asmBoxHeight}
      fill={"#1e1e1e"}
      stroke={"#3e3e42"}
      lineWidth={3}
      radius={10}
      x={asmBoxX}
      y={asmBoxY}
      opacity={0}
    />,
  );
  view.add(
    <Txt
      ref={asmBoxTitle}
      text="Assembly (Text)"
      fontSize={22}
      fill={BLUE}
      fontWeight={600}
      x={asmBoxX}
      y={asmBoxY - asmBoxHeight / 2 - 25}
      opacity={0}
    />,
  );

  const asmBoxStartX = asmBoxX - asmBoxWidth / 2 + 20;
  const asmBoxStartY = asmBoxY - asmBoxHeight / 2 + 30;
  const asmBoxLineSpacing = 28;
  const asmBoxFontSize = 16;

  type AsmLine =
    | { type: "gadget"; addr: string; instr: string }
    | { type: "arrow" };

  const asmBoxTextLines: AsmLine[] = [
    { type: "gadget", addr: "main+50:", instr: "ret" },
    { type: "arrow" },
    { type: "gadget", addr: "func+37:", instr: "pop rsi;" },
    { type: "gadget", addr: "func+38:", instr: "ret;" },
    { type: "arrow" },
    { type: "gadget", addr: "foo+65:", instr: "pop rdi;" },
    { type: "gadget", addr: "foo+66:", instr: "ret;" },
    { type: "arrow" },
    { type: "gadget", addr: "bar+80:", instr: "pop rdx;" },
    { type: "gadget", addr: "bar+81:", instr: "ret;" },
    { type: "arrow" },
    { type: "gadget", addr: "zub+91:", instr: "pop rax;" },
    { type: "gadget", addr: "zub+92:", instr: "ret;" },
    { type: "arrow" },
    { type: "gadget", addr: "baz+90:", instr: "syscall;" },
    { type: "gadget", addr: "baz+91:", instr: "ret;" },
  ];

  asmBoxTextLines.forEach((line, i) => {
    if (line.type === "arrow") {
      view.add(
        <Txt
          ref={asmBoxLines}
          text={"↓"}
          fontSize={18}
          fill={DIM_GRAY}
          fontFamily={"monospace"}
          fontWeight={700}
          x={asmBoxX}
          y={asmBoxStartY + i * asmBoxLineSpacing}
          opacity={0}
        />,
      );
      return;
    }
    view.add(
      <Txt
        ref={asmBoxLines}
        fontSize={asmBoxFontSize}
        fontFamily={"monospace"}
        offset={[-1, 0]}
        x={asmBoxStartX}
        y={asmBoxStartY + i * asmBoxLineSpacing}
        opacity={0}
      >
        <Txt fill={DIM_GRAY}>{line.addr + " "}</Txt>
        <Txt fill={CYAN}>{line.instr}</Txt>
      </Txt>,
    );
  });

  view.add(
    <Rect
      ref={asmHighlight}
      width={asmBoxWidth - 20}
      height={asmBoxLineSpacing - 2}
      fill={"#264f7880"}
      radius={4}
      x={asmBoxX}
      y={asmBoxStartY}
      opacity={0}
    />,
  );

  // ============ HELPERS ============

  const showStackCell = function* (cellIndex: number, value: string, label: string) {
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

  const highlightAsmLine = function* (lineIndex: number) {
    const y = asmBoxStartY + lineIndex * asmBoxLineSpacing;
    yield* all(asmHighlight().opacity(1, 0.2), asmHighlight().y(y, 0.3));
  };

  // ============ ANIMAZIONI ============

  // ==========================================
  // FASE 1: Origine del gadget
  // ==========================================

  // Slide 1: Mostra C source
  yield* all(mainBox().opacity(1, 0.5), mainBoxTitle().opacity(1, 0.5));
  for (let i = 0; i < cSourceLines.length; i++) {
    yield* cSourceLines[i].opacity(1, 0.2);
  }

  yield* beginSlide("ROP: C source");

  // Slide 2: Fade C → Fade Asm
  yield* all(
    ...cSourceLines.map((line) => line.opacity(0, 0.4)),
    mainBoxTitle().text("Assembly", 0.4),
    mainBoxTitle().fill(CYAN, 0.4),
  );

  for (let i = 0; i < asmLines.length; i++) {
    yield* asmLines[i].opacity(1, 0.1);
  }

  yield* beginSlide("ROP: Assembly");

  // Slide 3: Rettangolo rosso su pop rbp + ret
  yield* gadgetHighlight().opacity(1, 0.5);

  yield* beginSlide("ROP: Highlight gadget");

  // Slide 4: Le altre istruzioni fade out, resta solo pop rbp + ret
  yield* all(
    mainBox().opacity(0, 0.5),
    mainBoxTitle().opacity(0, 0.5),
    // fade out righe 0-9 (non le ultime 2)
    ...asmLines.slice(0, 10).map((line) => line.opacity(0, 0.4)),
  );

  // Sposta le ultime due e il highlight al centro
  yield* all(
    asmLines[10].y(-20, 0.5),
    asmLines[10].x(-60, 0.5),
    asmLines[11].y(12, 0.5),
    asmLines[11].x(-60, 0.5),
    gadgetHighlight().y(-4, 0.5),
    gadgetHighlight().width(200, 0.5),
  );

  yield* beginSlide("ROP: Gadget isolated");

  // Fade out del gadget isolato
  yield* all(
    asmLines[10].opacity(0, 0.3),
    asmLines[11].opacity(0, 0.3),
    gadgetHighlight().opacity(0, 0.3),
  );

  // ==========================================
  // FASE 2: Gadget sparsi → ROP chain
  // ==========================================

  // Slide 5: Tutti gli 11 gadget appaiono sparsi
  yield* all(
    ...scatteredGadgets.map((g, i) => g.opacity(1, 0.3 + i * 0.05)),
  );

  yield* beginSlide("ROP: Scattered gadgets");

  // Slide 6: Fade out di tutti tranne i 4 della chain
  yield* all(
    ...scatteredGadgets.map((g, i) =>
      chainIndices.includes(i) ? g.opacity(1, 0.3) : g.opacity(0, 0.4),
    ),
  );

  yield* beginSlide("ROP: Select 4 gadgets");

  // Slide 7: I 4 gadget si allineano verticalmente
  // Ordine finale: pop rdi (i=8), pop rsi (i=7), pop rdx (i=9), syscall (i=10)
  const chainOrder = [0, 8, 7, 9, 10]; // indici in scatteredGadgets
  const chainYStart = -200;
  const chainYSpacing = 100;

  yield* all(
    ...chainOrder.map((idx, i) =>
      all(
        scatteredGadgets[idx].x(0, 0.6),
        scatteredGadgets[idx].y(chainYStart + i * chainYSpacing, 0.6),
        scatteredGadgets[idx].rotation(0, 0.6),
      ),
    ),
  );

  // Mostra le 3 frecce rosse
  yield* all(...chainArrows.map((a) => a.opacity(1, 0.4)));

  yield* beginSlide("ROP: Chain connected");

  // Fade out FASE 2
  yield* all(
    ...scatteredGadgets.map((g) => g.opacity(0, 0.4)),
    ...chainArrows.map((a) => a.opacity(0, 0.4)),
  );

  // ==========================================
  // FASE 3: Stack + ROP chain
  // ==========================================

  // Mostra stack + box asm
  yield* all(
    stackTitle().opacity(1, 0.5),
    asmBox().opacity(1, 0.5),
    asmBoxTitle().opacity(1, 0.5),
  );
  yield* all(
    ...stackAddresses.map((_, i) =>
      all(stackCells[i].opacity(1, 0.3), stackAddressLabels[i].opacity(1, 0.3)),
    ),
  );
  yield* all(...asmBoxLines.map((l, i) => l.opacity(1, 0.1 + i * 0.03)));
  yield* all(rspArrow().opacity(1, 0.4), rspLabel().opacity(1, 0.4));

  // RSP parte dal BOTTOM (cella 8 = func+37)
  yield* moveRSP(8);

  // Popola stack con ROP chain (top → bottom = index 0 → 8)
  yield* showStackCell(0, "baz+90", "");
  yield* showStackCell(1, "59", "");
  yield* showStackCell(2, "zub+91", "");
  yield* showStackCell(3, "0x00", "");
  yield* showStackCell(4, "bar+80", "");
  yield* showStackCell(5, "&\"/bin/sh\"", "");
  yield* showStackCell(6, "foo+65", "");
  yield* showStackCell(7, "0x00", "");
  yield* showStackCell(8, "func+37", "");

  yield* beginSlide("ROP: Stack filled");

  // main+50: ret (highlight su index 0)
  yield* highlightAsmLine(0);

  yield* beginSlide("ROP: main ret");

  // jump a func+37, RSP sale a 7
  yield* all(highlightAsmLine(2), moveRSP(7));

  yield* beginSlide("ROP: func+37 pop rsi");

  // pop rsi, RSP a 6, highlight a func+38: ret
  yield* all(highlightAsmLine(3), moveRSP(6));

  yield* beginSlide("ROP: func+38 ret");

  // ret → foo+65, RSP a 5
  yield* all(highlightAsmLine(5), moveRSP(5));

  yield* beginSlide("ROP: foo+65 pop rdi");

  // pop rdi, RSP a 4, highlight a foo+66: ret
  yield* all(highlightAsmLine(6), moveRSP(4));

  yield* beginSlide("ROP: foo+66 ret");

  // ret → bar+80, RSP a 3
  yield* all(highlightAsmLine(8), moveRSP(3));

  yield* beginSlide("ROP: bar+80 pop rdx");

  // pop rdx, RSP a 2, highlight a bar+81: ret
  yield* all(highlightAsmLine(9), moveRSP(2));

  yield* beginSlide("ROP: bar+81 ret");

  // ret → zub+91, RSP a 1
  yield* all(highlightAsmLine(11), moveRSP(1));

  yield* beginSlide("ROP: zub+91 pop rax");

  // pop rax, RSP a 0, highlight a zub+92: ret
  yield* all(highlightAsmLine(12), moveRSP(0));

  yield* beginSlide("ROP: zub+92 ret");

  // ret → baz+90 (RSP esce dallo stack)
  yield* highlightAsmLine(14);

  yield* beginSlide("ROP: baz+90 syscall");

  // syscall executes, highlight a baz+91 ret finale
  yield* highlightAsmLine(15);

  yield* beginSlide("ROP: baz+91 ret");

  // Fade out FASE 3
  yield* all(
    stackTitle().opacity(0, 0.3),
    asmBox().opacity(0, 0.3),
    asmBoxTitle().opacity(0, 0.3),
    asmHighlight().opacity(0, 0.3),
    rspArrow().opacity(0, 0.3),
    rspLabel().opacity(0, 0.3),
    ...stackAddresses.map((_, i) =>
      all(
        stackCells[i].opacity(0, 0.3),
        stackCellValues[i].opacity(0, 0.3),
        stackAddressLabels[i].opacity(0, 0.3),
        stackCellLabels[i].opacity(0, 0.3),
      ),
    ),
    ...asmBoxLines.map((l) => l.opacity(0, 0.3)),
  );
});
