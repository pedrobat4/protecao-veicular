import { SITE_NAME } from '../config'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-mist)] bg-white/60">
      <div className="container-px mx-auto max-w-6xl py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center">
            <img
              src="/inovar-logo.png"
              alt="Inovar Proteção Veicular"
              className="h-8 w-auto"
            />
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
