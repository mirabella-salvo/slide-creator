import { Circle, makeScene2D, Txt } from "@motion-canvas/2d";
import { all, createRef, beginSlide } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  // Slide 1: Intro Marketing
  const title = createRef<Txt>();
  const subtitle = createRef<Txt>();

  view.add(
    <Txt
      ref={title}
      text="Presentazione Marketing"
      fontSize={80}
      fill={"#ff6b9d"}
      fontWeight={700}
      opacity={0}
    />
  );

  view.add(
    <Txt
      ref={subtitle}
      text="Il nostro prodotto innovativo"
      fontSize={40}
      fill={"#c9ada7"}
      y={100}
      opacity={0}
    />
  );

  yield* title().opacity(1, 1);
  yield* subtitle().opacity(1, 0.8);

  yield* beginSlide("Intro Marketing");

  // Slide 2: Vantaggi
  const advantagesTitle = createRef<Txt>();
  const adv1 = createRef<Txt>();
  const adv2 = createRef<Txt>();
  const adv3 = createRef<Txt>();

  view.add(
    <Txt
      ref={advantagesTitle}
      text="I Nostri Vantaggi"
      fontSize={60}
      fill={"#f4a261"}
      y={-300}
      opacity={0}
    />
  );

  view.add(
    <Txt
      ref={adv1}
      text="★ Velocità incredibile"
      fontSize={40}
      fill={"#ffffff"}
      x={-350}
      y={-50}
      opacity={0}
    />
  );

  view.add(
    <Txt
      ref={adv2}
      text="★ Design accattivante"
      fontSize={40}
      fill={"#ffffff"}
      x={-350}
      y={50}
      opacity={0}
    />
  );

  view.add(
    <Txt
      ref={adv3}
      text="★ Prezzo competitivo"
      fontSize={40}
      fill={"#ffffff"}
      x={-350}
      y={150}
      opacity={0}
    />
  );

  yield* all(
    title().opacity(0, 0.5),
    subtitle().opacity(0, 0.5)
  );

  yield* advantagesTitle().opacity(1, 0.8);
  yield* adv1().opacity(1, 0.5);
  yield* adv2().opacity(1, 0.5);
  yield* adv3().opacity(1, 0.5);

  yield* beginSlide("Vantaggi");

  // Slide 3: Call to Action
  const ctaTitle = createRef<Txt>();
  const ctaCircle = createRef<Circle>();

  view.add(
    <Txt
      ref={ctaTitle}
      text="Provalo Oggi!"
      fontSize={90}
      fill={"#e76f51"}
      fontWeight={800}
      opacity={0}
    />
  );

  view.add(
    <Circle
      ref={ctaCircle}
      size={0}
      fill={"#264653"}
      opacity={0.3}
    />
  );

  yield* all(
    advantagesTitle().opacity(0, 0.5),
    adv1().opacity(0, 0.5),
    adv2().opacity(0, 0.5),
    adv3().opacity(0, 0.5)
  );

  yield* ctaCircle().size(400, 1.5);
  yield* ctaTitle().opacity(1, 1);

  yield* beginSlide("Call to Action");
});
