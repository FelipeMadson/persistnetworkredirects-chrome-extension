# PersistNetworkRedirects Chrome Extension

[![CI Status](https://github.com/FelipeMadson/persistnetworkredirects-chrome-extension/actions/workflows/ci.yml/badge.svg)](https://github.com/FelipeMadson/persistnetworkredirects-chrome-extension/actions)
[![Latest Release](https://img.shields.io/github/v/release/FelipeMadson/persistnetworkredirects-chrome-extension?color=145e4d&logo=github)](https://github.com/FelipeMadson/persistnetworkredirects-chrome-extension/releases)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![SemVer 2.0.0](https://img.shields.io/badge/semver-2.0.0-blue.svg)](https://semver.org)

[![CI Status](https://github.com/FelipeMadson/persistnetworkredirects-chrome-extension/actions/workflows/ci.yml/badge.svg)](https://github.com/FelipeMadson/persistnetworkredirects-chrome-extension/actions)
[![Latest Release](https://img.shields.io/github/v/release/FelipeMadson/persistnetworkredirects-chrome-extension?color=145e4d&logo=github)](https://github.com/FelipeMadson/persistnetworkredirects-chrome-extension/releases)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![SemVer 2.0.0](https://img.shields.io/badge/semver-2.0.0-blue.svg)](https://semver.org)

> **Console SPA Moderno em React 18 e Vite**  
> Autor: **Felipe Madison** · GitHub: [@FelipeMadson](https://github.com/FelipeMadson)

---

## 🎯 Proposta de Valor
A rede tab do Chrome DevTools limpa automaticamente os registros de rede após redirecionamentos, impedindo a análise de requisições POST críticas que ocorrem em cadeias de redirecionamento.

- **Tecnologias:** React 18, TypeScript 5, Vite.
- **Arquitetura:** Componentes funcionais, hooks de estado e tipagem estrita.
- **Testes:** Suíte automatizada com `node:test` nativo (sub-segundos, sem dependências externas).

---

## 🚀 Execução e Testes

```bash
# Executa testes automatizados
npm test

# Modo de desenvolvimento
npm install
npm run dev
```

---

## 📄 Licença
Distribuído sob a licença MIT. Criado por **Felipe Madison**.

---

## 🖥️ Demonstração em Terminal Vetorial (Execução & Benchmarks)

<p align="center">
  <img src="docs/assets/terminal-demo.svg" alt="Terminal Demo - Persistnetworkredirects Chrome Extension" width="840" />
</p>

---

## 📦 Polyglot Client SDKs (TypeScript & Python)

SDKs tipados com zero dependências externas em `sdk/`:

```typescript
import { persistnetworkredirectschromeextensionClient } from "./sdk/ts/client.ts";
const client = new persistnetworkredirectschromeextensionClient({ baseUrl: "http://127.0.0.1:3000" });
const health = await client.checkHealth();
console.log("Health:", health.status);
```
