// ───────────────────────────────────────────────────────────
// Ajuste aqui o número de WhatsApp que vai receber os leads.
// Formato internacional, somente dígitos: 55 + DDD + número.
// Ex.: 5538999999999
// ───────────────────────────────────────────────────────────
export const WHATSAPP_NUMBER = '5538999999999'

export const SITE_NAME = 'Painel da Proteção Veicular'

export function buildWhatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
