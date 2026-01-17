import { Rect, Txt } from "@motion-canvas/2d";
import { createRef } from "@motion-canvas/core";

export interface InfoBoxProps {
  title: string;
  content: string;
  icon?: string;
  color: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  description?: string;
}

export function InfoBox(props: InfoBoxProps) {
  const {
    title,
    content,
    icon = "",
    color,
    x = 0,
    y = 0,
    width = 200,
    height = 150,
    description,
  } = props;

  const boxRef = createRef<Rect>();
  const titleRef = createRef<Txt>();
  const contentRef = createRef<Txt>();
  const descRef = createRef<Txt>();

  const iconText = icon ? `${icon}\n` : "";

  return {
    boxRef,
    titleRef,
    contentRef,
    descRef,
    nodes: [
      <Rect
        ref={boxRef}
        width={width}
        height={height}
        fill={"#264f78"}
        stroke={color}
        lineWidth={3}
        x={x}
        y={y}
        opacity={0}
        radius={8}
      />,
      <Txt
        ref={titleRef}
        text={title}
        fontSize={32}
        fill={color}
        fontWeight={600}
        textAlign={"center"}
        x={x}
        y={y - 40}
        opacity={0}
      />,
      <Txt
        ref={contentRef}
        text={`${iconText}${content}`}
        fontSize={36}
        fill={"#ffffff"}
        textAlign={"center"}
        x={x}
        y={y + 10}
        opacity={0}
      />,
      description && (
        <Txt
          ref={descRef}
          text={description}
          fontSize={22}
          fill={"#9cdcfe"}
          textAlign={"center"}
          x={x}
          y={y + height - 20}
          opacity={0}
        />
      ),
    ].filter(Boolean),
  };
}
