// Each surface uses the same grid, so a point has a stable destination when
// visitors switch disciplines. These are illustrations, not project telemetry.
export function surfacePoint(kind, u, v) {
  const angle = u * Math.PI * 2;
  if (kind === "ai") {
    const latitude = (0.04 + v * 0.92) * Math.PI;
    const r = 1.34 + 0.07 * Math.sin(angle * 5 + latitude * 4);
    return [r * Math.sin(latitude) * Math.cos(angle), r * Math.cos(latitude), r * Math.sin(latitude) * Math.sin(angle)];
  }
  if (kind === "product") {
    const tube = v * Math.PI * 2;
    const r = 1.02 + 0.43 * Math.cos(tube);
    return [r * Math.cos(angle), 0.43 * Math.sin(tube), r * Math.sin(angle)];
  }
  if (kind === "frontend") {
    return [(u - 0.5) * 3, Math.sin(u * Math.PI * 2 + v * Math.PI) * 0.38, (v - 0.5) * 2.65];
  }
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const edge = Math.max(Math.abs(c), Math.abs(s));
  return [c / edge, (v - 0.5) * 2, s / edge];
}

const COLORS = {
  systems: [170, 157, 255],
  ai: [113, 237, 194],
  product: [255, 164, 206],
  frontend: [117, 216, 255],
};

export function createSculpture(canvas, initial) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const rows = window.innerWidth < 600 ? 22 : 30;
  const columns = window.innerWidth < 600 ? 32 : 44;
  const points = Array.from({ length: rows * columns }, (_, i) => {
    const u = (i % columns) / (columns - 1);
    const v = Math.floor(i / columns) / (rows - 1);
    const target = surfacePoint(initial.variant, u, v);
    return { u, v, position: [...target], target, screen: [0, 0, 0] };
  });
  let state = { ...initial };
  let width = 1;
  let height = 1;
  let frame = 0;
  let last = 0;
  let time = 0;
  let yaw = 0.58;
  let pitch = -0.32;
  let pointerX = 0;
  let pointerY = 0;
  let orbitX = 0;
  let orbitY = 0;
  let drag = null;
  let burst = 0;
  let entrance = initial.paused ? 1 : 0;
  let visible = true;
  let destroyed = false;
  let color = [...COLORS[initial.variant]];

  function draw(delta = 0) {
    const moving = !state.paused;
    const step = moving ? Math.min(delta, 40) / 16.667 : 0;
    time += step * 0.007;
    entrance = Math.min(1, entrance + step * 0.017);
    burst *= Math.pow(0.94, step);
    if (moving && !drag) yaw += step * 0.0025;
    orbitX += (pointerX - orbitX) * 0.07;
    orbitY += (pointerY - orbitY) * 0.07;
    const rotation = yaw + (moving ? orbitX * 0.25 : 0);
    const tilt = pitch + (moving ? orbitY * 0.16 : 0);
    const cy = Math.cos(rotation), sy = Math.sin(rotation);
    const cx = Math.cos(tilt), sx = Math.sin(tilt);
    const scale = Math.min(width * 0.28, height * 0.27);
    const targetColor = COLORS[state.variant];
    color = color.map((value, i) => moving ? value + (targetColor[i] - value) * 0.055 : targetColor[i]);
    const rgb = color.map(Math.round).join(",");
    ctx.clearRect(0, 0, width, height);

    const glow = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, scale * 1.9);
    glow.addColorStop(0, `rgba(${rgb},0.15)`);
    glow.addColorStop(1, `rgba(${rgb},0)`);
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      p.position = p.position.map((value, axis) => moving ? value + (p.target[axis] - value) * Math.min(1, step * 0.065) : p.target[axis]);
      const spread = (1 - entrance) ** 3 * 0.65 + burst;
      const [x, y, z] = p.position.map((value, axis) => value + Math.sin(i * 1.73 + axis * 7.1) * spread);
      const rx = x * cy - z * sy;
      const rz = x * sy + z * cy;
      const ry = y * cx - rz * sx;
      const depth = y * sx + rz * cx;
      const perspective = 4.8 / (4.8 + depth);
      p.screen = [width / 2 + rx * scale * perspective, height / 2 + ry * scale * perspective, depth];
    }

    // Batch wire segments by depth rather than changing canvas state per edge.
    for (let layer = 0; layer < 3; layer++) {
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const p = points[i].screen;
        if (Math.min(2, Math.max(0, Math.floor((p[2] + 2) / 1.34))) !== layer) continue;
        if (i % columns < columns - 1) {
          const q = points[i + 1].screen;
          ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]);
        }
        if (i + columns < points.length && i % 2 === 0) {
          const q = points[i + columns].screen;
          ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]);
        }
      }
      ctx.strokeStyle = `rgba(${rgb},${[0.4, 0.2, 0.07][layer] * (1 - Math.min(burst, 0.6))})`;
      ctx.lineWidth = 0.65;
      ctx.stroke();
    }

    for (let i = 0; i < points.length; i++) {
      const [x, y, depth] = points[i].screen;
      const front = (2 - depth) / 4;
      const highlight = Math.sin(i * 0.37 - time * 2) > 0.975;
      ctx.fillStyle = highlight ? `rgba(245,242,255,${0.5 + front * 0.4})` : `rgba(${rgb},${0.25 + front * 0.65})`;
      ctx.beginPath();
      ctx.arc(x, y, (highlight ? 1.65 : 0.9) + front * 0.55, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function tick(now) {
    frame = 0;
    if (destroyed || !visible || document.hidden) return;
    draw(last ? now - last : 16.667);
    last = now;
    if (!state.paused) frame = requestAnimationFrame(tick);
  }

  function schedule() {
    if (!frame && !destroyed && visible && !document.hidden) frame = requestAnimationFrame(tick);
  }

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    width = Math.max(1, bounds.width);
    height = Math.max(1, bounds.height);
    const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    schedule();
  }

  function onMove(event) {
    if (state.paused) return;
    const bounds = canvas.getBoundingClientRect();
    pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
    pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;
    if (drag) {
      yaw += (event.clientX - drag.x) * 0.006;
      pitch = Math.max(-1.1, Math.min(1.1, pitch + (event.clientY - drag.y) * 0.004));
      drag.distance += Math.abs(event.clientX - drag.x) + Math.abs(event.clientY - drag.y);
      drag.x = event.clientX; drag.y = event.clientY;
    }
  }
  function onDown(event) {
    if (state.paused) return;
    drag = { x: event.clientX, y: event.clientY, distance: 0 };
    canvas.setPointerCapture(event.pointerId);
  }
  function onUp() {
    if (drag && drag.distance < 6 && !state.paused) burst = 0.9;
    drag = null;
  }
  function onCancel() { drag = null; }
  function onLeave() { pointerX = 0; pointerY = 0; }
  function visibilityChanged() {
    cancelAnimationFrame(frame); frame = 0; last = 0;
    if (!document.hidden) schedule();
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    cancelAnimationFrame(frame); frame = 0; last = 0;
    if (visible) schedule();
  });
  intersectionObserver.observe(canvas);
  const events = { pointermove: onMove, pointerdown: onDown, pointerup: onUp, pointercancel: onCancel, pointerleave: onLeave };
  for (const [name, handler] of Object.entries(events)) canvas.addEventListener(name, handler);
  document.addEventListener("visibilitychange", visibilityChanged);
  resize();

  return {
    update(next) {
      if (next.variant !== state.variant) {
        for (const p of points) p.target = surfacePoint(next.variant, p.u, p.v);
      }
      state = { ...state, ...next };
      if (state.paused) { entrance = 1; burst = 0; }
      cancelAnimationFrame(frame); frame = 0; last = 0;
      schedule();
    },
    scatter() { if (!state.paused) { burst = 0.9; schedule(); } },
    rotate() { yaw += Math.PI / 4; schedule(); },
    destroy() {
      destroyed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      for (const [name, handler] of Object.entries(events)) canvas.removeEventListener(name, handler);
      document.removeEventListener("visibilitychange", visibilityChanged);
    },
  };
}
