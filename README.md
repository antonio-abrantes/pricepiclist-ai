# PricePicList.AI

Uma aplicação web para gerenciar listas de compras de forma inteligente, utilizando IA para extrair informações de produtos através de fotos.

## 🎯 Objetivo

Este projeto foi desenvolvido com fins didáticos para explorar a aplicação prática de IAs no nosso cotidiano. Demonstra como podemos utilizar tecnologias modernas para simplificar tarefas comuns, como criar uma lista de compras.

A aplicação permite que o usuário:
- Tire fotos de produtos/preços
- Extraia automaticamente nome e preço usando IA
- Organize múltiplas listas de compras
- Controle gastos com limite por lista
- Acompanhe o total gasto em tempo real

## 🚀 Tecnologias

- [Next.js 14](https://nextjs.org/) - Framework React com Server Components
- [TypeScript](https://www.typescriptlang.org/) - Tipagem estática
- [Tailwind CSS](https://tailwindcss.com/) - Estilização
- [Shadcn/ui](https://ui.shadcn.com/) - Componentes de UI
- [Groq AI](https://groq.com/) - IA para extração de texto (OCR)
- [OpenAI](https://openai.com/) - IA alternativa para extração
- [MinIO](https://min.io/) - Armazenamento de imagens
- [Zustand](https://zustand-demo.pmnd.rs/) - Gerenciamento de estado
- [Sonner](https://sonner.emilkowal.ski/) - Notificações toast

## 📋 Pré-requisitos

- Node.js 18+
- NPM ou Yarn
- Conta na Groq AI e/ou OpenAI para as API Keys
- Servidor MinIO configurado para armazenamento

## ⚙️ Configuração

1. Clone o repositório:
```bash
git clone https://github.com/antonio-abrantes/pricepiclist.ai.git
cd pricepiclist-ai
```
2. Instale as dependências:
```bash
npm install
```
ou
```bash
yarn install
```

3. Configure as variáveis de ambiente:
```bash
.env.example
GROQ_API_KEY="sua-api-key"
OPENAI_API_KEY="sua-api-key"
MINIO_ENDPOINT="seu-endpoint-minio"
MINIO_REGION="sua-regiao"
MINIO_ACCESS_KEY="sua-access-key"
MINIO_SECRET_KEY="sua-secret-key"
MINIO_BUCKET_NAME="nome-do-bucket"
GLOBAL_API_KEY="sua-api-key"
```
4. Inicie o servidor:
```bash
npm run dev
```
ou
```bash
yarn dev
```

## 🌟 Funcionalidades

### Gestão de Listas
- Criar múltiplas listas de compras
- Definir valor máximo por lista
- Acompanhar total gasto
- Alertas de limite próximo/atingido

### Captura Inteligente
- Tirar foto do produto/preço
- Extração automática via IA
- Suporte a múltiplos provedores de IA
- Compressão automática de imagens

### Configurações
- Escolha entre Groq AI ou OpenAI
- Configuração de API Keys global ou por provedor
- Tema claro/escuro
- Persistência local dos dados

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.

## 🎓 Propósito Educacional

Este projeto foi desenvolvido com o objetivo principal de explorar e demonstrar:
- Integração prática de IAs em aplicações web
- Uso de tecnologias modernas do ecossistema React/Next.js
- Boas práticas de desenvolvimento e arquitetura
- Gerenciamento de estado e persistência de dados no lado do cliente
- UX/UI com foco na usabilidade

## ✨ Agradecimentos

- [Groq AI](https://groq.com/) pela API de processamento de imagens
- [OpenAI](https://openai.com/) pelo modelo alternativo
- [Vercel](https://vercel.com/) pela infraestrutura
- Comunidade open-source pelas ferramentas utilizadas

## Features Futuras

- [ ] Adicionar suporte para múltiplos usuários com sistema de login
- [ ] Cadastro de perfil de usuário
- [ ] Tela de segurança para atualizar a senha
- [ ] Integração com Google Sheets para exportação de listas
- [ ] Melhorias na IA para aumentar a precisão da extração de dados

---

Desenvolvido com ❤️ para fins educacionais e práticos