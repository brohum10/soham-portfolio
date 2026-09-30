import { afterEach, describe, expect, it, vi } from "vitest";
import { createSculpture, surfacePoint } from "./sculpture";

afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe("particle sculpture", () => {
  it("keeps morph targets finite and bounded, including the grid seams", () => {
    for (const kind of ["systems", "ai", "product", "frontend"]) {
      for (let row = 0; row <= 30; row++) {
        for (let column = 0; column <= 44; column++) {
          const point = surfacePoint(kind, column / 44, row / 30);
          expect(point.every((coordinate) => Number.isFinite(coordinate) && Math.abs(coordinate) <= 1.5)).toBe(true);
        }
      }
      if (kind !== "frontend") {
        const start = surfacePoint(kind, 0, 0.4);
        const end = surfacePoint(kind, 1, 0.4);
        start.forEach((value, axis) => expect(value).toBeCloseTo(end[axis], 10));
      }
    }
  });

  it("stops drawing while paused, outside the viewport, and after teardown", () => {
    const frames = new Map();
    let frameId = 0;
    vi.stubGlobal("requestAnimationFrame", (callback) => { frames.set(++frameId, callback); return frameId; });
    vi.stubGlobal("cancelAnimationFrame", (id) => frames.delete(id));
    let visibility;
    const resizeDisconnect = vi.fn();
    const intersectionDisconnect = vi.fn();
    vi.stubGlobal("ResizeObserver", class { observe() {} disconnect() { resizeDisconnect(); } });
    vi.stubGlobal("IntersectionObserver", class {
      constructor(callback) { visibility = callback; }
      observe() {}
      disconnect() { intersectionDisconnect(); }
    });
    const context = { clearRect: vi.fn(), createRadialGradient: () => ({ addColorStop() {} }), fillRect() {}, setTransform() {}, beginPath() {}, moveTo() {}, lineTo() {}, stroke() {}, arc() {}, fill() {} };
    const canvas = document.createElement("canvas");
    vi.spyOn(canvas, "getContext").mockReturnValue(context);
    vi.spyOn(canvas, "getBoundingClientRect").mockReturnValue({ width: 600, height: 400 });
    const advance = () => {
      const pending = [...frames.values()]; frames.clear();
      pending.forEach((callback) => callback(100));
    };
    const scene = createSculpture(canvas, { variant: "systems", paused: true });
    advance();
    expect(context.clearRect).toHaveBeenCalledTimes(1);
    expect(frames.size).toBe(0);
    scene.update({ variant: "ai", paused: true });
    advance();
    expect(context.clearRect).toHaveBeenCalledTimes(2);
    expect(frames.size).toBe(0);
    scene.update({ paused: false });
    advance();
    expect(frames.size).toBe(1);
    visibility([{ isIntersecting: false }]);
    expect(frames.size).toBe(0);
    visibility([{ isIntersecting: true }]);
    expect(frames.size).toBe(1);
    scene.destroy();
    expect(frames.size).toBe(0);
    expect(resizeDisconnect).toHaveBeenCalledOnce();
    expect(intersectionDisconnect).toHaveBeenCalledOnce();
    canvas.dispatchEvent(new Event("pointerdown"));
    expect(frames.size).toBe(0);
  });
});
