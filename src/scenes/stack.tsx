import { Rect, makeScene2D, Txt, Line, Layout } from "@motion-canvas/2d";
import {
  all,
  createRef,
  beginSlide,
  createRefArray,
  Reference,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  // Configurazione stack
  const cellHeight = 40;
  const cellWidth = 180;
  const startY = -280; // Y iniziale per 0xFFF2
  const startX = 100; // X per i rettangoli
  const addressX = -50; // X per gli indirizzi

  // Array di indirizzi di memoria (dal più basso al più alto)
  const addresses = [
    "0xFFF2",
    "0xFFF3",
    "0xFFF4",
    "0xFFF5",
    "0xFFF6",
    "0xFFF7",
    "0xFFF8",
    "0xFFF9",
    "0xFFFA",
    "0xFFFB",
    "0xFFFC",
    "0xFFFD",
    "0xFFFE",
    "0xFFFF",
  ];

  // Refs
  const stackPointerLabel = createRef<Txt>();
  const basePointerLabel = createRef<Txt>();
  const addressLabels = createRefArray<Txt>();
  const stackCells = createRefArray<Rect>();
  const newStackCells = createRefArray<Rect>();
  const frameIndicator = createRef<Layout>();
  const frameTop = createRef<Line>();
  const frameSide = createRef<Line>();
  const frameBottom = createRef<Line>();
  const previewLabel = createRef<Txt>();

  // Nuovo frame rosso per le celle aggiunte
  const newFrameTop = createRef<Line>();
  const newFrameSide = createRef<Line>();
  const newFrameBottom = createRef<Line>();

  // Assembly call box
  const asmBox = createRef<Rect>();
  const asmTitle = createRef<Txt>();
  const asmLine1 = createRef<Txt>();
  const asmLine2 = createRef<Txt>();
  const asmLine3 = createRef<Txt>();
  const asmLine3Highlight = createRef<Rect>();
  const asmLine4 = createRef<Txt>();
  const callArrow = createRef<Line>();

  // Label per contenuto celle stack
  const cellLabelMainBase = createRef<Txt>();
  const cellLabelRetAddr = createRef<Txt>();
  const mainBaseArrow = createRef<Line>();
  const mainBaseLabel = createRef<Txt>();

  // Titoli Stack Pointer e Base Pointer
  view.add(
    <Txt
      ref={stackPointerLabel}
      text="Stack Pointer: 0xFFF8"
      fontSize={36}
      fill={"#ffffff"}
      fontFamily={"monospace"}
      fontWeight={700}
      x={-200}
      y={-380}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={basePointerLabel}
      text="Base Pointer: 0xFFFF"
      fontSize={36}
      fill={"#ffffff"}
      fontFamily={"monospace"}
      fontWeight={700}
      x={-200}
      y={-340}
      opacity={0}
    />,
  );

  // Crea gli indirizzi di memoria
  addresses.forEach((addr, index) => {
    const y = startY + index * (cellHeight + 5);
    view.add(
      <Txt
        ref={addressLabels}
        text={addr}
        fontSize={28}
        fill={"#808080"}
        fontFamily={"monospace"}
        x={addressX}
        y={y}
        opacity={0}
      />,
    );
  });

  // Celle stack iniziali (0xFFF8 a 0xFFFF - indici 6-13)
  for (let i = 6; i < 14; i++) {
    const y = startY + i * (cellHeight + 5);
    view.add(
      <Rect
        ref={stackCells}
        width={cellWidth}
        height={cellHeight}
        fill={"#00bfff"}
        stroke={"#000000"}
        lineWidth={2}
        x={startX}
        y={y}
        opacity={0}
      />,
    );
  }

  // Nuove celle stack (0xFFF4 a 0xFFF7 - indici 2-5)
  for (let i = 2; i < 6; i++) {
    const y = startY + i * (cellHeight + 5);
    view.add(
      <Rect
        ref={newStackCells}
        width={cellWidth}
        height={cellHeight}
        fill={"#00bfff"}
        stroke={"#000000"}
        lineWidth={2}
        x={startX + 400} // Inizia fuori schermo a destra
        y={y}
        opacity={0}
      />,
    );
  }

  // Label contenuto celle - posizioni
  const cellYMainBase = startY + 13 * (cellHeight + -32.5); // 0xFFFF - main's base
  const cellYRetAddr = startY + 12 * (cellHeight + -28); // 0xFFFE - return address

  // Label "0xFFFF" dentro la cella 0xFFFF (main's base pointer value)
  view.add(
    <Txt
      ref={cellLabelMainBase}
      text="0xFFFF"
      fontSize={16}
      fill={"#000000"}
      fontFamily={"monospace"}
      fontWeight={700}
      x={startX - cellWidth / 2 + 40}
      y={cellYMainBase - cellHeight / 2 + 12}
      opacity={0}
    />,
  );

  // Label "0x0013" dentro la cella 0xFFFE (return address)
  view.add(
    <Txt
      ref={cellLabelRetAddr}
      text="0x0013"
      fontSize={16}
      fill={"#000000"}
      fontFamily={"monospace"}
      fontWeight={700}
      x={startX - cellWidth / 2 + 40}
      y={cellYRetAddr - cellHeight / 2 + 12}
      opacity={0}
    />,
  );

  // Freccia e label "main's base" che punta alla cella 0xFFFF
  view.add(
    <Line
      ref={mainBaseArrow}
      points={[
        [startX + cellWidth / 2 + 120, cellYMainBase],
        [startX + cellWidth / 2 + 10, cellYMainBase],
      ]}
      stroke={"#ffd700"}
      lineWidth={3}
      endArrow
      arrowSize={12}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={mainBaseLabel}
      text="main's base"
      fontSize={22}
      fill={"#ffd700"}
      fontFamily={"monospace"}
      fontWeight={700}
      x={startX + cellWidth / 2 + 200}
      y={cellYMainBase}
      opacity={0}
    />,
  );

  // Frame indicator (bracket giallo) - posizionato a destra delle celle iniziali
  const frameStartY = startY + 6 * (cellHeight + 5) - cellHeight / 2;
  const frameEndY = startY + 13 * (cellHeight + 5) + cellHeight / 2;
  const frameX = startX + cellWidth / 2 + 30;

  // Linea superiore del bracket
  view.add(
    <Line
      ref={frameTop}
      points={[
        [frameX, frameStartY],
        [frameX + 30, frameStartY],
      ]}
      stroke={"#ffd700"}
      lineWidth={6}
      opacity={0}
    />,
  );

  // Linea verticale del bracket
  view.add(
    <Line
      ref={frameSide}
      points={[
        [frameX + 30, frameStartY],
        [frameX + 30, frameEndY],
      ]}
      stroke={"#ffd700"}
      lineWidth={6}
      opacity={0}
    />,
  );

  // Linea inferiore del bracket
  view.add(
    <Line
      ref={frameBottom}
      points={[
        [frameX + 30, frameEndY],
        [frameX, frameEndY],
      ]}
      stroke={"#ffd700"}
      lineWidth={6}
      opacity={0}
    />,
  );

  // Label preview per il nuovo frame
  view.add(
    <Txt
      ref={previewLabel}
      text="(Preview of ADD's frame)"
      fontSize={20}
      fill={"#808080"}
      fontFamily={"monospace"}
      x={startX + 280}
      y={frameEndY + 50}
      opacity={0}
    />,
  );

  // Nuovo frame rosso (bracket) per le celle 0xFFF4-0xFFF7
  const newFrameStartYPos = startY + 2 * (cellHeight + 5) - cellHeight / 2;
  const newFrameEndYPos = startY + 5 * (cellHeight + 5) + cellHeight / 2;

  // Linea superiore del bracket rosso
  view.add(
    <Line
      ref={newFrameTop}
      points={[
        [frameX + 400, newFrameStartYPos],
        [frameX + 30 + 400, newFrameStartYPos],
      ]}
      stroke={"#ff4444"}
      lineWidth={6}
      opacity={0}
    />,
  );

  // Linea verticale del bracket rosso
  view.add(
    <Line
      ref={newFrameSide}
      points={[
        [frameX + 30 + 400, newFrameStartYPos],
        [frameX + 30 + 400, newFrameEndYPos],
      ]}
      stroke={"#ff4444"}
      lineWidth={6}
      opacity={0}
    />,
  );

  // Linea inferiore del bracket rosso
  view.add(
    <Line
      ref={newFrameBottom}
      points={[
        [frameX + 30 + 400, newFrameEndYPos],
        [frameX + 400, newFrameEndYPos],
      ]}
      stroke={"#ff4444"}
      lineWidth={6}
      opacity={0}
    />,
  );

  // Assembly code box (a sinistra)
  const asmBoxX = -450;
  const asmBoxY = -50;
  const lineSpacing = 32;

  view.add(
    <Rect
      ref={asmBox}
      width={340}
      height={200}
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
      ref={asmTitle}
      text="Assembly"
      fontSize={22}
      fill={"#808080"}
      fontFamily={"monospace"}
      x={asmBoxX}
      y={asmBoxY - 75}
      opacity={0}
    />,
  );

  // Linea 1: mov edi, 3
  view.add(
    <Txt
      ref={asmLine1}
      text="0x0004  mov edi, 3"
      fontSize={22}
      fill={"#9cdcfe"}
      fontFamily={"monospace"}
      x={asmBoxX}
      y={asmBoxY - 45}
      opacity={0}
    />,
  );

  // Linea 2: mov esi, 4
  view.add(
    <Txt
      ref={asmLine2}
      text="0x0009  mov esi, 4"
      fontSize={22}
      fill={"#9cdcfe"}
      fontFamily={"monospace"}
      x={asmBoxX}
      y={asmBoxY - 45 + lineSpacing}
      opacity={0}
    />,
  );

  // Highlight per call add
  view.add(
    <Rect
      ref={asmLine3Highlight}
      width={320}
      height={30}
      fill={"#264f78"}
      radius={5}
      x={asmBoxX}
      y={asmBoxY - 45 + lineSpacing * 2}
      opacity={0}
    />,
  );

  // Linea 3: call add (evidenziata)
  view.add(
    <Txt
      ref={asmLine3}
      text="0x000E  call add"
      fontSize={22}
      fill={"#4ec9b0"}
      fontFamily={"monospace"}
      fontWeight={700}
      x={asmBoxX}
      y={asmBoxY - 45 + lineSpacing * 2}
      opacity={0}
    />,
  );

  // Linea 4: mov [0x1234], eax
  view.add(
    <Txt
      ref={asmLine4}
      text="0x0013  mov [0x1234], eax"
      fontSize={22}
      fill={"#9cdcfe"}
      fontFamily={"monospace"}
      x={asmBoxX}
      y={asmBoxY - 45 + lineSpacing * 3}
      opacity={0}
    />,
  );

  // Freccia dal box assembly verso lo stack
  view.add(
    <Line
      ref={callArrow}
      points={[
        [asmBoxX + 180, asmBoxY - 45 + lineSpacing * 2],
        [
          startX - cellWidth / 2 - 20,
          (newFrameStartYPos + newFrameEndYPos) / 2,
        ],
      ]}
      stroke={"#4ec9b0"}
      lineWidth={4}
      endArrow
      arrowSize={16}
      opacity={0}
      lineDash={[10, 5]}
    />,
  );

  // === SLIDE 1: Stack iniziale ===

  // Mostra i titoli
  yield* all(
    stackPointerLabel().opacity(1, 0.8),
    basePointerLabel().opacity(1, 0.8),
  );

  // Mostra tutti gli indirizzi di memoria
  yield* all(
    ...addressLabels.map((label, i) => label.opacity(1, 0.3 + i * 0.05)),
  );

  // Mostra le celle dello stack iniziale una alla volta (dall'alto verso il basso)
  for (let i = 0; i < stackCells.length; i++) {
    yield* stackCells[i].opacity(1, 0.15);
  }

  // Mostra il frame indicator
  yield* all(
    frameTop().opacity(1, 0.5),
    frameSide().opacity(1, 0.5),
    frameBottom().opacity(1, 0.5),
  );

  yield* beginSlide("Stack Iniziale");

  // === SLIDE 2: Aggiunta nuove celle con animazione ===

  // Mostra il box assembly e titolo
  yield* all(asmBox().opacity(1, 0.5), asmTitle().opacity(1, 0.5));

  // Mostra le linee di codice assembly una alla volta
  yield* asmLine1().opacity(1, 0.3);
  yield* asmLine2().opacity(1, 0.3);

  // Mostra highlight e linea call add
  yield* all(asmLine3Highlight().opacity(1, 0.3), asmLine3().opacity(1, 0.3));

  yield* asmLine4().opacity(1, 0.3);

  // Mostra la freccia che punta verso lo stack
  yield* callArrow().opacity(1, 0.5);

  // Aggiorna Stack Pointer
  yield* stackPointerLabel().text("Stack Pointer: 0xFFF4", 0.5);

  // Mostra le nuove celle e il bracket rosso
  yield* all(
    ...newStackCells.map((cell) => cell.opacity(1, 0.3)),
    newFrameTop().opacity(1, 0.3),
    newFrameSide().opacity(1, 0.3),
    newFrameBottom().opacity(1, 0.3),
  );

  // Animazione slide laterale - celle e bracket rosso insieme
  yield* all(
    ...newStackCells.map((cell) => cell.x(startX, 0.8)),
    newFrameTop().points(
      [
        [frameX, newFrameStartYPos],
        [frameX + 30, newFrameStartYPos],
      ],
      0.8,
    ),
    newFrameSide().points(
      [
        [frameX + 30, newFrameStartYPos],
        [frameX + 30, newFrameEndYPos],
      ],
      0.8,
    ),
    newFrameBottom().points(
      [
        [frameX + 30, newFrameEndYPos],
        [frameX, newFrameEndYPos],
      ],
      0.8,
    ),
  );

  yield* beginSlide("Stack Espanso");

  // === SLIDE 3: Mostra contenuto celle - main's base pointer ===

  // Mostra il valore dentro la cella 0xFFFF (main's base)
  yield* cellLabelMainBase().opacity(1, 0.5);

  // Mostra il return address nella cella 0xFFFE
  yield* cellLabelRetAddr().opacity(1, 0.5);

  // Mostra la freccia e label "main's base"
  yield* all(mainBaseLabel().opacity(1, 0.5), mainBaseArrow().opacity(1, 0.5));

  yield* beginSlide("Main Base Pointer");
});
