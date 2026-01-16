import { makeScene2D, Txt } from "@motion-canvas/2d";
import { createRef, waitFor, all } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const title = createRef<Txt>();
  const bullet1 = createRef<Txt>();

  view.add(
    <Txt ref={title} fill={"white"} text="Slide Title" fontSize={72} y={-200} />
  );
  view.add(
    <Txt
      ref={bullet1}
      fill={"white"}
      text="• Point 1"
      fontSize={48}
      y={-50}
      opacity={0}
    />
  );

  // Animate in
  yield* all(title().opacity(1, 0.5), bullet1().opacity(1, 0.5));

  // Hold for presentation
  yield* waitFor(2);
});
