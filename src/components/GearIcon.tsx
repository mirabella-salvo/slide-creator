import { JSX, Txt } from "@motion-canvas/2d";
import { createRef, Reference } from "@motion-canvas/core";

export interface GearIconProps {
  x?: number;
  y?: number;
  size?: number;
  color?: string;
}

export interface GearIconResult {
  gearRef: Reference<Txt>;
  nodes: JSX.Element[];
}

export function GearIcon(props: GearIconProps): GearIconResult {
  const { x = 0, y = 0, size = 40, color = "#dcdcaa" } = props;

  const gearRef = createRef<Txt>();

  return {
    gearRef,
    nodes: [
      <Txt
        ref={gearRef}
        text="⚙️"
        fontSize={size}
        fill={color}
        x={x}
        y={y}
        opacity={0}
      />,
    ],
  };
}
