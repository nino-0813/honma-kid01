/**
 * Fixed “world” layer — light from above, atmospheric depth.
 * Sits under scroll content (z-1); never intercepts pointer events.
 */
export default function WorldAmbient() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(255,255,255,0.72)_0%,transparent_58%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(109,158,207,0.08)] via-transparent to-[rgba(251,135,109,0.06)]" />
      <div className="absolute inset-0 opacity-[0.35] mix-blend-soft-light bg-[radial-gradient(ellipse_80%_50%_at_80%_100%,rgba(255,255,255,0.4)_0%,transparent_55%)]" />
    </div>
  );
}
