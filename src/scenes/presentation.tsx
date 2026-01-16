import { Circle, Rect, makeScene2D, Txt, Line } from "@motion-canvas/2d";
import { all, createRef, waitFor, beginSlide } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  // Slide 1: Titolo principale
  const title = createRef<Txt>();
  const subtitle = createRef<Txt>();

  view.add(
    <Txt
      ref={title}
      text="Presentazione Motion Canvas"
      fontSize={80}
      fill={"#4a90e2"}
      fontWeight={700}
      opacity={0}
    />
  );

  view.add(
    <Txt
      ref={subtitle}
      text="Creato con animazioni programmatiche"
      fontSize={40}
      fill={"#cccccc"}
      y={100}
      opacity={0}
    />
  );

  yield* all(
    title().opacity(1, 1),
    title().scale(1.1, 0.5).to(1, 0.5)
  );

  yield* subtitle().opacity(1, 0.8);

  yield* beginSlide("Slide 1 - Titolo");

  // Slide 2: Punti chiave
  const point1 = createRef<Txt>();
  const point2 = createRef<Txt>();
  const point3 = createRef<Txt>();
  const pointsTitle = createRef<Txt>();

  view.add(
    <Txt
      ref={pointsTitle}
      text="Caratteristiche Principali"
      fontSize={60}
      fill={"#50c878"}
      y={-300}
      opacity={0}
    />
  );

  view.add(
    <Txt
      ref={point1}
      text="✓ Animazioni fluide e performanti"
      fontSize={36}
      fill={"#ffffff"}
      x={-400}
      y={-100}
      opacity={0}
    />
  );

  view.add(
    <Txt
      ref={point2}
      text="✓ Controllo frame-by-frame"
      fontSize={36}
      fill={"#ffffff"}
      x={-400}
      y={0}
      opacity={0}
    />
  );

  view.add(
    <Txt
      ref={point3}
      text="✓ Codice riutilizzabile"
      fontSize={36}
      fill={"#ffffff"}
      x={-400}
      y={100}
      opacity={0}
    />
  );

  yield* all(
    title().opacity(0, 0.5),
    subtitle().opacity(0, 0.5)
  );

  yield* pointsTitle().opacity(1, 0.8);
  yield* point1().opacity(1, 0.5);
  yield* point2().opacity(1, 0.5);
  yield* point3().opacity(1, 0.5);

  yield* beginSlide("Slide 2 - Caratteristiche");

  // Slide 3: Grafico circolare
  const circle1 = createRef<Circle>();
  const circle2 = createRef<Circle>();
  const circle3 = createRef<Circle>();
  const graphTitle = createRef<Txt>();

  view.add(
    <Txt
      ref={graphTitle}
      text="Visualizzazione Dati"
      fontSize={60}
      fill={"#ff6b6b"}
      y={-300}
      opacity={0}
    />
  );

  view.add(
    <Circle
      ref={circle1}
      size={150}
      fill={"#4a90e2"}
      x={-250}
      opacity={0}
    />
  );

  view.add(
    <Circle
      ref={circle2}
      size={200}
      fill={"#50c878"}
      x={0}
      opacity={0}
    />
  );

  view.add(
    <Circle
      ref={circle3}
      size={120}
      fill={"#ffd93d"}
      x={250}
      opacity={0}
    />
  );

  yield* all(
    pointsTitle().opacity(0, 0.5),
    point1().opacity(0, 0.5),
    point2().opacity(0, 0.5),
    point3().opacity(0, 0.5)
  );

  yield* graphTitle().opacity(1, 0.8);

  yield* all(
    circle1().opacity(1, 0.6),
    circle1().scale(0, 0.01).to(1, 0.6),
    circle1().position.y(0, 0.01).to(50, 0.6)
  );

  yield* all(
    circle2().opacity(1, 0.6),
    circle2().scale(0, 0.01).to(1, 0.6),
    circle2().position.y(0, 0.01).to(50, 0.6)
  );

  yield* all(
    circle3().opacity(1, 0.6),
    circle3().scale(0, 0.01).to(1, 0.6),
    circle3().position.y(0, 0.01).to(50, 0.6)
  );

  yield* beginSlide("Slide 3 - Visualizzazione");

  // Slide 4: Rettangoli animati
  const rect1 = createRef<Rect>();
  const rect2 = createRef<Rect>();
  const rectsTitle = createRef<Txt>();

  view.add(
    <Txt
      ref={rectsTitle}
      text="Forme Geometriche"
      fontSize={60}
      fill={"#9b59b6"}
      y={-300}
      opacity={0}
    />
  );

  view.add(
    <Rect
      ref={rect1}
      width={300}
      height={200}
      fill={"#e74c3c"}
      rotation={0}
      x={-200}
      opacity={0}
    />
  );

  view.add(
    <Rect
      ref={rect2}
      width={300}
      height={200}
      fill={"#3498db"}
      rotation={0}
      x={200}
      opacity={0}
    />
  );

  yield* all(
    graphTitle().opacity(0, 0.5),
    circle1().opacity(0, 0.5),
    circle2().opacity(0, 0.5),
    circle3().opacity(0, 0.5)
  );

  yield* rectsTitle().opacity(1, 0.8);

  yield* all(
    rect1().opacity(1, 0.8),
    rect1().rotation(0, 0.01).to(360, 1.5)
  );

  yield* all(
    rect2().opacity(1, 0.8),
    rect2().rotation(0, 0.01).to(-360, 1.5)
  );

  yield* beginSlide("Slide 4 - Forme");

  // Slide 5: Conclusione
  const finalText = createRef<Txt>();
  const thankYou = createRef<Txt>();

  view.add(
    <Txt
      ref={finalText}
      text="Grazie per l'attenzione!"
      fontSize={70}
      fill={"#f39c12"}
      fontWeight={700}
      opacity={0}
    />
  );

  view.add(
    <Txt
      ref={thankYou}
      text="Domande?"
      fontSize={45}
      fill={"#95a5a6"}
      y={120}
      opacity={0}
    />
  );

  yield* all(
    rectsTitle().opacity(0, 0.5),
    rect1().opacity(0, 0.5),
    rect2().opacity(0, 0.5)
  );

  yield* all(
    finalText().opacity(1, 1),
    finalText().scale(0.8, 0.01).to(1, 0.8)
  );

  yield* thankYou().opacity(1, 0.8);

  yield* beginSlide("Slide 5 - Fine");
});
