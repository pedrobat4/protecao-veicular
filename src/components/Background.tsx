// Atmospheric background: soft red/charcoal radial glows, a faint blueprint grid,
// and a grain overlay for depth. Fixed behind all content.
export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base wash */}
      <div className="absolute inset-0 bg-[var(--color-paper)]" />

      {/* top-right cool glow */}
      <div
        className="absolute -right-40 -top-48 h-[520px] w-[520px] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at center, rgba(224,32,40,0.18), rgba(224,32,40,0) 70%)',
        }}
      />
      {/* left mid glow */}
      <div
        className="absolute -left-48 top-1/3 h-[460px] w-[460px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at center, rgba(20,20,20,0.14), rgba(20,20,20,0) 70%)',
        }}
      />

      {/* blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(20,20,20,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,20,20,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, black 35%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, black 35%, transparent 80%)',
        }}
      />

      {/* grain */}
      <div className="grain absolute inset-0 opacity-[0.04]" />
    </div>
  )
}
