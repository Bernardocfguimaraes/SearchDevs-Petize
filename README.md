# 🔍 Search d_evs

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Chakra UI](https://img.shields.io/badge/Chakra_UI-319795?style=for-the-badge&logo=chakraui&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

> Uma aplicação web premium para busca e visualização detalhada de perfis e repositórios do GitHub, desenvolvida como resolução do desafio técnico para a vaga de Estágio Front-end React na **Petize**.

🌐 **Link da Aplicação =** *https://search-devs-kappa.vercel.app*

---

## 📖 Sobre o Projeto

O **Search d_evs** consome a API pública do GitHub para entregar uma experiência de usuário fluida, responsiva e sofisticada. O objetivo principal deste projeto foi ir além do básico solicitado no desafio, aplicando conceitos avançados de UI/UX, internacionalização e performance no ecossistema Next.js moderno (App Router).

## ✨ Funcionalidades em Destaque

A aplicação foi desenhada com foco obsessivo na experiência do usuário final:

* **Busca Inteligente com Memória:** O *input* de pesquisa possui um *dropdown* flutuante que armazena as últimas 5 buscas no `localStorage`, permitindo navegação rápida entre perfis recentes.
* **Internacionalização (i18n):** Suporte nativo para Português (PT-BR) e Inglês (EN-US), com troca dinâmica de idioma na Home e no Header. Até mesmo a formatação de datas dos repositórios se adapta ao idioma selecionado.
* **Infinite Scroll de Alta Performance:** A paginação dos repositórios utiliza a API nativa do navegador `Intersection Observer`, garantindo um carregamento de novas páginas suave, sem necessidade de cliques manuais e com baixo custo de renderização.
* **Experiência de Carregamento Premium (Skeleton Loaders):** Em vez de telas em branco, a aplicação exibe *Skeleton Loaders* espelhando a estrutura final da tela, reduzindo a percepção de tempo de espera (Perceived Performance).
* **Sticky Sidebar Inteligente:** No desktop, o card de perfil acompanha o *scroll* do usuário, preenchendo espaços vazios e mantendo as informações de contato sempre acessíveis enquanto a lista de repositórios rola indefinidamente.
* **SEO Otimizado:** Utilização do `generateMetadata` do Next.js para alterar dinamicamente o *Title* e *OpenGraph* da aba do navegador de acordo com o usuário pesquisado (Ex: `diego3g | Search d_evs`).

## 🛠 Tecnologias e Arquitetura

O projeto foi construído utilizando as ferramentas mais modernas do mercado de Front-end:

### Core
* **[Next.js (App Router)](https://nextjs.org/):** Framework React escolhido pelo excelente ecossistema e facilidade de roteamento (`/profile/[username]`).
* **[React 18](https://react.dev/):** Utilizando Hooks modernos e componentes funcionais.
* **[TypeScript](https://www.typescriptlang.org/):** Tipagem estática rigorosa (`schemas/github.ts`) para garantir confiabilidade dos dados recebidos da API, prevenindo erros em tempo de execução.

### UI & Estilização
* **[Chakra UI](https://chakra-ui.com/):** Biblioteca de componentes acessível e altamente customizável. Configurada com o `@chakra-ui/next-js` `CacheProvider` para evitar erros de *Hydration Mismatch* no SSR.
* **[Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/):** Ícones vetoriais leves para compor uma interface limpa e moderna.

### Utilitários
* **[i18next](https://www.i18next.com/) & [react-i18next](https://react.i18next.com/):** Para o robusto sistema de tradução de dicionários da interface.
* **[Axios / Fetch API]:** Para requisições assíncronas ao GitHub.

## 🚀 Como Executar o Projeto Localmente

**Pré-requisitos:**
Certifique-se de ter o [Node.js](https://nodejs.org/) (versão 18+ recomendada) e o gerenciador de pacotes `npm` ou `yarn` instalados.

**1. Clone o repositório:**
```
git clone https://github.com/Bernardocfguimaraes/SearchDevs-Petize
````
**2. Acesse a pasta do projeto:**

````
cd search-devs

````
**3.Instale as dependências:**
````
npm install
# ou
yarn install
````
**4.Inicie o servidor de desenvolvimento:**

````
npm run dev
# ou
yarn dev
````
**5.Abra o navegador e acesse:**
````
http://localhost:3000
````
## 👨‍💻 Autor
## Bernardo Guimarães
### Desenvolvedor Fullstack

### Desenvolvido com dedicação e foco em qualidade de código.
