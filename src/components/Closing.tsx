import { motion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1] as const

export default function Closing() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="container-px mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
          className="relative overflow-hidden rounded-[28px] border border-[var(--color-mist)] bg-gradient-to-br from-[var(--color-ink)] via-[var(--color-navy)] to-[var(--color-navy-700)] px-7 py-14 text-center text-white sm:px-12 sm:py-20"
        >
          {/* glow */}
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full opacity-50 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(224,32,40,0.45), transparent 70%)',
            }}
          />
          <div className="grain pointer-events-none absolute inset-0 opacity-[0.06]" />

          {/* mascote Inovar — joinha */}
          <img
            src="/mascote/tigre-inovar-joinha.png"
            alt="Mascote da Inovar aprovando"
            loading="lazy"
            className="pointer-events-none absolute -bottom-2 right-1 hidden w-[180px] drop-shadow-[0_16px_30px_rgba(0,0,0,0.5)] lg:block xl:w-[215px]"
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-coral)]" />
              Antes que seja tarde
            </span>

            <h2 className="mx-auto mt-6 max-w-2xl text-balance font-display text-[2rem] leading-[1.1] sm:text-[3rem]">
              Imprevistos custam caro.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-white/70">
              Ninguém sai de casa esperando sofrer um acidente. Mas você pode se
              preparar antes que um imprevisto se transforme em um grande
              prejuízo financeiro.
            </p>

            <a
              href="#simulacao"
              className="group mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-[var(--color-navy)] shadow-[0_18px_50px_-12px_rgba(0,0,0,0.5)] transition hover:bg-[var(--color-sky)] active:scale-[0.98]"
            >
              Consultar Meu Veículo
              <svg className="transition-transform group-hover:translate-x-1" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
