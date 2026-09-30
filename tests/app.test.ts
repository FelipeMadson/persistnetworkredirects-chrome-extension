import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

test("PersistNetworkRedirects Chrome Extension - React 18 SPA Test Suite", async (t) => {
  await t.test("1. Estrutura de arquivos do frontend React deve estar completa", () => {
    assert.ok(fs.existsSync(path.resolve("src", "App.tsx")), "App.tsx deve existir");
    assert.ok(fs.existsSync(path.resolve("src", "main.tsx")), "main.tsx deve existir");
    assert.ok(fs.existsSync(path.resolve("src", "components", "Feature.tsx")), "Feature.tsx deve existir");
    assert.ok(fs.existsSync(path.resolve("index.html")), "index.html deve existir");
    assert.ok(fs.existsSync(path.resolve("package.json")), "package.json deve existir");
  });

  await t.test("2. App.tsx deve conter título e estado reativo do componente", () => {
    const appContent = fs.readFileSync(path.resolve("src", "App.tsx"), "utf8");
    assert.ok(appContent.includes("PersistNetworkRedirects Chrome Extension"), "App deve renderizar o título do projeto");
    assert.ok(appContent.includes("useState"), "App deve conter hook useState");
    assert.ok(appContent.includes("Feature"), "App deve importar componente Feature");
  });

  await t.test("3. Feature.tsx deve aceitar props tipadas e renderizar componente", () => {
    const featContent = fs.readFileSync(path.resolve("src", "components", "Feature.tsx"), "utf8");
    assert.ok(featContent.includes("FeatureProps"), "Deve declarar interface FeatureProps");
    assert.ok(featContent.includes("title"), "Deve aceitar propriedade title");
    assert.ok(featContent.includes("status"), "Deve aceitar propriedade status");
  });

  await t.test("4. Configuração de build Vite e TypeScript deve ser válida", () => {
    const pkg = JSON.parse(fs.readFileSync(path.resolve("package.json"), "utf8"));
    assert.equal(pkg.name, "persistnetworkredirects-chrome-extension");
    assert.ok(pkg.scripts.test, "Deve conter script test");
    assert.ok(pkg.scripts.build, "Deve conter script build");
  });

  await t.test("5. Layout HTML deve conter root element e bootstrap de script", () => {
    const html = fs.readFileSync(path.resolve("index.html"), "utf8");
    assert.ok(html.includes('<div id="root"></div>'), "Deve conter div root");
    assert.ok(html.includes('src="/src/main.tsx"'), "Deve incluir script main.tsx");
  });
});
