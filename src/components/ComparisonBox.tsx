import { Rect, Txt } from "@motion-canvas/2d";
import { createRef } from "@motion-canvas/core";

export interface ComparisonBoxProps {
  label: string;
  status: string;
  statusIcon: string;
  isActive: boolean;
  x?: number;
  y?: number;
}

export function ComparisonBox(props: ComparisonBoxProps) {
  const { label, status, statusIcon, isActive, x = 0, y = 0 } = props;

  const boxRef = createRef<Rect>();
  const labelRef = createRef<Txt>();
  const statusRef = createRef<Txt>();

  const fillColor = isActive ? "#1e1e1e" : "#3e3e42";
  const strokeColor = isActive ? "#4ec9b0" : "#808080";
  const textColor = isActive ? "#4ec9b0" : "#808080";
  const statusColor = isActive ? "#4ec9b0" : "#f48771";

  return {
    boxRef,
    labelRef,
    statusRef,
    nodes: [
      <Rect
        ref={boxRef}
        width={350}
        height={200}
        fill={fillColor}
        stroke={strokeColor}
        lineWidth={isActive ? 4 : 3}
        x={x}
        y={y}
        opacity={0}
        radius={10}
      />,
      <Txt
        ref={labelRef}
        text={label}
        fontSize={32}
        fill={textColor}
        fontWeight={isActive ? 700 : 600}
        x={x}
        y={y - 60}
        opacity={0}
      />,
      <Txt
        ref={statusRef}
        text={`${status} ${statusIcon}`}
        fontSize={40}
        fill={statusColor}
        textAlign={"center"}
        x={x}
        y={y + 30}
        opacity={0}
      />,
    ],
  };
}
