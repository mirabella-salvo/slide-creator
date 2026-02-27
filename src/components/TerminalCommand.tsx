import { Rect, Txt } from "@motion-canvas/2d";
import { createRef } from "@motion-canvas/core";

export interface TerminalCommandProps {
  command: string;
  description?: string;
  width?: number;
  height?: number;
  y?: number;
}

export function TerminalCommand(props: TerminalCommandProps) {
  const {
    command,
    description,
    width = 900,
    height = 200,
    y = 0,
  } = props;

  const boxRef = createRef<Rect>();
  const promptRef = createRef<Txt>();
  const commandRef = createRef<Txt>();
  const descRef = createRef<Txt>();

  return {
    boxRef,
    promptRef,
    commandRef,
    descRef,
    nodes: [
      <Rect
        ref={boxRef}
        width={width}
        height={height}
        fill={"#1e1e1e"}
        stroke={"#3e3e42"}
        lineWidth={3}
        y={y}
        opacity={0}
        radius={10}
      />,
      <Txt
        ref={promptRef}
        text="$"
        fontSize={40}
        fill={"#4ec9b0"}
        fontFamily={"monospace"}
        x={-420}
        y={y}
        opacity={0}
      />,
      <Txt
        ref={commandRef}
        text={command}
        fontSize={40}
        fill={"#ce9178"}
        fontFamily={"monospace"}
        x={-250}
        y={y}
        opacity={0}
      />,
      description && (
        <Txt
          ref={descRef}
          text={description}
          fontSize={32}
          fill={"#9cdcfe"}
          y={y + 200}
          opacity={0}
        />
      ),
    ].filter(Boolean),
  };
}
