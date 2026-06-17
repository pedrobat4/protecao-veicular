import { useState } from 'react'
import { motion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1] as const

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

export default function Hero() {
  const [imgOk, setImgOk] = useState(true)

  return (
    <section id="topo" className="relative pt-28 pb-16 sm:pt-32 md:pt-40 md:pb-24">
      <div className="container-px mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-10">
          {/* ── Copy column ── */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-mist)] bg-white/70 px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--color-slate)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-coral)]" />
              Portal independente de consulta
            </motion.span>

            <motion.h1
              variants={item}
              className="mt-6 text-balance text-[2.1rem] leading-[1.05] text-[var(--color-ink)] sm:text-5xl md:text-[3.4rem]"
            >
              O prejuízo de um acidente raramente avisa quando vai{' '}
              <span className="relative whitespace-nowrap text-[var(--color-navy)]">
                chegar
                <Underline />
              </span>
              .
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-[var(--color-slate)] sm:text-lg"
            >
              Uma colisão ou perda total pode gerar um custo de milhares de reais
              quando você menos espera. Descubra em{' '}
              <strong className="font-semibold text-[var(--color-ink)]">
                menos de 1 minuto
              </strong>{' '}
              uma estimativa para proteger seu veículo.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#simulacao"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-blue)] px-7 py-4 text-base font-semibold text-white shadow-[0_18px_40px_-14px_rgba(27,97,209,0.85)] transition hover:bg-[var(--color-blue-bright)] active:scale-[0.98]"
              >
                Fazer Consulta Gratuita
                <Arrow />
              </a>
              <span className="text-[13px] font-medium text-[var(--color-slate-light)]">
                Sem cadastro para começar · leva ~1 min
              </span>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[var(--color-mist)] pt-6"
            >
              <TrustStat value="4 em 10" label="motoristas não têm reserva p/ imprevistos" />
              <span className="hidden h-8 w-px bg-[var(--color-mist)] sm:block" />
              <TrustStat value="< 60s" label="para receber sua estimativa" />
            </motion.div>
          </motion.div>

          {/* ── Visual column ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.15 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-mist)] bg-[var(--color-navy)] shadow-[0_40px_80px_-30px_rgba(10,31,51,0.5)]">
              {/* photo (with graceful fallback to gradient) */}
              <div className="relative aspect-[4/5] w-full sm:aspect-[5/6]">
                {imgOk && (
                  <img
                    src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1100&q=70"
                    alt="Trânsito sob chuva — situação que transmite o risco de um imprevisto no veículo"
                    loading="eager"
                    onError={() => setImgOk(false)}
                    className="h-full w-full object-cover"
                  />
                )}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(10,31,51,0.25) 0%, rgba(10,31,51,0.55) 55%, rgba(10,31,51,0.92) 100%)',
                  }}
                />
                {/* floating cost tag */}
                <div className="absolute left-4 top-4 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white glass">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
                    Custo médio de uma colisão
                  </p>
                  <p className="nums mt-1 font-display text-2xl font-semibold">
                    R$ 8.000<span className="text-white/60">–</span>25.000
                  </p>
                </div>
              </div>

              {/* bottom caption strip */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[15px] leading-snug text-white/90">
                  Quando o imprevisto chega, a conta chega junto.
                </p>
                <p className="mt-1 text-[13px] text-white/55">
                  Veja o que cabe no seu bolso antes que ele aconteça.
                </p>
              </div>
            </div>

            {/* decorative offset frame */}
            <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-[var(--radius-card)] border border-[var(--color-blue)]/25" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TrustStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2.5">
      <span className="nums font-display text-xl font-semibold text-[var(--color-navy)]">
        {value}
      </span>
      <span className="max-w-[12rem] text-[12.5px] leading-tight text-[var(--color-slate)]">
        {label}
      </span>
    </div>
  )
}

function Underline() {
  return (
    <svg
      className="absolute -bottom-2 left-0 w-full"
      height="10"
      viewBox="0 0 200 10"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M2 7.5C40 3 100 2.5 198 6"
        stroke="var(--color-coral)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Arrow() {
  return (
    <svg
      className="transition-transform duration-300 group-hover:translate-x-1"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
