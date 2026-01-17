import { Rect, Txt } from "@motion-canvas/2d";
import { createRef } from "@motion-canvas/core";

export interface OptionRowProps {
  command: string;
  description: string;
  y?: number;
  width?: number;
  height?: number;
}

export function OptionRow(props: OptionRowProps) {
  const {
    command,
    description,
    y = 0,
    width = 850,
    height = 80,
  } = props;

  const boxRef = createRef<Rect>();
  const cmdRef = createRef<Txt>();
  const descRef = createRef<Txt>();

  return {
    boxRef,
    cmdRef,
    descRef,
    nodes: [
      <Rect
        ref={boxRef}
        width={width}
        height={height}
        fill={"#1e1e1e"}
        stroke={"#3e3e42"}
        lineWidth={2}
        y={y}
        opacity={0}
        radius={6}
      />,
      <Txt
        ref={cmdRef}
        text={command}
        fontSize={32}
        fill={"#ce9178"}
        fontFamily={"monospace"}
        x={-200}
        y={y}
        opacity={0}
      />,
      <Txt
        ref={descRef}
        text={description}
        fontSize={28}
        fill={"#9cdcfe"}
        x={250}
        y={y}
        opacity={0}
      />,
    ],
  };
}
