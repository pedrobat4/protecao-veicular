import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1] as const

export type SimAnswers = {
  veiculo?: string
  ano?: string
  valor?: string
  cidade?: string
  protecao?: string
}

type Step = {
  key: keyof SimAnswers
  question: string
  hint: string
} & ({ type: 'choice'; options: string[] } | { type: 'text'; placeholder: string })

const steps: Step[] = [
  {
    key: 'veiculo',
    type: 'choice',
    question: 'Qual o tipo do seu veículo?',
    hint: 'Selecione a opção mais próxima.',
    options: ['Carro', 'Moto', 'SUV / Caminhonete', 'Caminhão'],
  },
  {
    key: 'ano',
    type: 'choice',
    question: 'Qual o ano do veículo?',
    hint: 'A idade do veículo influencia na estimativa.',
    options: ['2024 ou mais novo', '2018 a 2023', '2012 a 2017', 'Antes de 2012'],
  },
  {
    key: 'valor',
    type: 'choice',
    question: 'Qual o valor aproximado?',
    hint: 'Pode ser uma estimativa de mercado.',
    options: ['Até R$ 30 mil', 'R$ 30 a 60 mil', 'R$ 60 a 100 mil', 'Acima de R$ 100 mil'],
  },
  {
    key: 'cidade',
    type: 'text',
    question: 'Em qual cidade você dirige?',
    hint: 'Usamos para considerar o contexto da sua região.',
    placeholder: 'Ex.: Montes Claros - MG',
  },
  {
    key: 'protecao',
    type: 'choice',
    question: 'Você já possui algum tipo de proteção?',
    hint: 'Seguro, associação ou proteção veicular.',
    options: ['Sim, já tenho', 'Não tenho', 'Está vencendo'],
  },
]

export default function Simulator({
  onComplete,
}: {
  onComplete: (answers: SimAnswers) => void
}) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<SimAnswers>({})
  const [draft, setDraft] = useState('')
  const [done, setDone] = useState(false)

  const total = steps.length
  const progress = done ? 100 : Math.round((current / total) * 100)
  const step = steps[current]

  const answeredCount = useMemo(
    () => Object.values(answers).filter(Boolean).length,
    [answers],
  )

  function commit(value: string) {
    const next = { ...answers, [step.key]: value }
    setAnswers(next)
    setDraft('')
    if (current < total - 1) {
      setCurrent((c) => c + 1)
    } else {
      setDone(true)
      onComplete(next)
    }
  }

  function back() {
    if (done) {
      setDone(false)
      return
    }
    if (current > 0) setCurrent((c) => c - 1)
  }

  return (
    <section id="simulacao" className="relative scroll-mt-20 py-16 md:py-24">
      <div className="container-px mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="mb-8 text-center"
        >
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--color-blue)]">
            Simulação gratuita
          </p>
          <h2 className="mt-4 text-balance text-[1.9rem] leading-[1.1] text-[var(--color-ink)] sm:text-4xl">
            Responda 5 perguntas rápidas
          </h2>
          <p className="mt-3 text-[15px] text-[var(--color-slate)]">
            Nenhum dado de contato é pedido nesta etapa.
          </p>
        </motion.div>

        {/* the panel */}
        <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-mist)] bg-white/85 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.35)] glass">
          {/* progress bar */}
          <div className="border-b border-[var(--color-mist)] px-6 pt-5 pb-4 sm:px-8">
            <div className="flex items-center justify-between text-[12px] font-semibold text-[var(--color-slate)]">
              <span className="uppercase tracking-[0.14em]">
                {done ? 'Concluído' : `Etapa ${current + 1} de ${total}`}
              </span>
              <span className="nums text-[var(--color-blue)]">{progress}%</span>
            </div>
            <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-[var(--color-mist)]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[var(--color-blue)] to-[var(--color-blue-bright)]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease }}
              />
            </div>
          </div>

          {/* body */}
          <div className="min-h-[330px] px-6 py-7 sm:px-8 sm:py-9">
            <AnimatePresence mode="wait">
              {done ? (
                <Result key="result" answers={answers} />
              ) : (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -28 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <h3 className="text-balance text-2xl leading-tight text-[var(--color-ink)] sm:text-[1.7rem]">
                    {step.question}
                  </h3>
                  <p className="mt-2 text-[14px] text-[var(--color-slate-light)]">
                    {step.hint}
                  </p>

                  {step.type === 'choice' ? (
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {step.options.map((opt) => {
                        const active = answers[step.key] === opt
                        return (
                          <button
                            key={opt}
                            onClick={() => commit(opt)}
                            className={`group flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left text-[15px] font-medium transition-all active:scale-[0.98] ${
                              active
                                ? 'border-[var(--color-blue)] bg-[var(--color-sky)] text-[var(--color-navy)]'
                                : 'border-[var(--color-mist)] bg-white text-[var(--color-ink)] hover:border-[var(--color-blue)]/40 hover:bg-[var(--color-sky-soft)]'
                            }`}
                          >
                            {opt}
                            <span className="grid h-6 w-6 place-items-center rounded-full border border-[var(--color-mist)] text-[var(--color-slate-light)] transition group-hover:border-[var(--color-blue)] group-hover:text-[var(--color-blue)]">
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                                <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        if (draft.trim().length > 1) commit(draft.trim())
                      }}
                      className="mt-7"
                    >
                      <input
                        autoFocus
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder={step.placeholder}
                        className="w-full rounded-2xl border border-[var(--color-mist)] bg-white px-5 py-4 text-[15px] text-[var(--color-ink)] outline-none transition placeholder:text-[var(--color-slate-light)] focus:border-[var(--color-blue)] focus:ring-4 focus:ring-[var(--color-blue)]/12"
                      />
                      <button
                        type="submit"
                        disabled={draft.trim().length < 2}
                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-blue)] px-6 py-4 text-[15px] font-semibold text-white transition hover:bg-[var(--color-blue-bright)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                      >
                        Continuar
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* footer nav */}
          <div className="flex items-center justify-between border-t border-[var(--color-mist)] px-6 py-4 sm:px-8">
            <button
              onClick={back}
              disabled={current === 0 && !done}
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--color-slate)] transition hover:text-[var(--color-ink)] disabled:opacity-30"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M19 12H5m6 6-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Voltar
            </button>
            <div className="flex items-center gap-1.5">
              {steps.map((s, i) => (
                <span
                  key={s.key}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    (done || i < current)
                      ? 'w-5 bg-[var(--color-blue)]'
                      : i === current
                        ? 'w-5 bg-[var(--color-blue)]/40'
                        : 'w-1.5 bg-[var(--color-mist)]'
                  }`}
                />
              ))}
            </div>
            <span className="nums text-[12px] font-medium text-[var(--color-slate-light)]">
              {answeredCount}/{total}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Result({ answers }: { answers: SimAnswers }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="text-center"
    >
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease }}
        className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[var(--color-sky)] text-[var(--color-navy)]"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 2.5 4.5 5.3v6.2c0 4.6 3.1 8.4 7.5 9.9 4.4-1.5 7.5-5.3 7.5-9.9V5.3L12 2.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="m8.8 12.1 2.2 2.2 4.2-4.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.span>

      <h3 className="mx-auto mt-6 max-w-md text-balance text-[1.5rem] leading-snug text-[var(--color-ink)] sm:text-[1.75rem]">
        Existem alternativas de proteção que podem custar{' '}
        <span className="text-[var(--color-blue)]">menos do que muitos motoristas imaginam</span>.
      </h3>
      <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-[var(--color-slate)]">
        Com base nas suas respostas, preparamos uma análise personalizada. Veja
        sua estimativa sem compromisso.
      </p>

      {/* recap chips */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {[answers.veiculo, answers.ano, answers.valor, answers.cidade]
          .filter(Boolean)
          .map((v) => (
            <span
              key={v}
              className="rounded-full border border-[var(--color-mist)] bg-white px-3 py-1.5 text-[12.5px] font-medium text-[var(--color-slate)]"
            >
              {v}
            </span>
          ))}
      </div>

      <a
        href="#lead"
        className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-blue)] px-8 py-4 text-base font-semibold text-white shadow-[0_18px_40px_-14px_rgba(224,32,40,0.85)] transition hover:bg-[var(--color-blue-bright)] active:scale-[0.98]"
      >
        Ver minha análise personalizada
        <svg className="transition-transform group-hover:translate-x-1" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </motion.div>
  )
}
