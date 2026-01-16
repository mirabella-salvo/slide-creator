import { Circle, Rect, makeScene2D, Txt } from "@motion-canvas/2d";
import { all, createRef, beginSlide } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  // Slide 1: Intro Tecnica
  const title = createRef<Txt>();

  view.add(
    <Txt
      ref={title}
      text="Presentazione Tecnica"
      fontSize={80}
      fill={"#00ff88"}
      fontWeight={700}
      opacity={0}
    />
  );

  yield* title().opacity(1, 1);

  yield* beginSlide("Intro Tecnica");

  // Slide 2: Architettura
  const archTitle = createRef<Txt>();
  const box1 = createRef<Rect>();
  const box2 = createRef<Rect>();
  const box3 = createRef<Rect>();

  view.add(
    <Txt
      ref={archTitle}
      text="Architettura Sistema"
      fontSize={60}
      fill={"#ffffff"}
      y={-300}
      opacity={0}
    />
  );

  view.add(
    <Rect
      ref={box1}
      width={200}
      height={150}
      fill={"#ff6b6b"}
      x={-300}
      opacity={0}
    />
  );

  view.add(
    <Rect
      ref={box2}
      width={200}
      height={150}
      fill={"#4ecdc4"}
      x={0}
      opacity={0}
    />
  );

  view.add(
    <Rect
      ref={box3}
      width={200}
      height={150}
      fill={"#ffe66d"}
      x={300}
      opacity={0}
    />
  );

  yield* title().opacity(0, 0.5);

  yield* archTitle().opacity(1, 0.8);
  yield* box1().opacity(1, 0.6);
  yield* box2().opacity(1, 0.6);
  yield* box3().opacity(1, 0.6);

  yield* beginSlide("Architettura");

  // Slide 3: Fine
  const endText = createRef<Txt>();

  view.add(
    <Txt
      ref={endText}
      text="Fine Presentazione Tecnica"
      fontSize={60}
      fill={"#00ff88"}
      opacity={0}
    />
  );

  yield* all(
    archTitle().opacity(0, 0.5),
    box1().opacity(0, 0.5),
    box2().opacity(0, 0.5),
    box3().opacity(0, 0.5)
  );

  yield* endText().opacity(1, 1);

  yield* beginSlide("Fine Tecnica");
});
