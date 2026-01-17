import { Txt } from "@motion-canvas/2d";
import { createRef } from "@motion-canvas/core";

export interface SlideTitleProps {
  title: string;
  subtitle?: string;
  titleColor?: string;
  subtitleColor?: string;
  titleFontSize?: number;
  subtitleFontSize?: number;
  y?: number;
}

export function SlideTitle(props: SlideTitleProps) {
  const {
    title,
    subtitle,
    titleColor = "#569cd6",
    subtitleColor = "#9cdcfe",
    titleFontSize = 60,
    subtitleFontSize = 28,
    y = -300,
  } = props;

  const titleRef = createRef<Txt>();
  const subtitleRef = createRef<Txt>();

  return {
    titleRef,
    subtitleRef,
    nodes: [
      <Txt
        ref={titleRef}
        text={title}
        fontSize={titleFontSize}
        fill={titleColor}
        fontWeight={600}
        y={y}
        opacity={0}
      />,
      subtitle && (
        <Txt
          ref={subtitleRef}
          text={subtitle}
          fontSize={subtitleFontSize}
          fill={subtitleColor}
          y={y + 70}
          opacity={0}
        />
      ),
    ].filter(Boolean),
  };
}
