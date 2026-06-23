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
        <a href="#topo" className="flex items-center" aria-label="Inovar Proteção Veicular">
          <img
            src="/inovar-logo.png"
            alt="Inovar Proteção Veicular"
            className="h-8 w-auto sm:h-9"
          />
        </a>

        <a
          href="#simulacao"
          className="rounded-full bg-[var(--color-blue)] px-4 py-2 text-[13px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(224,32,40,0.7)] transition hover:bg-[var(--color-blue-bright)] active:scale-[0.97] sm:px-5"
        >
          Fazer consulta
        </a>
      </div>
    </header>
  )
}
