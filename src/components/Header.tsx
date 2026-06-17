import { useEffect, useState } from 'react'

// Portal-style top bar. Intentionally understated — reads as an independent
// information panel, not a brand storefront.
export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass border-b border-[var(--color-mist)]/80 bg-white/75'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-px mx-auto flex h-16 max-w-6xl items-center justify-between">
        <a href="#topo" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--color-navy)] shadow-sm">
            <ShieldGlyph />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-bold tracking-tight text-[var(--color-ink)]">
              Painel da Proteção
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-slate-light)]">
              Consulta independente
            </span>
          </span>
        </a>

        <a
          href="#simulacao"
          className="rounded-full bg-[var(--color-blue)] px-4 py-2 text-[13px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(27,97,209,0.7)] transition hover:bg-[var(--color-blue-bright)] active:scale-[0.97] sm:px-5"
        >
          Fazer consulta
        </a>
      </div>
    </header>
  )
}

function ShieldGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2.5 4.5 5.3v6.2c0 4.6 3.1 8.4 7.5 9.9 4.4-1.5 7.5-5.3 7.5-9.9V5.3L12 2.5Z"
        stroke="white"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="m8.8 12.1 2.2 2.2 4.2-4.4"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
