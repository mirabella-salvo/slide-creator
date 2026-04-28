import { Rect, makeScene2D, Txt, Line } from "@motion-canvas/2d";
import {
  all,
  createRef,
  beginSlide,
  createRefArray,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  // ============ COLORI ============
  const TEAL = "#4ec9b0";
  const ORANGE = "#ce9178";
  const BLUE = "#569cd6";
  const YELLOW = "#dcdcaa";
  const CYAN = "#9cdcfe";
  const PURPLE = "#c586c0";
  const GRAY = "#d4d4d4";
  const DIM_GRAY = "#808080";
  const GREEN = "#6a9955";
  const NUM_GREEN = "#b5cea8";

  // ============ REFS ============
  // Memory layout (slides iniziali)
  const memSectionsL = createRefArray<Rect>();
  const memSectionsR = createRefArray<Rect>();
  const memGapL = createRef<Rect>();
  const memGapR = createRef<Rect>();
  const memLabelL = createRef<Txt>();
  const memLabelR = createRef<Txt>();
  const libcBlock = createRef<Rect>();
  const libcArrowL = createRef<Line>();
  const libcArrowR = createRef<Line>();
  const libcBlockColL = createRef<Rect>();
  const libcBlockColR = createRef<Rect>();

  const exeBox = createRef<Rect>();
  const exeTitle = createRef<Txt>();
  const exeLines = createRefArray<Txt>();
  const libcBox = createRef<Rect>();
  const libcTitle = createRef<Txt>();
  const libcLines = createRefArray<Txt>();
  const pltBox = createRef<Rect>();
  const pltTitle = createRef<Txt>();
  const pltLines = createRefArray<Txt>();
  const gotBox = createRef<Rect>();
  const gotTitle = createRef<Txt>();
  const gotLines = createRefArray<Txt>();
  const exeHighlight = createRef<Rect>();
  const pltHighlight = createRef<Rect>();
  const gotHighlight = createRef<Rect>();
  const libcHighlight = createRef<Rect>();
  const gotLineResolved = createRef<Txt>();

  // ============ CONFIGURAZIONE ============
  const pltBoxWidth = 440;
  const pltBoxHeight = 220;
  const pltLineSpacing = 24;
  const pltFontSize = 15;

  // ============ MEMORY LAYOUT (slides iniziali) ============

  const memWidth = 220;
  const memLeftX = -280;
  const memRightX = 280;

  const memSectionData = [
    { title: "Kernel", h: 45, fill: "#5D1A1A", stroke: "#8B0000", yOff: -200 },
    { title: "Stack", h: 50, fill: "#1B3A1B", stroke: "#4CAF50", yOff: -147 },
    { title: "Heap", h: 50, fill: "#3A2A00", stroke: "#FFB300", yOff: -40 },
    { title: "BSS", h: 40, fill: "#3A2200", stroke: "#FF9800", yOff: 22 },
    { title: "Data", h: 40, fill: "#2A1A3A", stroke: "#CE93D8", yOff: 70 },
    { title: "Text", h: 40, fill: "#1A1A3A", stroke: "#7E57C2", yOff: 118 },
  ];

  const gapYOff = -90;
  const gapH = 35;

  // Left memory layout
  memSectionData.forEach((sec) => {
    view.add(
      <Rect
        ref={memSectionsL}
        width={memWidth}
        height={sec.h}
        layout
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
        fill={sec.fill}
        stroke={sec.stroke}
        lineWidth={2}
        radius={4}
        x={memLeftX}
        y={sec.yOff}
        opacity={0}
      >
        <Txt text={sec.title} fontSize={14} fill={"#ffffff"} fontWeight={700} />
      </Rect>,
    );
  });

  view.add(
    <Rect
      ref={memGapL}
      width={memWidth}
      height={gapH}
      fill={"#00000000"}
      stroke={DIM_GRAY}
      lineWidth={1}
      lineDash={[6, 4]}
      radius={4}
      x={memLeftX}
      y={gapYOff}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={memLabelL}
      text="ls"
      fontSize={24}
      fill={YELLOW}
      fontWeight={700}
      x={memLeftX}
      y={-245}
      opacity={0}
    />,
  );

  // Right memory layout
  memSectionData.forEach((sec) => {
    view.add(
      <Rect
        ref={memSectionsR}
        width={memWidth}
        height={sec.h}
        layout
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
        fill={sec.fill}
        stroke={sec.stroke}
        lineWidth={2}
        radius={4}
        x={memRightX}
        y={sec.yOff}
        opacity={0}
      >
        <Txt text={sec.title} fontSize={14} fill={"#ffffff"} fontWeight={700} />
      </Rect>,
    );
  });

  view.add(
    <Rect
      ref={memGapR}
      width={memWidth}
      height={gapH}
      fill={"#00000000"}
      stroke={DIM_GRAY}
      lineWidth={1}
      lineDash={[6, 4]}
      radius={4}
      x={memRightX}
      y={gapYOff}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={memLabelR}
      text="curl"
      fontSize={24}
      fill={YELLOW}
      fontWeight={700}
      x={memRightX}
      y={-245}
      opacity={0}
    />,
  );

  // LIB C blocks per colonna (step 1)
  view.add(
    <Rect
      ref={libcBlockColL}
      width={memWidth}
      height={50}
      layout
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      fill={"#1A2A1A"}
      stroke={TEAL}
      lineWidth={3}
      radius={6}
      x={memLeftX}
      y={175}
      opacity={0}
    >
      <Txt text="LIB C" fontSize={20} fill={TEAL} fontWeight={900} />
    </Rect>,
  );

  view.add(
    <Rect
      ref={libcBlockColR}
      width={memWidth}
      height={50}
      layout
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      fill={"#1A2A1A"}
      stroke={TEAL}
      lineWidth={3}
      radius={6}
      x={memRightX}
      y={175}
      opacity={0}
    >
      <Txt text="LIB C" fontSize={20} fill={TEAL} fontWeight={900} />
    </Rect>,
  );

  // LIB C block condiviso (step 2)
  view.add(
    <Rect
      ref={libcBlock}
      width={300}
      height={60}
      layout
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      fill={"#1A2A1A"}
      stroke={TEAL}
      lineWidth={4}
      radius={8}
      x={0}
      y={235}
      opacity={0}
    >
      <Txt text="LIB C" fontSize={24} fill={TEAL} fontWeight={900} />
      <Txt
        text="Shared Library"
        fontSize={12}
        fill={"#cccccc"}
        fontFamily={"monospace"}
      />
    </Rect>,
  );

  // Arrows from LIB C to Text blocks
  const textYBottom = 118 + 20;
  view.add(
    <Line
      ref={libcArrowL}
      points={[
        [0 - 60, 235 - 30],
        [memLeftX, textYBottom + 10],
      ]}
      stroke={TEAL}
      lineWidth={2}
      endArrow
      arrowSize={10}
      opacity={0}
    />,
  );

  view.add(
    <Line
      ref={libcArrowR}
      points={[
        [0 + 60, 235 - 30],
        [memRightX, textYBottom + 10],
      ]}
      stroke={TEAL}
      lineWidth={2}
      endArrow
      arrowSize={10}
      opacity={0}
    />,
  );

  // ============ ELEMENTI ============

  // Executable box (alto sinistra)
  const exeX = -380;
  const exeY = -170;

  view.add(
    <Rect
      ref={exeBox}
      width={pltBoxWidth}
      height={pltBoxHeight}
      fill={"#1e1e1e"}
      stroke={BLUE}
      lineWidth={3}
      radius={10}
      x={exeX}
      y={exeY}
      opacity={0}
    />,
  );
  view.add(
    <Txt
      ref={exeTitle}
      text="executable"
      fontSize={20}
      fill={BLUE}
      fontWeight={700}
      x={exeX}
      y={exeY - pltBoxHeight / 2 - 20}
      opacity={0}
    />,
  );

  const exeStartX = exeX - pltBoxWidth / 2 + 20;
  const exeStartY = exeY - pltBoxHeight / 2 + 30;

  view.add(
    <Txt ref={exeLines} fontSize={pltFontSize} fontFamily={"monospace"} offset={[-1, 0]} x={exeStartX} y={exeStartY} opacity={0}>
      <Txt fill={BLUE}>{"int "}</Txt>
      <Txt fill={YELLOW}>{"main"}</Txt>
      <Txt fill={GRAY}>{"("}</Txt>
      <Txt fill={BLUE}>{"int "}</Txt>
      <Txt fill={CYAN}>{"argc"}</Txt>
      <Txt fill={GRAY}>{", "}</Txt>
      <Txt fill={BLUE}>{"char"}</Txt>
      <Txt fill={GRAY}>{"** "}</Txt>
      <Txt fill={CYAN}>{"argv"}</Txt>
      <Txt fill={GRAY}>{")"}</Txt>
    </Txt>,
  );
  view.add(
    <Txt ref={exeLines} text={"{"} fontSize={pltFontSize} fill={GRAY} fontFamily={"monospace"} offset={[-1, 0]} x={exeStartX} y={exeStartY + pltLineSpacing} opacity={0} />,
  );
  view.add(
    <Txt ref={exeLines} fontSize={pltFontSize} fontFamily={"monospace"} offset={[-1, 0]} x={exeStartX + 20} y={exeStartY + pltLineSpacing * 2} opacity={0}>
      <Txt fill={YELLOW}>{"printf"}</Txt>
      <Txt fill={GRAY}>{"("}</Txt>
      <Txt fill={ORANGE}>{'"Hello, 1"'}</Txt>
      <Txt fill={GRAY}>{");"}</Txt>
    </Txt>,
  );
  view.add(
    <Txt ref={exeLines} fontSize={pltFontSize} fontFamily={"monospace"} offset={[-1, 0]} x={exeStartX + 20} y={exeStartY + pltLineSpacing * 3} opacity={0}>
      <Txt fill={YELLOW}>{"printf"}</Txt>
      <Txt fill={GRAY}>{"("}</Txt>
      <Txt fill={ORANGE}>{'"Hello, 2"'}</Txt>
      <Txt fill={GRAY}>{");"}</Txt>
    </Txt>,
  );
  view.add(
    <Txt ref={exeLines} text={"}"} fontSize={pltFontSize} fill={GRAY} fontFamily={"monospace"} offset={[-1, 0]} x={exeStartX} y={exeStartY + pltLineSpacing * 4} opacity={0} />,
  );

  // libc box (alto destra)
  const libcX = 380;
  const libcY = -170;

  view.add(
    <Rect
      ref={libcBox}
      width={pltBoxWidth}
      height={pltBoxHeight}
      fill={"#1e1e1e"}
      stroke={TEAL}
      lineWidth={3}
      radius={10}
      x={libcX}
      y={libcY}
      opacity={0}
    />,
  );
  view.add(
    <Txt
      ref={libcTitle}
      text="libc"
      fontSize={20}
      fill={TEAL}
      fontWeight={700}
      x={libcX}
      y={libcY - pltBoxHeight / 2 - 20}
      opacity={0}
    />,
  );

  const libcStartX = libcX - pltBoxWidth / 2 + 20;
  const libcStartY = libcY - pltBoxHeight / 2 + 30;

  view.add(
    <Txt ref={libcLines} fontSize={pltFontSize} fontFamily={"monospace"} offset={[-1, 0]} x={libcStartX} y={libcStartY} opacity={0}>
      <Txt fill={BLUE}>{"int "}</Txt>
      <Txt fill={YELLOW}>{"printf"}</Txt>
      <Txt fill={GRAY}>{"("}</Txt>
      <Txt fill={BLUE}>{"const char"}</Txt>
      <Txt fill={GRAY}>{"* "}</Txt>
      <Txt fill={CYAN}>{"format"}</Txt>
      <Txt fill={GRAY}>{", ...)"}</Txt>
    </Txt>,
  );
  view.add(
    <Txt ref={libcLines} text={"{"} fontSize={pltFontSize} fill={GRAY} fontFamily={"monospace"} offset={[-1, 0]} x={libcStartX} y={libcStartY + pltLineSpacing} opacity={0} />,
  );
  view.add(
    <Txt ref={libcLines} text={"  // ..."} fontSize={pltFontSize} fill={GREEN} fontFamily={"monospace"} offset={[-1, 0]} x={libcStartX} y={libcStartY + pltLineSpacing * 2} opacity={0} />,
  );
  view.add(
    <Txt ref={libcLines} fontSize={pltFontSize} fontFamily={"monospace"} offset={[-1, 0]} x={libcStartX + 20} y={libcStartY + pltLineSpacing * 3} opacity={0}>
      <Txt fill={PURPLE}>{"return"}</Txt>
      <Txt fill={GRAY}>{";"}</Txt>
    </Txt>,
  );
  view.add(
    <Txt ref={libcLines} text={"}"} fontSize={pltFontSize} fill={GRAY} fontFamily={"monospace"} offset={[-1, 0]} x={libcStartX} y={libcStartY + pltLineSpacing * 4} opacity={0} />,
  );

  // plt box (basso sinistra)
  const pltX = -380;
  const pltY = 170;

  view.add(
    <Rect
      ref={pltBox}
      width={pltBoxWidth}
      height={pltBoxHeight}
      fill={"#1e1e1e"}
      stroke={YELLOW}
      lineWidth={3}
      radius={10}
      x={pltX}
      y={pltY}
      opacity={0}
    />,
  );
  view.add(
    <Txt
      ref={pltTitle}
      text="printf@plt"
      fontSize={20}
      fill={YELLOW}
      fontWeight={700}
      x={pltX}
      y={pltY - pltBoxHeight / 2 - 20}
      opacity={0}
    />,
  );

  const pltStartX = pltX - pltBoxWidth / 2 + 20;
  const pltStartY = pltY - pltBoxHeight / 2 + 30;

  view.add(
    <Txt ref={pltLines} fontSize={pltFontSize} fontFamily={"monospace"} offset={[-1, 0]} x={pltStartX} y={pltStartY} opacity={0}>
      <Txt fill={YELLOW}>{"printf@plt:"}</Txt>
    </Txt>,
  );
  view.add(
    <Txt ref={pltLines} fontSize={pltFontSize} fontFamily={"monospace"} offset={[-1, 0]} x={pltStartX + 20} y={pltStartY + pltLineSpacing} opacity={0}>
      <Txt fill={PURPLE}>{"jmp "}</Txt>
      <Txt fill={GRAY}>{"["}</Txt>
      <Txt fill={CYAN}>{"printf@got.plt"}</Txt>
      <Txt fill={GRAY}>{"]"}</Txt>
    </Txt>,
  );
  view.add(
    <Txt ref={pltLines} fontSize={pltFontSize} fontFamily={"monospace"} offset={[-1, 0]} x={pltStartX + 20} y={pltStartY + pltLineSpacing * 2} opacity={0}>
      <Txt fill={PURPLE}>{"push "}</Txt>
      <Txt fill={NUM_GREEN}>{"0"}</Txt>
    </Txt>,
  );
  view.add(
    <Txt ref={pltLines} fontSize={pltFontSize} fontFamily={"monospace"} offset={[-1, 0]} x={pltStartX + 20} y={pltStartY + pltLineSpacing * 3} opacity={0}>
      <Txt fill={PURPLE}>{"jmp "}</Txt>
      <Txt fill={CYAN}>{"loader"}</Txt>
    </Txt>,
  );

  // got box (basso destra)
  const gotX = 380;
  const gotY = 170;

  view.add(
    <Rect
      ref={gotBox}
      width={pltBoxWidth}
      height={pltBoxHeight}
      fill={"#1e1e1e"}
      stroke={ORANGE}
      lineWidth={3}
      radius={10}
      x={gotX}
      y={gotY}
      opacity={0}
    />,
  );
  view.add(
    <Txt
      ref={gotTitle}
      text="got"
      fontSize={20}
      fill={ORANGE}
      fontWeight={700}
      x={gotX}
      y={gotY - pltBoxHeight / 2 - 20}
      opacity={0}
    />,
  );

  const gotStartX = gotX - pltBoxWidth / 2 + 20;
  const gotStartY = gotY - pltBoxHeight / 2 + 30;

  view.add(
    <Txt ref={gotLines} fontSize={pltFontSize} fontFamily={"monospace"} offset={[-1, 0]} x={gotStartX} y={gotStartY} opacity={0}>
      <Txt fill={ORANGE}>{"got:"}</Txt>
    </Txt>,
  );
  view.add(
    <Txt ref={gotLines} fontSize={pltFontSize} fontFamily={"monospace"} offset={[-1, 0]} x={gotStartX + 20} y={gotStartY + pltLineSpacing} opacity={0}>
      <Txt fill={CYAN}>{"printf:"}</Txt>
      <Txt fill={GRAY}>{" "}</Txt>
      <Txt fill={YELLOW}>{"printf@plt"}</Txt>
      <Txt fill={GRAY}>{" + "}</Txt>
      <Txt fill={NUM_GREEN}>{"1"}</Txt>
    </Txt>,
  );

  // Versione "risolta" della riga printf (lazy binding completato)
  view.add(
    <Txt ref={gotLineResolved} fontSize={pltFontSize} fontFamily={"monospace"} offset={[-1, 0]} x={gotStartX + 20} y={gotStartY + pltLineSpacing} opacity={0}>
      <Txt fill={CYAN}>{"printf:"}</Txt>
      <Txt fill={GRAY}>{" "}</Txt>
      <Txt fill={TEAL}>{"libc"}</Txt>
      <Txt fill={GRAY}>{"+"}</Txt>
      <Txt fill={NUM_GREEN}>{"x"}</Txt>
    </Txt>,
  );

  // Highlight rectangles (uno per box)
  view.add(
    <Rect
      ref={exeHighlight}
      width={pltBoxWidth - 20}
      height={22}
      fill={"#264f7880"}
      radius={4}
      x={exeX}
      y={exeStartY}
      opacity={0}
    />,
  );
  view.add(
    <Rect
      ref={pltHighlight}
      width={pltBoxWidth - 20}
      height={22}
      fill={"#264f7880"}
      radius={4}
      x={pltX}
      y={pltStartY}
      opacity={0}
    />,
  );
  view.add(
    <Rect
      ref={gotHighlight}
      width={pltBoxWidth - 20}
      height={22}
      fill={"#264f7880"}
      radius={4}
      x={gotX}
      y={gotStartY}
      opacity={0}
    />,
  );
  view.add(
    <Rect
      ref={libcHighlight}
      width={pltBoxWidth - 20}
      height={22}
      fill={"#264f7880"}
      radius={4}
      x={libcX}
      y={libcStartY}
      opacity={0}
    />,
  );

  // ============ HELPERS ============

  const highlightPltLine = function* (i: number) {
    const y = pltStartY + i * pltLineSpacing;
    yield* all(pltHighlight().opacity(1, 0.2), pltHighlight().y(y, 0.3));
  };
  const highlightLibcLine = function* (i: number) {
    const y = libcStartY + i * pltLineSpacing;
    yield* all(libcHighlight().opacity(1, 0.2), libcHighlight().y(y, 0.3));
  };

  // ============ ANIMAZIONI ============

  // ==========================================
  // SLIDES INIZIALI: Memory Layout con LIB C condivisa
  // ==========================================

  // Fade in left layout + libc block per colonna
  yield* all(
    memLabelL().opacity(1, 0.4),
    ...memSectionData.map((_, i) => memSectionsL[i].opacity(1, 0.4)),
    memGapL().opacity(1, 0.4),
    libcBlockColL().opacity(1, 0.4),
  );

  // Fade in right layout + libc block per colonna
  yield* all(
    memLabelR().opacity(1, 0.4),
    ...memSectionData.map((_, i) => memSectionsR[i].opacity(1, 0.4)),
    memGapR().opacity(1, 0.4),
    libcBlockColR().opacity(1, 0.4),
  );

  yield* beginSlide("LIB: Memory Layout separate");

  // Trasformazione: nascondi i due libc per colonna, mostra libc condivisa con frecce
  yield* all(libcBlockColL().opacity(0, 0.3), libcBlockColR().opacity(0, 0.3));
  yield* libcBlock().opacity(1, 0.5);
  yield* all(libcArrowL().opacity(1, 0.4), libcArrowR().opacity(1, 0.4));

  yield* beginSlide("LIB: Memory Layout shared");

  // Fade out memory layout
  yield* all(
    memLabelL().opacity(0, 0.3),
    memLabelR().opacity(0, 0.3),
    ...memSectionData.map((_, i) =>
      all(memSectionsL[i].opacity(0, 0.3), memSectionsR[i].opacity(0, 0.3)),
    ),
    memGapL().opacity(0, 0.3),
    memGapR().opacity(0, 0.3),
    libcBlock().opacity(0, 0.3),
    libcArrowL().opacity(0, 0.3),
    libcArrowR().opacity(0, 0.3),
  );

  // Mostra tutti i 4 box
  yield* all(
    exeBox().opacity(1, 0.4),
    exeTitle().opacity(1, 0.4),
    ...exeLines.map((l) => l.opacity(1, 0.4)),
    libcBox().opacity(1, 0.4),
    libcTitle().opacity(1, 0.4),
    ...libcLines.map((l) => l.opacity(1, 0.4)),
    pltBox().opacity(1, 0.4),
    pltTitle().opacity(1, 0.4),
    ...pltLines.map((l) => l.opacity(1, 0.4)),
    gotBox().opacity(1, 0.4),
    gotTitle().opacity(1, 0.4),
    ...gotLines.map((l) => l.opacity(1, 0.4)),
  );

  // exe highlight appare DIRETTAMENTE sul primo printf (no smooth slide)
  exeHighlight().y(exeStartY + 2 * pltLineSpacing);
  yield* exeHighlight().opacity(1, 0.3);

  yield* beginSlide("PLT: Call printf");

  // Salta direttamente a plt[1] (jmp [printf@got.plt])
  yield* exeHighlight().opacity(0, 0.2);
  pltHighlight().y(pltStartY + pltLineSpacing);
  yield* pltHighlight().opacity(1, 0.3);

  yield* beginSlide("PLT: jmp got.plt");

  // Flash got[1] (mantenendo plt[1] selezionato)
  gotHighlight().y(gotStartY + pltLineSpacing);
  yield* gotHighlight().opacity(1, 0.15);
  yield* gotHighlight().opacity(0, 0.15);
  yield* gotHighlight().opacity(1, 0.15);
  yield* gotHighlight().opacity(0, 0.15);
  yield* gotHighlight().opacity(1, 0.2);

  yield* beginSlide("PLT: got flash");

  // Nascondi got, plt va a riga 2 (push 0)
  yield* gotHighlight().opacity(0, 0.2);
  yield* highlightPltLine(2);

  yield* beginSlide("PLT: push 0");

  // plt va a riga 3 (jmp loader)
  yield* highlightPltLine(3);

  yield* beginSlide("PLT: jmp loader");

  // Nascondi plt, libc[0] + got viene risolto: printf@plt+1 → libc+x
  yield* all(
    pltHighlight().opacity(0, 0.2),
    highlightLibcLine(0),
    gotLines[1].opacity(0, 0.3),
    gotLineResolved().opacity(1, 0.3),
  );

  yield* beginSlide("PLT: enter libc");

  // libc[1]
  yield* highlightLibcLine(1);

  yield* beginSlide("PLT: libc {");

  // libc[2]
  yield* highlightLibcLine(2);

  yield* beginSlide("PLT: libc body");

  // libc[3] (return)
  yield* highlightLibcLine(3);

  yield* beginSlide("PLT: libc return");

  // Nascondi libc, exe[3] appare DIRETTAMENTE (no smooth slide)
  yield* libcHighlight().opacity(0, 0.2);
  exeHighlight().y(exeStartY + 3 * pltLineSpacing);
  yield* exeHighlight().opacity(1, 0.3);

  yield* beginSlide("PLT: second printf");

  // Seconda chiamata: salta direttamente a plt[1] (jmp [printf@got.plt])
  yield* exeHighlight().opacity(0, 0.2);
  pltHighlight().y(pltStartY + pltLineSpacing);
  yield* pltHighlight().opacity(1, 0.3);

  yield* beginSlide("PLT2: jmp got.plt");

  // Flash got[1] (mantenendo plt[1] selezionato)
  gotHighlight().y(gotStartY + pltLineSpacing);
  yield* gotHighlight().opacity(1, 0.15);
  yield* gotHighlight().opacity(0, 0.15);
  yield* gotHighlight().opacity(1, 0.15);
  yield* gotHighlight().opacity(0, 0.15);
  yield* gotHighlight().opacity(1, 0.2);

  yield* beginSlide("PLT2: got flash");

  // Salta direttamente a libc[0] - posizione istantanea, no smooth slide
  libcHighlight().y(libcStartY);
  yield* all(
    pltHighlight().opacity(0, 0.2),
    gotHighlight().opacity(0, 0.2),
    libcHighlight().opacity(1, 0.3),
  );

  yield* beginSlide("PLT2: enter libc");

  // libc[1]
  yield* highlightLibcLine(1);

  yield* beginSlide("PLT2: libc {");

  // libc[2]
  yield* highlightLibcLine(2);

  yield* beginSlide("PLT2: libc body");

  // libc[3] (return)
  yield* highlightLibcLine(3);

  yield* beginSlide("PLT2: libc return");
});
