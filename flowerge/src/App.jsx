import { useState, useRef, useCallback } from "react";
import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";
import { generateScene } from "./lib/generateScene";

const WIDTH = 600;
const HEIGHT = 760;

function App() {
  const [mode, setMode] = useState("fill");
  const [activeColor, setActiveColor] = useState("#8c2f3d");
  const [brushSize, setBrushSize] = useState(6);
  const [flowerCount, setFlowerCount] = useState(6);
  const [textureOn, setTextureOn] = useState(true);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [shapes, setShapes] = useState(() =>
    generateScene(Math.floor(Math.random() * 100000), WIDTH, HEIGHT, 6),
  );
  const [strokes, setStrokes] = useState([]);
  const [, setUndoStack] = useState([]);
  const canvasApiRef = useRef(null);
  const [recentColors, setRecentColors] = useState([]);

  const rememberColor = useCallback((color) => {
    setRecentColors((prev) => {
      const withoutDuplicate = prev.filter((c) => c !== color);
      const withNewColorFirst = [color, ...withoutDuplicate];
      const capped = withNewColorFirst.slice(0, 8);
      return capped;
    });
  }, []);

  const handleNewPainting = useCallback(() => {
    const seed = Math.floor(Math.random() * 100000);
    const newScene = generateScene(seed, WIDTH, HEIGHT, flowerCount);
    setShapes(newScene);
    setStrokes([]);
    setBgColor("#ffffff");
    setUndoStack([]);
  }, [flowerCount]);

  const handleShapeFill = useCallback(
    (shapeId) => {
      setUndoStack((prev) => [...prev, { shapes, strokes, bgColor }]);
      setShapes((prevShapes) =>
        prevShapes.map((shape) =>
          shape.id === shapeId ? { ...shape, color: activeColor } : shape,
        ),
      );
      rememberColor(activeColor);
    },
    [activeColor, shapes, strokes, bgColor, rememberColor],
  );

  const handleStrokeComplete = useCallback(
    (stroke) => {
      setUndoStack((prev) => [...prev, { shapes, strokes, bgColor }]);
      setStrokes((prev) => [...prev, stroke]);
      rememberColor(stroke.color);
    },
    [shapes, strokes, bgColor, rememberColor],
  );

  const handleUndo = useCallback(() => {
    setUndoStack((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setShapes(last.shapes);
      setStrokes(last.strokes);
      setBgColor(last.bgColor);
      return prev.slice(0, -1);
    });
  }, []);

  const handleDownload = useCallback(() => {
    const dataUrl = canvasApiRef.current.getDataURL();
    const link = document.createElement("a");
    link.download = "paintbloom.png";
    link.href = dataUrl;
    link.click();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-cream font-mono text-ink">
      <div className="flex items-baseline justify-between px-5 py-3.5 border-b border-border bg-panel">
        <div className="text-[13px] tracking-wider uppercase font-semibold">
          paint<span className="text-accent">bloom</span>
        </div>
        <div className="text-[11px] text-dim">
          pick a color, click a shape to fill it
        </div>
      </div>
      <div className="flex flex-1 min-h-0">
        <div className="flex-1 flex items-center justify-center bg-[#efe9df] p-4">
          <Canvas
            ref={canvasApiRef}
            width={WIDTH}
            height={HEIGHT}
            shapes={shapes}
            strokes={strokes}
            bgColor={bgColor}
            textureOn={textureOn}
            mode={mode}
            activeColor={activeColor}
            brushSize={brushSize}
            onShapeFill={handleShapeFill}
            onStrokeComplete={handleStrokeComplete}
          />
        </div>

        <div className="w-60 border-l border-border bg-panel p-4">
          <Toolbar
            mode={mode}
            onModeChange={setMode}
            activeColor={activeColor}
            onColorChange={setActiveColor}
            brushSize={brushSize}
            onBrushSizeChange={setBrushSize}
            flowerCount={flowerCount}
            onFlowerCountChange={setFlowerCount}
            textureOn={textureOn}
            onTextureToggle={setTextureOn}
            onNewPainting={handleNewPainting}
            onUndo={handleUndo}
            onFillBackground={() => {
              setUndoStack((prev) => [...prev, { shapes, strokes, bgColor }]);
              setBgColor(activeColor);
              rememberColor(activeColor);
            }}
            onReset={() => {
              setShapes((prev) =>
                prev.map((shape) => ({ ...shape, color: null })),
              );
              setStrokes([]);
              setBgColor("#ffffff");
              setUndoStack([]);
            }}
            onDownload={handleDownload}
            recentColors={recentColors}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
