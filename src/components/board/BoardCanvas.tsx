import React, { useRef, useState, useCallback, useEffect } from "react";
import { Stage, Layer, Line, Text, Image as KonvaImage, Group } from "react-konva";
import useImage from "use-image";
import type { BoardItem } from "./types";

// Componente auxiliar para imágenes/stickers con efecto de glow
const BoardImage: React.FC<{ src: string; x: number; y: number; scale: number; rotation: number }> = ({ src, x, y, scale, rotation }) => {
  const [image] = useImage(src);
  return (
    <KonvaImage
      image={image}
      x={x}
      y={y}
      scaleX={scale}
      scaleY={scale}
      rotation={rotation}
      shadowColor="#22d3ee"
      shadowBlur={18}
      shadowOpacity={0.5}
    />
  );
};

interface BoardCanvasProps {
  items: BoardItem[];
  onDrawEnd: (points: number[]) => void;
  tool: string;
  color: string;
  lineWidth: number;
  pixelSize: number;
  onCanvasClick?: (pos: {x: number, y: number}) => void;
  previewSticker?: string | null;
  previewImage?: string | null;
  previewPos?: {x: number, y: number} | null;
  onPreviewMove?: (pos: {x: number, y: number}) => void;
}

export default function BoardCanvas({ items, onDrawEnd, tool, color, lineWidth, pixelSize, onCanvasClick, previewSticker, previewImage, previewPos, onPreviewMove }: BoardCanvasProps) {
  const [drawing, setDrawing] = useState(false);
  const [currentPoints, setCurrentPoints] = useState<number[]>([]);
  const [stageScale, setStageScale] = useState(1);
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const stageRef = useRef<any>(null);

  // Responsive: usar 100vw x 100vh en móvil/tablet, 1200x700 en desktop
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
  const BOARD_WIDTH = isDesktop ? 1200 : window.innerWidth;
  const BOARD_HEIGHT = isDesktop ? 700 : window.innerHeight - 56;

  // Nuevo: renderiza la línea actual mientras se dibuja
  const renderCurrentLine = () => {
    if (!drawing || currentPoints.length < 2) return null;
    return (
      <Line
        points={currentPoints}
        stroke={color}
        strokeWidth={lineWidth}
        lineCap="round"
        lineJoin="round"
        tension={0.5}
        shadowColor="#22d3ee"
        shadowBlur={lineWidth * 1.2}
        shadowOpacity={0.4}
        opacity={0.95}
        globalCompositeOperation={tool === 'erase' ? 'destination-out' : 'source-over'}
      />
    );
  };

  // Zoom con la rueda del mouse
  const handleWheel = (e: any) => {
    e.evt.preventDefault();
    const scaleBy = 1.1;
    const stage = stageRef.current;
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();
    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };
    let newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
    newScale = Math.max(0.2, Math.min(4, newScale));
    setStageScale(newScale);
    setStagePos({
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    });
  };

  // Pan con drag
  const handleDragMove = (e: any) => {
    setStagePos(e.target.position());
  };

  // Mini-mapa
  const MINIMAP_WIDTH = 180;
  const MINIMAP_HEIGHT = 105;
  const minimapScale = MINIMAP_WIDTH / BOARD_WIDTH;

  return (
    <div
      style={{
        position: 'relative',
        width: isDesktop ? 1200 : '100vw',
        height: isDesktop ? 700 : 'calc(100vh - 56px)',
        maxWidth: '100vw',
        maxHeight: '100vh',
        overflow: 'hidden',
        background: '#18181b',
      }}
    >
      <Stage
        ref={stageRef}
        width={BOARD_WIDTH}
        height={BOARD_HEIGHT}
        scaleX={stageScale}
        scaleY={stageScale}
        x={stagePos.x}
        y={stagePos.y}
        draggable
        onDragMove={handleDragMove}
        onWheel={handleWheel}
        style={{
          borderRadius: isDesktop ? 24 : 0,
          background: "radial-gradient(circle at 70% 30%, #232b3b 60%, #18181b 100%)",
          boxShadow: isDesktop ? "0 0 48px #22d3ee55, 0 0 0 4px #fff2 inset" : undefined,
          border: isDesktop ? "3px solid #22d3ee" : undefined,
          position: "relative",
          overflow: "hidden",
          touchAction: 'none',
        }}
        onMouseDown={e => {
          const pos = e.target.getStage()?.getPointerPosition();
          // Si hay previsualización activa, colocar en esa posición
          if ((previewSticker || previewImage) && onCanvasClick && pos) {
            onCanvasClick(pos);
            return;
          }
          if (onCanvasClick && pos && tool === 'text') {
            onCanvasClick(pos);
            return;
          }
          setDrawing(true);
          if (!pos) return;
          setCurrentPoints([pos.x, pos.y]);
        }}
        onMouseMove={e => {
          if (previewSticker || previewImage) {
            const pos = e.target.getStage()?.getPointerPosition();
            if (pos && onPreviewMove) onPreviewMove(pos);
            return;
          }
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
                    {/* Previsualización flotante de sticker o imagen */}
                    {previewSticker && previewPos && (
                      previewSticker.startsWith('/') ? (
                        <KonvaImage
                          image={useImage(previewSticker)[0]}
                          x={previewPos.x}
                          y={previewPos.y}
                          scaleX={1}
                          scaleY={1}
                          opacity={0.7}
                          shadowColor="#facc15"
                          shadowBlur={18}
                          shadowOpacity={0.7}
                        />
                      ) : (
                        <Text
                          text={previewSticker}
                          x={previewPos.x}
                          y={previewPos.y}
                          fontSize={40}
                          fill="#facc15"
                          opacity={0.7}
                          shadowColor="#22d3ee"
                          shadowBlur={10}
                          shadowOpacity={0.7}
                        />
                      )
                    )}
                    {previewImage && previewPos && (
                      <KonvaImage
                        image={useImage(previewImage)[0]}
                        x={previewPos.x}
                        y={previewPos.y}
                        scaleX={1}
                        scaleY={1}
                        opacity={0.7}
                        shadowColor="#facc15"
                        shadowBlur={18}
                        shadowOpacity={0.7}
                      />
                    )}
          {/* Fondo visual y branding */}
          <Group>
            <Text
              text="🌟 Comunidad BWU"
              x={24}
              y={18}
              fill="#22d3ee"
              fontSize={28}
              fontStyle="bold"
              shadowColor="#fff"
              shadowBlur={12}
              shadowOpacity={0.7}
            />
            <Text
              text="¡Colabora, dibuja y comparte!"
              x={24}
              y={52}
              fill="#fff"
              fontSize={16}
              fontStyle="italic"
              shadowColor="#22d3ee"
              shadowBlur={8}
              shadowOpacity={0.5}
              opacity={0.8}
            />
          </Group>
          {/* Renderizado de elementos del board */}
          {items.map((item) => {
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
                      shadowColor="#22d3ee"
                      shadowBlur={10}
                      shadowOpacity={0.3}
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
                    shadowColor="#22d3ee"
                    shadowBlur={item.data.strokeWidth * 1.2}
                    shadowOpacity={0.4}
                    opacity={0.95}
                  />
                );
              case "text":
                return (
                  <Group key={item.id}>
                    <Text
                      text={item.data.text}
                      x={item.x}
                      y={item.y}
                      fill={item.color || "#fff"}
                      fontSize={28}
                      fontStyle="bold"
                      shadowColor="#22d3ee"
                      shadowBlur={10}
                      shadowOpacity={0.5}
                      opacity={0.95}
                    />
                    <Text
                      text={`👤`}
                      x={item.x - 28}
                      y={item.y - 8}
                      fontSize={18}
                      fill="#22d3ee"
                      opacity={0.7}
                    />
                  </Group>
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
                  <Group key={item.id}>
                    <BoardImage
                      src={item.data.src}
                      x={item.x}
                      y={item.y}
                      scale={item.scale}
                      rotation={item.rotation}
                    />
                    <Text
                      text="✨"
                      x={item.x + 24}
                      y={item.y - 12}
                      fontSize={18}
                      fill="#facc15"
                      shadowColor="#fff"
                      shadowBlur={8}
                      opacity={0.7}
                    />
                  </Group>
                );
              default:
                return null;
            }
          })}
          {renderCurrentLine()}
        </Layer>
      </Stage>
      {/* Mini-mapa */}
      <div style={{
        position: 'absolute',
        right: 12,
        bottom: 12,
        width: MINIMAP_WIDTH,
        height: MINIMAP_HEIGHT,
        background: '#18181bcc',
        border: '2px solid #22d3ee',
        borderRadius: 10,
        boxShadow: '0 0 8px #22d3ee',
        zIndex: 20,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        <svg width={MINIMAP_WIDTH} height={MINIMAP_HEIGHT} style={{display:'block'}}>
          {/* Fondo */}
          <rect x={0} y={0} width={MINIMAP_WIDTH} height={MINIMAP_HEIGHT} fill="#232b3b" />
          {/* Dibuja los trazos del board en miniatura */}
          {items.filter(i => i.type === 'draw').map((item, idx) => (
            <polyline
              key={item.id+idx}
              points={item.data.points.map((v, i) => i%2===0 ? v*minimapScale : v*minimapScale).join(',')}
              fill="none"
              stroke={item.data.color || item.color || '#22d3ee'}
              strokeWidth={Math.max(1, (item.data.strokeWidth || 2) * minimapScale)}
              opacity="0.7"
            />
          ))}
          {/* Viewport rectangle */}
          <rect
            x={-stagePos.x * minimapScale / stageScale}
            y={-stagePos.y * minimapScale / stageScale}
            width={MINIMAP_WIDTH / stageScale}
            height={MINIMAP_HEIGHT / stageScale}
            fill="none"
            stroke="#facc15"
            strokeWidth="2"
            opacity="0.8"
          />
        </svg>
      </div>
    </div>
  );
}
