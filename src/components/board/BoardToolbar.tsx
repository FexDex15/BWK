interface Props {
  onAddText: () => void;
  onClear: () => void;
}

export default function BoardToolbar({ onAddText, onClear }: Props) {
  return (
    <div className="flex gap-2 mb-3">
      <button className="btn" onClick={onAddText}>
        ✏️ Texto
      </button>
      <button className="btn-secondary" onClick={onClear}>
        🧹 Limpiar
      </button>
    </div>
  );
}
