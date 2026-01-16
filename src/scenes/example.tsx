import { Circle, makeScene2D, Txt } from "@motion-canvas/2d";
import { all, beginSlide, createRef } from "@motion-canvas/core";
import secondCircle from "./secondCircle";

export default makeScene2D(function* (view) {
  // Create your animations here

  const circle = createRef<Circle>();
  const floatingText = createRef<Txt>();

  view.add(<Circle ref={circle} size={320} fill={"lightseagreen"} y={-500} />);
  view.add(
    <Txt ref={floatingText} text="Hello!" fontSize={48} fill={"Red"} y={-500} />
  );

  const secondCircle = createRef<Circle>();
  const secondFloatingText = createRef<Txt>();

  view.add(<Circle ref={secondCircle} size={320} fill={"brown"} y={-500} />);
  view.add(
    <Txt
      ref={secondFloatingText}
      text="Second Scene!"
      fontSize={48}
      fill={"Yellow"}
      y={-500}
    />
  );

  yield* all(
    beginSlide("First Scene"),
    circle().scale(2, 2).to(1, 2),
    circle().position.y(-500, 2).to(0, 2),
    // Float text from top to middle
    floatingText().position.y(-500, 2).to(0, 2),

    beginSlide("Start Second Scene"),
    secondCircle().scale(2, 2).to(1, 2),
    secondCircle().position.y(-500, 2).to(0, 2)
  );
});
