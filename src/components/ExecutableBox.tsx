import { Rect, Txt } from "@motion-canvas/2d";
import { createRef } from "@motion-canvas/core";

export interface ExecutableBoxProps {
  filename: string;
  x?: number;
  y?: number;
}

export function ExecutableBox(props: ExecutableBoxProps) {
  const { filename, x = 0, y = 0 } = props;

  const boxRef = createRef<Rect>();
  const iconRef = createRef<Txt>();
  const exeLabelRef = createRef<Txt>();
  const filenameRef = createRef<Txt>();

  return {
    boxRef,
    iconRef,
    exeLabelRef,
    filenameRef,
    nodes: [
      // Box principale
      <Rect
        ref={boxRef}
        width={120}
        height={160}
        fill={"#2d2d30"}
        stroke={"#ce9178"}
        lineWidth={3}
        x={x}
        y={y}
        opacity={0}
        radius={8}
      />,
      // Icona binaria/codice
      <Txt
        ref={iconRef}
        text={`010101\n101010\n110011\n010110`}
        fontSize={12}
        fill={"#808080"}
        fontFamily={"monospace"}
        textAlign={"center"}
        lineHeight={14}
        x={x}
        y={y - 40}
        opacity={0}
      />,
      // Label "EXE"
      <Txt
        ref={exeLabelRef}
        text={`EXE`}
        fontSize={28}
        fill={"#ce9178"}
        fontWeight={700}
        textAlign={"center"}
        x={x}
        y={y + 10}
        opacity={0}
      />,
      // Nome file
      <Txt
        ref={filenameRef}
        text={`${filename}`}
        fontSize={24}
        fill={"#ffffff"}
        fontWeight={600}
        textAlign={"center"}
        x={x}
        y={y + 50}
        opacity={0}
      />,
    ],
  };
}
