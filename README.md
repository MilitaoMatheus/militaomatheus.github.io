# 🌐 Portfólio Profissional — Matheus Militão

Website de portfólio profissional de **Matheus Militão da Silva**, desenvolvido com foco em **Tecnologia, Segurança, Confiabilidade e Robustez**.

Apresenta a formação técnica (ETEC) e superior (FATEC Osasco), experiência corporativa na área de Planejamento (Atento), competências em desenvolvimento de software (Backend, Java/Spring Boot, Python, PHP, Flutter, MySQL) e os principais projetos em destaque no GitHub.

---

## 🛠️ Tecnologias e Recursos Utilizados

- **HTML5 Semântico & Acessível**: Estrutura moderna, otimizada para SEO e leitores de tela.
- **CSS3 Moderno**: Design system com foco em tons de confiança (Trust Blue, Cyber Cyan, Midnight Navy), cards com efeito glassmorphism e responsividade completa (Mobile, Tablet, Desktop).
- **Canvas Interativo (`particles.js`)**: Rede cibernética de nós e dados no background com aceleração gráfica e respeito à acessibilidade (`prefers-reduced-motion`).
- **JavaScript Vanilla Modular (`main.js`)**: Scroll spy ativo na barra de navegação, animação de barras de habilidades com `IntersectionObserver`, cópia de e-mail com 1 clique e formulário com validação segura.

---

## 🚀 Como Executar Localmente

### Opção 1: Direto no Navegador
Basta dar um duplo clique no arquivo `index.html` para abrir diretamente no seu navegador preferido (Chrome, Edge, Firefox).

### Opção 2: Servidor Local via Python
No terminal PowerShell, dentro da pasta do projeto, execute:
```bash
python -m http.server 8000
```
Em seguida, acesse no navegador: `http://localhost:8000`.

---

## ☁️ Como Publicar no GitHub Pages (Passo a Passo)

O GitHub Pages é a forma mais recomendada, simples e 100% gratuita para colocar seu portfólio no ar com HTTPS/SSL automático:

### Método Recomendado: Domínio Pessoal `militaomatheus.github.io`
1. Acesse seu GitHub e crie um novo repositório público chamado exatamente:
   ```
   militaomatheus.github.io
   ```
2. No seu computador, dentro desta pasta `MatheusMilitaoPortifolio`, inicialize o Git e faça o envio:
   ```bash
   git init
   git add .
   git commit -m "feat: meu portfolio profissional"
   git branch -M main
   git remote add origin https://github.com/MilitaoMatheus/militaomatheus.github.io.git
   git push -u origin main
   ```
3. Pronto! Em 1 a 2 minutos seu website estará no ar para o mundo todo no endereço:
   👉 **`https://militaomatheus.github.io/`**

### Método Alternativo: Em um repositório qualquer (ex: `MatheusMilitaoPortifolio`)
1. Crie o repositório no GitHub com o nome que preferir e envie o código (`git push`).
2. Acesse o repositório no GitHub, clique na aba **Settings** > **Pages** (no menu lateral esquerdo).
3. Em **Build and deployment**, selecione a branch `main` e a pasta `/(root)`.
4. Clique em **Save**. O site estará disponível em `https://militaomatheus.github.io/MatheusMilitaoPortifolio/`.

---

## ⚡ Alternativa: Hospedagem na Vercel (1 Clique)
Se preferir usar a [Vercel](https://vercel.com/):
1. Faça login na Vercel com sua conta do GitHub.
2. Clique em **Add New** > **Project** e selecione o repositório do seu portfólio.
3. Clique em **Deploy**. A Vercel detectará automaticamente os arquivos estáticos e gerará um link com CDN global ultra rápida.
