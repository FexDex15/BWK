

import React, { useState } from "react";
import { Stage, Layer, Line, Text, Image as KonvaImage } from "react-konva";
import { BoardItem } from "./types";
import useImage from "use-image";

 
export default function BoardCanvas({ items, onDrawEnd, tool, color, lineWidth, pixelSize }: any) {
  const [drawing, setDrawing] = useState(false);
  const [currentPoints, setCurrentPoints] = useState<number[]>([]);

  // Componente auxiliar para imágenes/stickers
  const BoardImage = ({ src, x, y, scale, rotation }: { src: string; x: number; y: number; scale: number; rotation: number }) => {
    const [image] = useImage(src);
    return <KonvaImage image={image} x={x} y={y} scaleX={scale} scaleY={scale} rotation={rotation} />;
  };
  return (
    <Stage
      width={900}
      height={500}
      style={{ borderRadius: 18, background: "linear-gradient(135deg,#18181b 60%,#232b3b 100%)", boxShadow: "0 0 32px #22d3ee33" }}
      onMouseDown={e => {
        setDrawing(true);
        const pos = e.target.getStage()?.getPointerPosition();
        if (!pos) return;
        setCurrentPoints([pos.x, pos.y]);
      }}
      onMouseMove={e => {
        if (!drawing) return;
        const pos = e.target.getStage()?.getPointerPosition();
        if (!pos) return;
        setCurrentPoints(pts => [...pts, pos.x, pos.y]);
      }}
      onMouseUp={() => {
        setDrawing(false);
        if (currentPoints.length > 1) {
          onDrawEnd([...currentPoints]);
        }
        setCurrentPoints([]);
      }}
    >
      <Layer>
        {/* Fondo visual */}
        <Text
          text="🎨 Community Board"
          x={20}
          y={20}
          fill="#22d3ee"
          fontSize={20}
          fontStyle="bold"
          shadowColor="#000"
          shadowBlur={8}
        />

        import React, { useState } from "react";
        import { Stage, Layer, Line, Text, Image as KonvaImage } from "react-konva";
        import useImage from "use-image";

        export default function BoardCanvas({ items, onDrawEnd }: any) {
          const [drawing, setDrawing] = useState(false);
          const [currentPoints, setCurrentPoints] = useState<number[]>([]);

          // Componente auxiliar para imágenes/stickers
          const BoardImage = ({ src, x, y, scale, rotation }: { src: string; x: number; y: number; scale: number; rotation: number }) => {
            const [image] = useImage(src);
            return <KonvaImage image={image} x={x} y={y} scaleX={scale} scaleY={scale} rotation={rotation} />;
          };

          return (
            <Stage
              width={900}
              height={500}
              style={{ borderRadius: 18, background: "linear-gradient(135deg,#18181b 60%,#232b3b 100%)", boxShadow: "0 0 32px #22d3ee33" }}
              onMouseDown={e => {
                setDrawing(true);
                const pos = e.target.getStage()?.getPointerPosition();
                if (!pos) return;
                setCurrentPoints([pos.x, pos.y]);
              }}
              onMouseMove={e => {
                if (!drawing) return;
                const pos = e.target.getStage()?.getPointerPosition();
                if (!pos) return;
                setCurrentPoints(pts => [...pts, pos.x, pos.y]);
              }}
              onMouseUp={() => {
                setDrawing(false);
                if (currentPoints.length > 1) {
                  onDrawEnd([...currentPoints]);
                }
                setCurrentPoints([]);
              }}
            >
              <Layer>
                <Text
                  text="🎨 Community Board"
                  x={20}
                  y={20}
                  fill="#22d3ee"
                  fontSize={20}
                  fontStyle="bold"
                  shadowColor="#000"
                  shadowBlur={8}
                />
                {items.map((item: any) => {
                  switch (item.type) {
                    case "draw":
                      if (item.data.brushType === "pixel") {
                        return (
                          <Line
                            key={item.id}
                            points={item.data.points}
                            stroke={item.data.color || item.color}
                            strokeWidth={item.data.pixelSize || 8}
                            closed
                            fill={item.data.color || item.color}
                          />
                        );
                      }
                      return (
                        <Line
                          key={item.id}
                          points={item.data.points}
                          stroke={item.data.color || item.color}
                          strokeWidth={item.data.strokeWidth}
                          tension={0.5}
                          lineCap="round"
                          shadowColor="#22d3ee55"
                          shadowBlur={item.data.strokeWidth * 0.7}
                        />
                      );
                    case "text":
                      return (
                        <Text
                          key={item.id}
                          text={item.data.text}
                          x={item.x}
                          y={item.y}
                          fill={item.color}
                          fontSize={22}
                          fontStyle="bold"
                          shadowColor="#000"
                          shadowBlur={6}
                        />
                      );
                    case "image":
                      return (
                        <BoardImage
                          key={item.id}
                          src={item.data.src}
                          x={item.x}
                          y={item.y}
                          scale={item.scale}
                          rotation={item.rotation}
                        />
                      );
                    case "sticker":
                      return (
                        <BoardImage
                          key={item.id}
                          src={item.data.src}
                          x={item.x}
                          y={item.y}
                          scale={item.scale}
                          rotation={item.rotation}
                        />
                      );
                    default:
                      return null;
                  }
                })}
              </Layer>
            </Stage>
          );
        }
