export function makeGrainCanvas(width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;
  for (let y = 0; y < height; y++) {
    let prev = 128;
    for (let x = 0; x < width; x++) {
      const noise = 128 + (Math.random() - 0.5) * 90;
      const value = prev * 0.65 + noise * 0.35;
      prev = value;

      const i = (y * width + x) * 4;
      data[i] = value;
      data[i + 1] = value;
      data[i + 2] = value;
      data[i + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas;
}
