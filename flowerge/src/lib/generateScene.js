import { flowerTypes } from "./flowers";

function makeRng(seed) {
  let s = seed >>> 0;
  return function () {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

let shapeIdCounter = 0;

export function generateScene(seed, width, height, flowerCount) {
  const rng = makeRng(seed);
  const rand = (min, max) => min + rng() * (max - min);
  const randInt = (min, max) => Math.floor(rand(min, max + 1));
  const pick = (arr) => arr[randInt(0, arr.length - 1)];

  const shapes = [];
  const minGap = Math.max(80, 170 - flowerCount * 8);
  const positions = [];

  for (let i = 0; i < flowerCount; i++) {
    let fx,
      fy,
      tries = 0;
    do {
      fx = rand(width * 0.12, width * 0.88);
      fy = rand(height * 0.1, height * 0.9);
      tries++;
    } while (
      tries < 12 &&
      positions.some((p) => Math.hypot(p.x - fx, p.y - fy) < minGap)
    );
    positions.push({ x: fx, y: fy });
    const S = rand(58, 105);
    const flowerFn = pick(flowerTypes);
    const petals = flowerFn(fx, fy, S, rand);

    petals.forEach((shape) => {
      shapes.push({
        ...shape,
        id: shapeIdCounter++,
        color: null,
      });
    });
  }
  return shapes;
}
