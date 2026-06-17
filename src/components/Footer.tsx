import { SITE_NAME } from '../config'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-mist)] bg-white/60">
      <div className="container-px mx-auto max-w-6xl py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--color-navy)]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 2.5 4.5 5.3v6.2c0 4.6 3.1 8.4 7.5 9.9 4.4-1.5 7.5-5.3 7.5-9.9V5.3L12 2.5Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[14px] font-bold text-[var(--color-ink)]">{SITE_NAME}</span>
          </div>
          <p className="max-w-md text-[12.5px] leading-relaxed text-[var(--color-slate-light)]">
            Portal informativo independente sobre proteção veicular. As
            estimativas têm caráter educativo e não constituem proposta de
            seguro ou contrato.
          </p>
        </div>
        <div className="mt-8 border-t border-[var(--color-mist)] pt-6 text-[12px] text-[var(--color-slate-light)]">
          © {new Date().getFullYear()} {SITE_NAME}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
