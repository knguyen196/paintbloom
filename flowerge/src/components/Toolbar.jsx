function Toolbar({
  mode,
  onModeChange,
  activeColor,
  onColorChange,
  brushSize,
  onBrushSizeChange,
  flowerCount,
  onFlowerCountChange,
  textureOn,
  onTextureToggle,
  onNewPainting,
  onUndo,
  onFillBackground,
  onReset,
  onDownload,
  recentColors,
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2">
        <button
          onClick={() => onModeChange("fill")}
          className={`flex-1 px-3 py-2 text-xs uppercase tracking-wide border rounded ${
            mode === "fill"
              ? "border-accent text-accent bg-[rgba(200,90,63,0.06)]"
              : "border-border text-dim"
          }`}
        >
          Fill
        </button>
        <button
          onClick={() => onModeChange("draw")}
          className={`flex-1 px-3 py-2 text-xs uppercase tracking-wide border rounded ${
            mode === "draw"
              ? "border-accent text-accent bg-[rgba(200,90,63,0.06)]"
              : "border-border text-dim"
          }`}
        >
          Draw
        </button>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="color"
          value={activeColor}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-10 h-9 border border-border rounded cursor-pointer"
        />
        <span className="text-xs text-dim">{activeColor}</span>
      </div>

      <div className="flex gap-1">
        {recentColors.map((color) => (
          <button
            key={color}
            onClick={() => onColorChange(color)}
            className="w-5 h-5 rounded-sm border border-border"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs text-dim uppercase tracking-wide">
          <span>Brush size</span>
          <span className="text-ink">{brushSize}</span>
        </div>
        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) => onBrushSizeChange(parseInt(e.target.value))}
          className="w-full accent-accent"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs text-dim uppercase tracking-wide">
          <span>Flowers</span>
          <span className="text-ink">{flowerCount}</span>
        </div>
        <input
          type="range"
          min="1"
          max="12"
          value={flowerCount}
          onChange={(e) => onFlowerCountChange(parseInt(e.target.value))}
          className="w-full accent-accent"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs text-dim uppercase tracking-wide">
          Texture
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onTextureToggle(false)}
            className={`flex-1 px-3 py-2 text-xs uppercase tracking-wide border rounded ${
              textureOn === false
                ? "border-accent text-accent bg-[rgba(200,90,63,0.06)]"
                : "border-border text-dim"
            }`}
          >
            Off
          </button>
          <button
            onClick={() => onTextureToggle(true)}
            className={`flex-1 px-3 py-2 text-xs uppercase tracking-wide border rounded ${
              textureOn === true
                ? "border-accent text-accent bg-[rgba(200,90,63,0.06)]"
                : "border-border text-dim"
            }`}
          >
            Grain
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-2 border-t border-border">
        <button
          onClick={onNewPainting}
          className="px-3 py-2 text-xs uppercase tracking-wide border border-border text-ink rounded hover:border-accent hover:text-accent"
        >
          New Painting
        </button>
        <button
          onClick={onUndo}
          className="px-3 py-2 text-xs uppercase tracking-wide border border-border text-ink rounded hover:border-accent hover:text-accent"
        >
          Undo
        </button>
        <button
          onClick={onFillBackground}
          className="px-3 py-2 text-xs uppercase tracking-wide border border-border text-ink rounded hover:border-accent hover:text-accent"
        >
          Fill Background
        </button>
        <button
          onClick={onReset}
          className="px-3 py-2 text-xs uppercase tracking-wide border border-border text-ink rounded hover:border-accent hover:text-accent"
        >
          Reset
        </button>
        <button
          onClick={onDownload}
          className="px-3 py-2 text-xs uppercase tracking-wide border border-accent text-accent bg-[rgba(200,90,63,0.06)] rounded hover:bg-[rgba(200,90,63,0.12)]"
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
