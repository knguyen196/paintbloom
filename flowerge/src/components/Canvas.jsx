import { forwardRef, useRef, useEffect, useImperativeHandle } from "react";
import { makeGrainCanvas } from "../lib/grain";

const Canvas = forwardRef(function Canvas(
  {
    width,
    height,
    shapes,
    strokes,
    bgColor,
    textureOn,
    mode,
    activeColor,
    brushSize,
    onShapeFill,
    onStrokeComplete,
  },
  ref,
) {
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const currentStrokeRef = useRef(null);
  const activePointerIdRef = useRef(null);
  const grainRef = useRef(null);

  useEffect(() => {
    grainRef.current = makeGrainCanvas(width, height);
  }, [width, height]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    shapes.forEach((shape) => {
      if (shape.color) {
        ctx.fillStyle = shape.color;
        ctx.fill(shape.path);
        ctx.strokeStyle = "rgba(0,0,0,0.18)";
        ctx.lineWidth = 1;
        ctx.stroke(shape.path);
      } else {
        ctx.fillStyle = "#ffffff";
        ctx.fill(shape.path);
        ctx.strokeStyle = "rgba(60,50,40,0.22)";
        ctx.lineWidth = 1;
        ctx.stroke(shape.path);
      }
    });

    strokes.forEach((stroke) => {
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
    });
    if (textureOn && grainRef.current) {
      ctx.save();
      ctx.globalAlpha = 0.35;
      ctx.globalCompositeOperation = "overlay";
      ctx.drawImage(grainRef.current, 0, 0);
      ctx.restore();
    }
  }, [shapes, strokes, bgColor, textureOn, width, height]);

  function getPos(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (width / rect.width),
      y: (e.clientY - rect.top) * (height / rect.height),
    };
  }

  function handlePointerDown(e) {
    if (activePointerIdRef.current !== null) return;
    const pos = getPos(e);
    const ctx = canvasRef.current.getContext("2d");

    if (mode === "fill") {
      let hitId = null;
      for (let i = shapes.length - 1; i >= 0; i--) {
        if (ctx.isPointInPath(shapes[i].path, pos.x, pos.y)) {
          hitId = shapes[i].id;
          break;
        }
      }
      if (hitId !== null) {
        onShapeFill(hitId);
      }
    } else {
      activePointerIdRef.current = e.pointerId;
      canvasRef.current.setPointerCapture(e.pointerId);
      drawingRef.current = true;
      currentStrokeRef.current = {
        color: activeColor,
        width: brushSize,
        points: [pos],
      };
    }
  }
  function handlePointerMove(e) {
    if (
      mode !== "draw" ||
      !drawingRef.current ||
      e.pointerId !== activePointerIdRef.current
    )
      return;
    const pos = getPos(e);
    currentStrokeRef.current.points.push(pos);
    const ctx = canvasRef.current.getContext("2d");
    ctx.strokeStyle = currentStrokeRef.current.color;
    ctx.lineWidth = currentStrokeRef.current.width;
    const points = currentStrokeRef.current.points;
    if (points.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(points[points.length - 2].x, points[points.length - 2].y);
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.stroke();
  }

  function handlePointerUp(e) {
    if (e.pointerId !== activePointerIdRef.current) return;
    activePointerIdRef.current = null;
    if (!drawingRef.current) return;
    drawingRef.current = false;
    if (currentStrokeRef.current.points.length > 1) {
      onStrokeComplete(currentStrokeRef.current);
    }
    currentStrokeRef.current = null;
  }

  useImperativeHandle(ref, () => ({
    getDataURL: () => canvasRef.current.toDataURL("image/png"),
  }));

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="max-w-full max-h-full cursor-crosshair touch-none shadow-[0_4px_24px_rgba(60,45,30,0.18)] bg-white"
    />
  );
});

export default Canvas;
