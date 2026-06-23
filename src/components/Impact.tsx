import { motion } from 'motion/react'
import type { ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

type Risk = { label: string; cost: string; icon: ReactNode }

const risks: Risk[] = [
  { label: 'Colisão', cost: 'Funilaria + peças', icon: <CollisionIcon /> },
  { label: 'Perda total', cost: 'Valor do veículo', icon: <TotalLossIcon /> },
  { label: 'Roubo', cost: 'Sem o carro e sem o valor', icon: <TheftIcon /> },
  { label: 'Guincho', cost: 'Remoção e diária', icon: <TowIcon /> },
  { label: 'Danos a terceiros', cost: 'Indenização a outros', icon: <ThirdPartyIcon /> },
]

export default function Impact() {
  return (
    <section id="impacto" className="relative py-16 md:py-24">
      <div className="container-px mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="max-w-3xl"
        >
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--color-blue)]">
            O que está em jogo
          </p>
          <h2 className="mt-4 text-balance text-[1.9rem] leading-[1.1] text-[var(--color-ink)] sm:text-4xl md:text-[2.7rem]">
            Você conseguiria absorver um prejuízo inesperado hoje?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-slate)]">
            O problema raramente é só o acidente. É o{' '}
            <span className="relative inline-block font-semibold text-[var(--color-ink)]">
              valor da conta
              <span className="absolute inset-x-0 -bottom-0.5 h-2 -z-10 bg-[var(--color-coral-soft)]" />
            </span>{' '}
            que vem logo depois — e que precisa sair do seu bolso na hora.
          </p>
        </motion.div>

        {/* risk grid */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          className="mt-12 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5"
        >
          {risks.map((r) => (
            <motion.li
              key={r.label}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
              }}
              className="group relative overflow-hidden rounded-2xl border border-[var(--color-mist)] bg-white/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-blue)]/30 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.3)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--color-sky)] text-[var(--color-navy)] transition-colors group-hover:bg-[var(--color-navy)] group-hover:text-white">
                {r.icon}
              </span>
              <p className="mt-4 text-[15px] font-semibold text-[var(--color-ink)]">
                {r.label}
              </p>
              <p className="mt-0.5 text-[12.5px] leading-tight text-[var(--color-slate-light)]">
                {r.cost}
              </p>
              <span className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-[var(--color-sky-soft)] opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.li>
          ))}
        </motion.ul>

        {/* the bill that comes after */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
          className="mt-6 grid items-center gap-6 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-mist)] bg-[var(--color-navy)] p-7 text-white sm:p-9 md:grid-cols-[1.4fr_1fr]"
        >
          <div>
            <p className="font-display text-xl leading-snug sm:text-2xl">
              “Eu nunca achei que fosse acontecer comigo.”
            </p>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/65">
              É a frase mais comum depois de um imprevisto. A diferença entre um
              susto e uma dívida é estar preparado{' '}
              <span className="text-white">antes</span>.
            </p>
          </div>
          <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-5 glass">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
              Conta que chega depois
            </p>
            <div className="mt-3 space-y-2.5">
              <BillRow label="Reparo de colisão" value="R$ 8.000+" />
              <BillRow label="Perda total (popular)" value="R$ 45.000+" />
              <BillRow label="Danos a terceiros" value="R$ 20.000+" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function BillRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-2 last:border-0 last:pb-0">
      <span className="text-[14px] text-white/75">{label}</span>
      <span className="nums text-[15px] font-semibold text-white">{value}</span>
    </div>
  )
}

/* ── icons ── */
function CollisionIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="m13 2-3 8h5l-3 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 14h2m12 0h2M5 19l1.5-1.5M19 19l-1.5-1.5M4 9l1.5 1M20 9l-1.5 1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}
function TotalLossIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 13h18l-1.5-4.5A2 2 0 0 0 17.6 7H6.4a2 2 0 0 0-1.9 1.5L3 13Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M3 13v4h18v-4M6.5 17v2M17.5 17v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m9 4 6 6m0-6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function TheftIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 12h9m-3-2v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function TowIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 16V9h6l3 3h6a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="7" cy="18" r="2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17" cy="18" r="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 9 7 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}
function ThirdPartyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="7" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 19c0-2.5 1.8-4 4-4s4 1.5 4 4M13 19c0-2.5 1.8-4 4-4s4 1.5 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}
