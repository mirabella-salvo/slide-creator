import { Rect, Txt } from "@motion-canvas/2d";
import { createRef } from "@motion-canvas/core";

export interface PhaseBoxProps {
  title: string;
  description: string;
  color: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export function PhaseBox(props: PhaseBoxProps) {
  const {
    title,
    description,
    color,
    x = 0,
    y = 50,
    width = 260,
    height = 200,
  } = props;

  const boxRef = createRef<Rect>();
  const titleRef = createRef<Txt>();
  const descRef = createRef<Txt>();

  return {
    boxRef,
    titleRef,
    descRef,
    nodes: [
      <Rect
        ref={boxRef}
        width={width}
        height={height}
        fill={"#3e3e42"}
        stroke={color}
        lineWidth={2}
        x={x}
        y={y}
        opacity={0}
        radius={8}
      />,
      <Txt
        ref={titleRef}
        text={title}
        fontSize={24}
        fill={color}
        fontWeight={600}
        textAlign={"center"}
        x={x}
        y={y - 60}
        opacity={0}
      />,
      <Txt
        ref={descRef}
        text={description}
        fontSize={20}
        fill={"#9cdcfe"}
        textAlign={"center"}
        lineHeight={32}
        x={x}
        y={y + 10}
        opacity={0}
      />,
    ],
  };
}
