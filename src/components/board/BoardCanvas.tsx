import { Stage, Layer, Line, Text, Image as KonvaImage } from "react-konva";
import { useBoardStore } from "./boardStore";

export default function BoardCanvas() {
  const { items } = useBoardStore();

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {items.map((item) => {
          if (item.type === "draw") {
            return (
              <Line
                key={item.id}
                points={item.data.points}
                stroke={item.color}
                strokeWidth={4}
                lineCap="round"
              />
            );
          }

          if (item.type === "text") {
            return (
              <Text
                key={item.id}
                text={item.data.text}
                x={item.x}
                y={item.y}
                fill={item.color}
              />
            );
          }

          return null;
        })}
      </Layer>
    </Stage>
  );
}
