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
  const DIM_GRAY = "#808080";
  const BG_DARK = "#1a1a1a";
  const BG_MID = "#2d2d30";

  // ============ CONFIGURAZIONE ============
  const BOX_W = 900;
  const BOX_H = 550;
  const SECTION_W = 120;
  const SECTION_H = 36;
  const MAIN_BOX_W = 400;
  const MAIN_BOX_H = 230;
  const MAIN_GAP = 20;

  // ============ DATI SEZIONI ELF ============
  const elfSections = [
    { name: ".text", color: TEAL },
    { name: ".data", color: YELLOW },
    { name: ".bss", color: YELLOW },
    { name: ".rodata", color: BLUE },
    { name: ".symtab", color: BLUE },
    { name: ".strtab", color: BLUE },
    { name: ".shstrtab", color: BLUE },
    { name: ".rel.text", color: PURPLE },
    { name: ".rela.text", color: PURPLE },
    { name: ".rel.data", color: PURPLE },
    { name: ".rela.data", color: PURPLE },
    { name: ".plt", color: TEAL },
    { name: ".got", color: CYAN },
    { name: ".got.plt", color: CYAN },
    { name: ".init", color: TEAL },
    { name: ".fini", color: TEAL },
    { name: ".init_array", color: DIM_GRAY },
    { name: ".fini_array", color: DIM_GRAY },
    { name: ".dynamic", color: CYAN },
    { name: ".dynsym", color: BLUE },
    { name: ".dynstr", color: BLUE },
    { name: ".hash", color: DIM_GRAY },
    { name: ".interp", color: CYAN },
    { name: ".note", color: DIM_GRAY },
    { name: ".comment", color: DIM_GRAY },
    { name: ".ctors", color: DIM_GRAY },
    { name: ".dtors", color: DIM_GRAY },
    { name: ".eh_frame", color: DIM_GRAY },
    { name: ".eh_frame_hdr", color: DIM_GRAY },
    { name: ".debug_info", color: DIM_GRAY },
  ];

  // Posizioni pre-calcolate in griglia 6x5 con padding che tiene conto delle dimensioni sezione
  const GRID_COLS = 6;
  const GRID_ROWS = 5;
  const PADDING_X = SECTION_W / 2 + 20;
  const PADDING_Y = SECTION_H / 2 + 20;
  const cellW = (BOX_W - PADDING_X * 2) / GRID_COLS;
  const cellH = (BOX_H - PADDING_Y * 2) / GRID_ROWS;

  const sectionPositions: { x: number; y: number }[] = [];
  const offsets = [
    [8, 5],
    [-5, 8],
    [10, -3],
    [-8, 6],
    [3, -7],
    [7, 4],
    [-6, -5],
    [4, 8],
    [-3, -8],
    [9, 2],
    [-7, 7],
    [5, -4],
    [-4, 3],
    [6, -6],
    [-9, 5],
    [2, -2],
    [8, -7],
    [-5, 4],
    [3, 6],
    [-8, -3],
    [7, -5],
    [-2, 8],
    [6, 3],
    [-6, -7],
    [4, 5],
    [-3, -4],
    [9, -2],
    [-7, 6],
    [5, -8],
    [2, 7],
  ];

  for (let i = 0; i < elfSections.length; i++) {
    const row = Math.floor(i / GRID_COLS);
    const col = i % GRID_COLS;
    const baseX = -BOX_W / 2 + PADDING_X + cellW / 2 + col * cellW;
    const baseY = -BOX_H / 2 + PADDING_Y + cellH / 2 + row * cellH;
    const [ox, oy] = offsets[i % offsets.length];
    sectionPositions.push({ x: baseX + ox, y: baseY + oy });
  }

  // 4 box principali finali
  const mainSections = [
    {
      name: ".text",
      desc: "Code (executable instructions)",
      color: TEAL,
      x: -(MAIN_BOX_W + MAIN_GAP) / 2,
      y: -(MAIN_BOX_H + MAIN_GAP) / 2,
    },
    {
      name: ".data",
      desc: "Initialized global variables",
      color: YELLOW,
      x: (MAIN_BOX_W + MAIN_GAP) / 2,
      y: -(MAIN_BOX_H + MAIN_GAP) / 2,
    },
    {
      name: ".rodata",
      desc: "Read-only data (constants)",
      color: BLUE,
      x: -(MAIN_BOX_W + MAIN_GAP) / 2,
      y: (MAIN_BOX_H + MAIN_GAP) / 2,
    },
    {
      name: ".bss",
      desc: "Uninitialized global variables",
      color: PURPLE,
      x: (MAIN_BOX_W + MAIN_GAP) / 2,
      y: (MAIN_BOX_H + MAIN_GAP) / 2,
    },
  ];

  // Testo binario di sfondo
  const binaryLines: string[] = [];
  const seed = 42;
  let rng = seed;
  const nextRng = () => {
    rng = (rng * 1103515245 + 12345) & 0x7fffffff;
    return rng / 0x7fffffff;
  };
  for (let r = 0; r < 20; r++) {
    let line = "";
    for (let c = 0; c < 120; c++) {
      line += nextRng() > 0.5 ? "1" : "0";
    }
    binaryLines.push(line);
  }

  // Ordine di apparizione randomizzato (Fisher-Yates shuffle con seed fisso)
  const shuffledOrder = Array.from(
    { length: elfSections.length },
    (_, i) => i,
  );
  for (let i = shuffledOrder.length - 1; i > 0; i--) {
    const j = Math.floor(nextRng() * (i + 1));
    [shuffledOrder[i], shuffledOrder[j]] = [shuffledOrder[j], shuffledOrder[i]];
  }
  // delayOf[sectionIndex] = ordine di apparizione (0 = primo, 1 = secondo, ...)
  const delayOf: number[] = new Array(elfSections.length);
  shuffledOrder.forEach((sectionIdx, order) => {
    delayOf[sectionIdx] = order;
  });

  // ============ REFS ============

  const elfContainer = createRef<Rect>();
  const elfBox = createRef<Rect>();
  const elfBoxTitle = createRef<Txt>();
  const binaryTexts = createRefArray<Txt>();
  const sectionBoxes = createRefArray<Rect>();
  const sectionLabels = createRefArray<Txt>();
  const mainBoxes = createRefArray<Rect>();
  const mainNames = createRefArray<Txt>();
  const mainDescs = createRefArray<Txt>();

  // ============ JSX ============

  view.add(
    <Rect ref={elfContainer} x={0} y={0} layout={false} opacity={0}>
      {/* Titolo sopra il box */}
      <Txt
        ref={elfBoxTitle}
        x={0}
        y={-BOX_H / 2 - 40}
        text="ELF Binary"
        fontSize={32}
        fill={GRAY}
        fontWeight={600}
        fontFamily={"monospace"}
        opacity={0}
      />

      {/* Box grande con sfondo scuro + clip per contenere il testo */}
      <Rect
        ref={elfBox}
        width={BOX_W}
        height={BOX_H}
        fill={BG_DARK}
        stroke={"#444444"}
        lineWidth={2}
        radius={12}
        clip
        layout={false}
        opacity={0}
      >
        {/* Testo binario di sfondo (figli di elfBox per clipping) */}
        {binaryLines.map((line, i) => (
          <Txt
            ref={binaryTexts}
            x={0}
            y={-BOX_H / 2 + 25 + i * 26}
            text={line}
            fontSize={11}
            fill={"#555555"}
            fontFamily={"monospace"}
            opacity={0}
          />
        ))}
      </Rect>
    </Rect>,
  );

  // Aggiungi sezioni ELF al container
  elfSections.forEach((sec, i) => {
    const pos = sectionPositions[i];
    elfContainer().add(
      <Rect
        ref={sectionBoxes}
        x={pos.x}
        y={pos.y}
        width={SECTION_W}
        height={SECTION_H}
        fill={BG_MID}
        stroke={sec.color}
        lineWidth={2}
        radius={6}
        opacity={0}
      />,
    );
    elfContainer().add(
      <Txt
        ref={sectionLabels}
        x={pos.x}
        y={pos.y}
        text={sec.name}
        fontSize={13}
        fill={sec.color}
        fontWeight={600}
        fontFamily={"monospace"}
        opacity={0}
      />,
    );
  });

  // Aggiungi 4 box principali
  mainSections.forEach((ms) => {
    elfContainer().add(
      <Rect
        ref={mainBoxes}
        x={ms.x}
        y={ms.y}
        width={MAIN_BOX_W}
        height={MAIN_BOX_H}
        fill={BG_MID}
        stroke={ms.color}
        lineWidth={3}
        radius={10}
        opacity={0}
      />,
    );
    elfContainer().add(
      <Txt
        ref={mainNames}
        x={ms.x}
        y={ms.y - 25}
        text={ms.name}
        fontSize={36}
        fill={ms.color}
        fontWeight={700}
        fontFamily={"monospace"}
        opacity={0}
      />,
    );
    elfContainer().add(
      <Txt
        ref={mainDescs}
        x={ms.x}
        y={ms.y + 25}
        text={ms.desc}
        fontSize={16}
        fill={GRAY}
        fontFamily={"monospace"}
        opacity={0}
      />,
    );
  });

  // ============ ANIMAZIONI ============

  // === SLIDE 1: Title ===

  const titleSlide = SlideTitle({
    title: "ELF File Format",
    subtitle: "Executable and Linkable Format",
    titleColor: TEAL,
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

  yield* beginSlide("ELF: Title");

  // === SLIDE 2: Binary Background Box ===

  yield* all(
    titleSlide.titleRef().opacity(0, 0.5),
    titleSlide.subtitleRef().opacity(0, 0.5),
  );

  yield* elfContainer().opacity(1, 0.3);
  yield* elfBox().opacity(1, 0.5);
  yield* elfBoxTitle().opacity(1, 0.4);

  // Fade in testo binario
  yield* all(...binaryTexts.map((txt, i) => txt.opacity(1, 0.3 + i * 0.02)));

  yield* beginSlide("ELF: Binary Box");

  // === SLIDE 3: Sezioni ELF appaiono ===

  // Imposta scale iniziale a 0
  elfSections.forEach((_, i) => {
    sectionBoxes[i].scale(0);
    sectionLabels[i].scale(0);
  });

  yield* all(
    ...elfSections.map((_, i) => {
      const d = delayOf[i];
      return all(
        sectionBoxes[i].opacity(1, 0.2 + d * 0.04),
        sectionBoxes[i].scale(1, 0.2 + d * 0.04),
        sectionLabels[i].opacity(1, 0.2 + d * 0.04),
        sectionLabels[i].scale(1, 0.2 + d * 0.04),
      );
    }),
  );

  yield* beginSlide("ELF: All Sections");

  // === SLIDE 4: 4 Box principali ===

  // Fade out sezioni piccole e testo binario
  yield* all(
    ...elfSections.map((_, i) =>
      all(sectionBoxes[i].opacity(0, 0.4), sectionLabels[i].opacity(0, 0.4)),
    ),
    ...binaryTexts.map((txt) => txt.opacity(0, 0.4)),
  );

  // Mostra i 4 box principali (imposta scale iniziale)
  mainSections.forEach((_, i) => {
    mainBoxes[i].scale(0.8);
  });

  yield* all(
    ...mainSections.map((_, i) =>
      all(
        mainBoxes[i].opacity(1, 0.4 + i * 0.15),
        mainBoxes[i].scale(1, 0.4 + i * 0.15),
        mainNames[i].opacity(1, 0.4 + i * 0.15),
        mainDescs[i].opacity(1, 0.5 + i * 0.15),
      ),
    ),
  );

  yield* beginSlide("ELF: Main Sections");

  yield* all(elfContainer().opacity(0, 0.6));
});
