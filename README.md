
# 🎬 Next.js Cinelist

Aplicação front-end desenvolvida em **Next.js** para listar filmes utilizando a API do TMDB.  
Este projeto foi criado como parte da prática de **Integração Contínua (CI)** e **Entrega Contínua (CD)** com GitHub Actions.

---

## 🚀 Objetivo
Demonstrar uma pipeline completa de CI/CD que contempla:
- **Validação de Código**: rodar ESLint.
- **Testes Automatizados**: rodar testes unitários.
- **Build da Aplicação**: verificar se o projeto compila corretamente.
- **Deploy Automatizado**: publicar a aplicação na Vercel a cada push na branch `main`.

---

## ⚙️ Tecnologias
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [GitHub Actions](https://docs.github.com/actions)
- [Vercel](https://vercel.com/)

---

## 🔄 Pipeline CI/CD

O workflow está configurado em `.github/workflows/main.yml` e possui três estágios:

1. **Build**
   - Instala dependências (`npm ci`)
   - Roda lint (`npm run lint`)
   - Roda testes (`npm run test`)
   - Roda build (`npm run build`)

2. **Tests**
   - Executa novamente lint e testes para garantir qualidade

3. **Deploy**
   - Deploy automático para a Vercel usando `VERCEL_TOKEN`, `VERCEL_ORG_ID` e `VERCEL_PROJECT_ID` configurados como **secrets** no repositório

---

## 🔑 Secrets e Variáveis
- `VERCEL_TOKEN` → Token de acesso da Vercel
- `VERCEL_ORG_ID` → ID da organização na Vercel
- `VERCEL_PROJECT_ID` → ID do projeto na Vercel
- Variáveis adicionais para API do TMDB:
  - `TMDB_API_URL`
  - `TMDB_TOKEN`
  - `NEXT_PUBLIC_TMDB_API_IMG_URL`

---

## 🌐 Deploy
A aplicação está publicada em:  
👉 [https://nextjs-cinelist.vercel.app](https://nextjs-cinelist.vercel.app)

---

## 📋 Como rodar localmente
```bash
# Clonar o repositório
git clone https://github.com/CintiaLima-83/nextjs-cinelist.git

# Entrar na pasta
cd nextjs-cinelist

# Instalar dependências
npm ci

# Rodar em modo desenvolvimento
npm run dev
