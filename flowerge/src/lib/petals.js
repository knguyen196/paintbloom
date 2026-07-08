function smoothClosed(pts) {
  const n = pts.length;
  const path = new Path2D();
  const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

  let m = mid(pts[n - 1], pts[0]);
  path.moveTo(m.x, m.y);

  for (let i = 0; i < n; i++) {
    const next = pts[(i + 1) % n];
    const m2 = mid(pts[i], next);
    path.quadraticCurveTo(pts[i].x, pts[i].y, m2.x, m2.y);
  }

  path.closePath();
  return path;
}

function place(px, py, cx, cy, angle) {
  return {
    x: cx + (px * Math.cos(angle) - py * Math.sin(angle)),
    y: cy + (px * Math.sin(angle) + py * Math.cos(angle)),
  };
}

export function blobPetal(cx, cy, rx, ry, angle, irregularity, rand) {
  const n = Math.floor(rand(7, 11));
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * 2 * Math.PI;
    const jitter = 1 + rand(-irregularity, irregularity);
    const localX = Math.cos(a) * rx * jitter;
    const localY = Math.sin(a) * ry * jitter;
    pts.push(place(localX, localY, cx, cy, angle));
  }
  return {
    path: smoothClosed(pts),
    cx,
    cy,
    r: Math.max(rx, ry) * (1 + irregularity),
    angle,
  };
}

export function pointedPetal(bx, by, length, width, angle, rand) {
  const pts = [
    place(0, 0, bx, by, angle),
    place(length * 0.35, width * rand(0.45, 0.6), bx, by, angle),
    place(length * 0.75, width * rand(0.3, 0.45), bx, by, angle),
    place(
      length * rand(0.98, 1.08),
      rand(-width * 0.06, width * 0.06),
      bx,
      by,
      angle,
    ),
    place(length * 0.75, -width * rand(0.3, 0.45), bx, by, angle),
    place(length * 0.35, -width * rand(0.45, 0.6), bx, by, angle),
  ];
  const cx = bx + Math.cos(angle) * length * 0.5;
  const cy = by + Math.sin(angle) * length * 0.5;
  return { path: smoothClosed(pts), cx, cy, r: length * 0.6, angle };
}

export function strapPetal(bx, by, length, width, angle, rand) {
  const pts = [
    place(0, width * 0.25, bx, by, angle),
    place(length * 0.4, width * rand(0.4, 0.55), bx, by, angle),
    place(length * 0.9, width * rand(0.35, 0.5), bx, by, angle),
    place(length * 1.05, 0, bx, by, angle),
    place(length * 0.9, -width * rand(0.35, 0.5), bx, by, angle),
    place(length * 0.4, -width * rand(0.4, 0.55), bx, by, angle),
    place(0, -width * 0.25, bx, by, angle),
  ];
  const cx = bx + Math.cos(angle) * length * 0.5;
  const cy = by + Math.sin(angle) * length * 0.5;
  return { path: smoothClosed(pts), cx, cy, r: length * 0.6, angle };
}

export function cupPetal(bx, by, length, width, angle, rand) {
  const pts = [
    place(0, width * 0.2, bx, by, angle),
    place(length * 0.5, width * rand(0.55, 0.7), bx, by, angle),
    place(length * 0.95, width * rand(0.35, 0.5), bx, by, angle),
    place(length * rand(0.85, 0.95), 0, bx, by, angle),
    place(length * 0.95, -width * rand(0.35, 0.5), bx, by, angle),
    place(length * 0.5, -width * rand(0.55, 0.7), bx, by, angle),
    place(0, -width * 0.2, bx, by, angle),
  ];
  const cx = bx + Math.cos(angle) * length * 0.5;
  const cy = by + Math.sin(angle) * length * 0.5;
  return { path: smoothClosed(pts), cx, cy, r: length * 0.7, angle };
}
