import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { featuredLenses } from "./data";
import { createSculpture } from "./sculpture";

function subscribeMotion(callback) {
  const query = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  query?.addEventListener("change", callback);
  return () => query?.removeEventListener("change", callback);
}
const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? true;
const surfaceNames = { systems: "Structure", ai: "Intelligence", product: "Connection", frontend: "Expression" };

export default function LivingSystem({ activeLens, onSelect }) {
  const canvasRef = useRef(null);
  const renderer = useRef(null);
  const prefersReducedMotion = useSyncExternalStore(subscribeMotion, reducedMotion, () => true);
  const [motionOverride, setMotionOverride] = useState(null);
  const paused = motionOverride ?? prefersReducedMotion;
  const [hasCanvas, setHasCanvas] = useState(false);

  useEffect(() => {
    const scene = createSculpture(canvasRef.current, { variant: "systems", paused: reducedMotion() });
    renderer.current = scene;
    // The fallback stays behind the canvas until the first frame can be drawn.
    const frame = requestAnimationFrame(() => setHasCanvas(Boolean(scene)));
    return () => { cancelAnimationFrame(frame); scene?.destroy(); renderer.current = null; };
  }, []);

  useEffect(() => {
    renderer.current?.update({ variant: activeLens.id, paused });
  }, [activeLens.id, paused]);

  return (
    <div className={`living-system living-system--${activeLens.id}`} data-paused={paused}>
      <div className="living-system__topline">
        <span><i aria-hidden="true" /> A living system</span>
        <span>{activeLens.number} / 04</span>
      </div>
      <div className="living-system__stage">
        {!hasCanvas && <div className="living-system__fallback" aria-hidden="true"><span /><span /><span /></div>}
        <canvas ref={canvasRef} aria-hidden="true" className="living-system__canvas" />
        <span className="living-system__axis living-system__axis--top" aria-hidden="true">+ Y</span>
        <span className="living-system__axis living-system__axis--bottom" aria-hidden="true">X +</span>
        <div className="living-system__caption" aria-live="polite">
          <span>{activeLens.number} — {activeLens.label}</span>
          <strong key={activeLens.id}>{surfaceNames[activeLens.id]}<span>.</span></strong>
        </div>
      </div>
      <div className="living-system__tools">
        <span>{paused ? "A still moment." : "Drag to rotate. Tap to scatter."}</span>
        <div>
          <button type="button" onClick={() => renderer.current?.rotate()} aria-label="Rotate sculpture">↻ <span>Rotate</span></button>
          <button type="button" onClick={() => renderer.current?.scatter()} disabled={paused} aria-label="Scatter sculpture">✳ <span>Scatter</span></button>
          <button type="button" onClick={() => setMotionOverride(!paused)} aria-pressed={paused} aria-label="Pause motion">{paused ? "▷" : "Ⅱ"}<span>{paused ? "Resume" : "Pause"}</span></button>
        </div>
      </div>
      <div className="living-system__choices" role="group" aria-label="Interactive project map">
        {featuredLenses.map((lens) => (
          <button key={lens.id} type="button" aria-pressed={activeLens.id === lens.id} aria-label={`Explore ${lens.label} projects`} onClick={() => onSelect(lens.id)}>
            <span>{lens.number}</span>{lens.label}<span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <a className="living-system__project" href="#featured-work"><span aria-live="polite">{activeLens.projectTitle}</span><span>Inside the build ↘</span></a>
    </div>
  );
}
