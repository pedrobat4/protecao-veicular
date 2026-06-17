# Painel da Proteção Veicular

Landing page com aparência de **portal informativo independente** sobre proteção
veicular. O objetivo é captar leads no Google, levar o visitante a refletir sobre
o impacto financeiro de um acidente e, ao final, oferecer uma análise
personalizada via WhatsApp.

## Stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS v4
- Motion (animações)

## Estrutura da página (componentes)

| Seção | Componente |
| --- | --- |
| Banner principal | `src/components/Hero.tsx` |
| Seção de impacto | `src/components/Impact.tsx` |
| Simulação/pesquisa (com barra de progresso) | `src/components/Simulator.tsx` |
| Captura de lead | `src/components/LeadCapture.tsx` |
| Fechamento | `src/components/Closing.tsx` |
| Cabeçalho / rodapé / atmosfera | `Header.tsx` / `Footer.tsx` / `Background.tsx` |

## Configuração importante

O número de WhatsApp que recebe os leads fica em **`src/config.ts`**:

```ts
export const WHATSAPP_NUMBER = '5538999999999' // 55 + DDD + número
```

Ao enviar o formulário, o site abre o WhatsApp já com nome, telefone, cidade e as
respostas da simulação preenchidas.

## Rodar localmente

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build      # gera /dist
npm run preview    # pré-visualiza o build
```

## Deploy na Netlify

O `netlify.toml` já está configurado:

- Build command: `npm run build`
- Publish directory: `dist`

Basta conectar o repositório na Netlify ou arrastar a pasta `dist`.
