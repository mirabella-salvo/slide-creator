import { Rect, Txt, Layout, Img } from "@motion-canvas/2d";
import { createRef } from "@motion-canvas/core";

export interface SourceCodeBoxProps {
  filename: string;
  x?: number;
  y?: number;
}

export function SourceCodeBox(props: SourceCodeBoxProps) {
  const { filename, x = 0, y = 0 } = props;

  const containerRef = createRef<Rect>();
  const iconRef = createRef<Img>();
  const filenameRef = createRef<Txt>();

  // Refs per le linee di codice colorate
  const line1Ref = createRef<Rect>();
  const line2Ref = createRef<Rect>();
  const line3Ref = createRef<Rect>();
  const line4Ref = createRef<Rect>();
  const line5Ref = createRef<Rect>();
  const line6Ref = createRef<Rect>();

  return {
    containerRef,
    iconRef,
    filenameRef,
    line1Ref,
    line2Ref,
    line3Ref,
    line4Ref,
    line5Ref,
    line6Ref,
    nodes: [
      // Box principale
      <Rect
        ref={containerRef}
        width={120}
        height={160}
        fill={"#1e1e1e"}
        stroke={"#569cd6"}
        lineWidth={3}
        x={x}
        y={y}
        opacity={0}
        radius={8}
      />,
      // Linee di codice colorate (rettangolini)
      // Linea 1 - viola (keywords)
      <Rect
        ref={line1Ref}
        width={70}
        height={6}
        fill={"#c586c0"}
        x={x - 10}
        y={y - 50}
        opacity={0}
        radius={2}
      />,
      // Linea 2 - blu (function)
      <Rect
        ref={line2Ref}
        width={55}
        height={6}
        fill={"#4ec9b0"}
        x={x - 22}
        y={y - 30}
        opacity={0}
        radius={2}
      />,
      // Linea 3 - giallo (string)
      <Rect
        ref={line3Ref}
        width={65}
        height={6}
        fill={"#dcdcaa"}
        x={x - 19}
        y={y - 10}
        opacity={0}
        radius={2}
      />,
      // Linea 4 - rosa/arancio
      <Rect
        ref={line4Ref}
        width={45}
        height={6}
        fill={"#ce9178"}
        x={x - 22}
        y={y + 10}
        opacity={0}
        radius={2}
      />,
      // Linea 5 - viola
      <Rect
        ref={line5Ref}
        width={60}
        height={6}
        fill={"#c586c0"}
        x={x - 20}
        y={y + 30}
        opacity={0}
        radius={2}
      />,
      // Linea 6 - blu chiaro (breve)
      <Rect
        ref={line6Ref}
        width={35}
        height={6}
        fill={"#9cdcfe"}
        x={x - 32}
        y={y + 50}
        opacity={0}
        radius={2}
      />,
      // Nome file sotto
      <Txt
        ref={filenameRef}
        text={`${filename}`}
        fontSize={20}
        fill={"#ffffff"}
        fontWeight={600}
        textAlign={"center"}
        x={x}
        y={y + 65}
        opacity={0}
      />,
      // Icona C (sopra tutto, fuori dal container)
      <Img
        ref={iconRef}
        src={"/icons8-c-programming-96.png"}
        scale={0.5}
        x={x}
        y={y - 110}
        opacity={0}
      />,
    ],
  };
}
