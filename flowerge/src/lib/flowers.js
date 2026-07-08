import { blobPetal, pointedPetal, strapPetal, cupPetal } from "./petals";

function centerCluster(fx, fy, S, count, rand) {
  const shapes = [];
  for (let c = 0; c < count; c++) {
    const ca = rand(0, Math.PI * 2);
    const cd = rand(0, S * 0.16);
    const cx = fx + Math.cos(ca) * cd;
    const cy = fy + Math.sin(ca) * cd;
    shapes.push(
      blobPetal(
        cx,
        cy,
        S * rand(0.13, 0.2),
        S * rand(0.1, 0.16),
        rand(0, Math.PI),
        0.3,
        rand,
      ),
    );
  }
  return shapes;
}

export function peony(fx, fy, S, rand) {
  const shapes = [];
  const rings = Math.floor(rand(2, 4));

  for (let ring = 0; ring < rings; ring++) {
    const t = ring / rings;
    const count = Math.floor(rand(6, 9)) - ring;
    const dist = S * (0.75 - t * 0.35);
    const size = S * (0.8 - t * 0.3);
    const rot = rand(0, Math.PI * 2);

    for (let p = 0; p < count; p++) {
      const a = rot + (p / count) * Math.PI * 2 + rand(-0.1, 0.1);
      const px = fx + Math.cos(a) * dist;
      const py = fy + Math.sin(a) * dist;
      shapes.push(
        blobPetal(
          px,
          py,
          size * rand(0.6, 0.8),
          size * rand(0.4, 0.55),
          a,
          0.28,
          rand,
        ),
      );
    }
  }

  shapes.push(...centerCluster(fx, fy, S, Math.floor(rand(3, 6)), rand));
  return shapes;
}

export function daisy(fx, fy, S, rand) {
  const shapes = [];
  const count = Math.floor(rand(10, 17));
  const rot = rand(0, Math.PI * 2);

  for (let p = 0; p < count; p++) {
    const a = rot + (p / count) * Math.PI * 2 + rand(-0.06, 0.06);
    const px = fx + Math.cos(a) * S * 0.18;
    const py = fy + Math.sin(a) * S * 0.18;
    shapes.push(
      strapPetal(px, py, S * rand(0.85, 1.05), S * rand(0.22, 0.3), a, rand),
    );
  }

  shapes.push(...centerCluster(fx, fy, S * 0.9, Math.floor(rand(2, 5)), rand));
  return shapes;
}

export function aster(fx, fy, S, rand) {
  const shapes = [];
  const rot = rand(0, Math.PI * 2);

  const outer = Math.floor(rand(9, 14));
  for (let p = 0; p < outer; p++) {
    const a = rot + (p / outer) * Math.PI * 2 + rand(-0.08, 0.08);
    const px = fx + Math.cos(a) * S * 0.15;
    const py = fy + Math.sin(a) * S * 0.15;
    shapes.push(
      pointedPetal(px, py, S * rand(0.9, 1.1), S * rand(0.3, 0.4), a, rand),
    );
  }

  const inner = Math.floor(rand(6, 10));
  for (let p = 0; p < inner; p++) {
    const a = rot + 0.3 + (p / inner) * Math.PI * 2 + rand(-0.08, 0.08);
    const px = fx + Math.cos(a) * S * 0.1;
    const py = fy + Math.sin(a) * S * 0.1;
    shapes.push(
      pointedPetal(px, py, S * rand(0.55, 0.7), S * rand(0.25, 0.35), a, rand),
    );
  }

  shapes.push(...centerCluster(fx, fy, S * 0.8, Math.floor(rand(2, 4)), rand));
  return shapes;
}

export function poppy(fx, fy, S, rand) {
  const shapes = [];
  const count = Math.floor(rand(4, 6));
  const rot = rand(0, Math.PI * 2);

  for (let p = 0; p < count; p++) {
    const a = rot + (p / count) * Math.PI * 2 + rand(-0.12, 0.12);
    const px = fx + Math.cos(a) * S * 0.1;
    const py = fy + Math.sin(a) * S * 0.1;
    shapes.push(
      cupPetal(px, py, S * rand(0.95, 1.15), S * rand(0.75, 0.95), a, rand),
    );
  }

  shapes.push(...centerCluster(fx, fy, S * 0.7, Math.floor(rand(4, 7)), rand));
  return shapes;
}

export function tulipCluster(fx, fy, S, rand) {
  const shapes = [];
  const baseAngle = rand(0, Math.PI * 2);
  const spread = rand(0.5, 0.8);

  for (let p = -1; p <= 1; p++) {
    const a = baseAngle + p * spread * 0.5 + rand(-0.06, 0.06);
    shapes.push(
      cupPetal(fx, fy, S * rand(1.0, 1.25), S * rand(0.5, 0.65), a, rand),
    );
  }

  for (let i = 0; i < 2; i++) {
    const a = baseAngle + Math.PI + rand(-0.4, 0.4);
    const px = fx + Math.cos(a) * S * 0.2;
    const py = fy + Math.sin(a) * S * 0.2;
    shapes.push(blobPetal(px, py, S * 0.28, S * 0.2, a, 0.3, rand));
  }

  return shapes;
}

export const flowerTypes = [peony, daisy, aster, poppy, tulipCluster];
