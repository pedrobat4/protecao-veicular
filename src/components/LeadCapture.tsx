import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { buildWhatsappLink } from '../config'
import type { SimAnswers } from './Simulator'

const ease = [0.22, 1, 0.36, 1] as const

function maskPhone(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export default function LeadCapture({ simData }: { simData: SimAnswers }) {
  const [nome, setNome] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [cidade, setCidade] = useState('')
  const [sent, setSent] = useState(false)

  // prefill city from the simulation when available
  useEffect(() => {
    if (simData.cidade && !cidade) setCidade(simData.cidade)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simData.cidade])

  const phoneDigits = whatsapp.replace(/\D/g, '')
  const valid = nome.trim().length > 1 && phoneDigits.length >= 10 && cidade.trim().length > 1

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid) return

    const linhas = [
      'Olá! Fiz a consulta no portal e gostaria de receber minha análise personalizada de proteção veicular.',
      '',
      `*Nome:* ${nome.trim()}`,
      `*WhatsApp:* ${whatsapp}`,
      `*Cidade:* ${cidade.trim()}`,
    ]
    if (simData.veiculo) linhas.push(`*Veículo:* ${simData.veiculo}`)
    if (simData.ano) linhas.push(`*Ano:* ${simData.ano}`)
    if (simData.valor) linhas.push(`*Valor aproximado:* ${simData.valor}`)
    if (simData.protecao) linhas.push(`*Já possui proteção:* ${simData.protecao}`)

    setSent(true)
    window.open(buildWhatsappLink(linhas.join('\n')), '_blank', 'noopener')
  }

  return (
    <section id="lead" className="relative scroll-mt-20 py-16 md:py-24">
      <div className="container-px mx-auto max-w-5xl">
        <div className="grid items-stretch gap-6 md:grid-cols-[1fr_1.1fr]">
          {/* left — reassurance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease }}
            className="flex flex-col justify-between rounded-[var(--radius-card)] bg-[var(--color-navy)] p-8 text-white sm:p-10"
          >
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/55">
                Etapa final
              </p>
              <h2 className="mt-4 text-balance font-display text-[1.9rem] leading-[1.12] sm:text-[2.4rem]">
                Receba uma análise personalizada
              </h2>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/65">
                Um especialista entra em contato pelo WhatsApp com a estimativa
                feita para o seu veículo. Sem custo e sem compromisso.
              </p>
            </div>
            <ul className="mt-8 space-y-3">
              {['Análise gratuita e sem compromisso', 'Atendimento humano pelo WhatsApp', 'Seus dados não são compartilhados'].map(
                (t) => (
                  <li key={t} className="flex items-center gap-3 text-[14px] text-white/85">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/10">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="m5 12 4.5 4.5L19 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {t}
                  </li>
                ),
              )}
            </ul>
          </motion.div>

          {/* right — form / success */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease, delay: 0.08 }}
            className="rounded-[var(--radius-card)] border border-[var(--color-mist)] bg-white/90 p-8 shadow-[0_40px_90px_-45px_rgba(0,0,0,0.35)] glass sm:p-10"
          >
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-6 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-[#e8f6ee] text-[#1c8c4f]">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="m5 12 4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="mt-5 text-2xl text-[var(--color-ink)]">Tudo certo, {nome.split(' ')[0]}!</h3>
                <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-[var(--color-slate)]">
                  Abrimos o WhatsApp para você enviar a solicitação. Se não abriu,
                  toque no botão abaixo.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-[14px] font-semibold text-[var(--color-blue)] underline-offset-4 hover:underline"
                >
                  Revisar meus dados
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <Field label="Nome completo">
                  <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Como podemos te chamar?"
                    autoComplete="name"
                    className="lead-input"
                  />
                </Field>
                <Field label="WhatsApp">
                  <input
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(maskPhone(e.target.value))}
                    placeholder="(00) 00000-0000"
                    inputMode="tel"
                    autoComplete="tel"
                    className="lead-input nums"
                  />
                </Field>
                <Field label="Cidade">
                  <input
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    placeholder="Sua cidade"
                    autoComplete="address-level2"
                    className="lead-input"
                  />
                </Field>

                <button
                  type="submit"
                  disabled={!valid}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[var(--color-blue)] px-6 py-4 text-base font-semibold text-white shadow-[0_18px_40px_-16px_rgba(224,32,40,0.9)] transition hover:bg-[var(--color-blue-bright)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.25.69-1.45 1.32-1.99 1.36-.53.05-.53.43-3.34-.7-2.81-1.13-4.6-3.96-4.74-4.15-.14-.18-1.13-1.5-1.13-2.86 0-1.36.71-2.03.97-2.31.25-.28.55-.35.73-.35.18 0 .37 0 .53.01.17.01.4-.06.62.48.25.6.84 2.06.91 2.21.07.14.12.31.02.49-.09.18-.14.3-.28.46-.14.16-.29.36-.42.48-.14.14-.28.28-.12.55.16.28.71 1.18 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.28.14.44.12.6-.07.18-.21.69-.8.87-1.08.18-.28.37-.23.62-.14.25.09 1.61.76 1.89.9.28.14.46.21.53.32.07.12.07.65-.18 1.34Z" />
                  </svg>
                  Receber Minha Análise
                </button>
                <p className="text-center text-[12px] leading-relaxed text-[var(--color-slate-light)]">
                  Ao enviar, você concorda em ser contatado pelo WhatsApp. Não
                  enviamos spam.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-semibold text-[var(--color-ink)]">
        {label}
      </span>
      {children}
    </label>
  )
}
