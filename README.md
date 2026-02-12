# Meu Portfólio

Este é o seu portfólio dinâmico, conectado ao Notion. Quando você adiciona um projeto no Notion, ele aparece aqui automaticamente.

## Tecnologias

- **Next.js 15+** (App Router)
- **TypeScript**
- **Vanilla CSS** (Design Premium com animações e Glassmorphism)
- **Notion API** (Para gerenciar o conteúdo)

## Como Funciona

1. **Notion**: Você gerencia seus projetos em um banco de dados do Notion.
2. **Next.js**: O site busca os dados a cada 60 segundos (ISR) para manter o conteúdo atualizado.
3. **Display**: Os projetos são exibidos em um grid responsivo com cards elegantes.

## Configuração do Notion

O banco de dados deve ter as seguintes propriedades:
- **Nome** (Title): Nome do projeto.
- **Texto** (Rich Text): Descrição do projeto.
- **URL** (URL): Link para o projeto (GitHub, Site, etc).
- **Tags** (Multi-select): Tags como "React", "Node", etc.
- **Capa da Página** (Cover): A imagem de capa da página no Notion será usada como imagem do card.

## Como Executar Localmente

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Crie um arquivo `.env.local` na raiz com suas credenciais (já configurado):
   ```
   NOTION_TOKEN=ntn_...
   NOTION_DATABASE_ID=...
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse `http://localhost:3000`.

## Deploy

Recomenda-se fazer o deploy na **Vercel**:
1. Faça o push deste código para o GitHub.
2. Importe o projeto na Vercel.
3. Adicione as variáveis de ambiente (`NOTION_TOKEN` e `NOTION_DATABASE_ID`) nas configurações do projeto na Vercel.
4. O deploy será feito automaticamente.
