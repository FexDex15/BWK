export default function MediaPanel({
  onSelect,
}: {
  onSelect: (url: string, type: "gif" | "image") => void;
}) {
  const gifs = [
    "/gifs/uke1.gif",
    "/gifs/uke2.gif",
    "/gifs/uke3.gif",
  ];

  return (
    <div className="media-panel">
      {gifs.map((g) => (
        <img
          key={g}
          src={g}
          onClick={() => onSelect(g, "gif")}
        />
      ))}
    </div>
  );
}
