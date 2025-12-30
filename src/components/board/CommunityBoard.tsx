import BoardCanvas from "./BoardCanvas";
import BoardToolbar from "./BoardToolbar";
import { useBoardSync } from "./useBoardSync";

export default function CommunityBoard() {
  useBoardSync();

  return (
    <div className="relative w-full h-full overflow-hidden">
      <BoardCanvas />
      <BoardToolbar />
    </div>
  );
}
