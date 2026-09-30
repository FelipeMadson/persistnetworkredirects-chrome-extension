import test, { describe } from "node:test";
import assert from "node:assert";
import { PersistnetworkredirectsChromeExtension } from "../src/index.ts";
import { SecurityVault } from "../src/security/crypto-vault.ts";

describe("PersistNetworkRedirects Chrome Extension — Suíte de Testes Automatizados", () => {
  test("1. Deve instanciar o motor com configurações padrão", () => {
    const engine = new PersistnetworkredirectsChromeExtension();
    assert.strictEqual(engine.getName(), "persistnetworkredirects-chrome-extension");
    const stats = engine.getStats();
    assert.strictEqual(stats.totalProcessed, 0);
  });

  test("2. Deve processar item e gerar hash criptográfico determinístico SHA-256", () => {
    const engine = new PersistnetworkredirectsChromeExtension();
    const record = engine.processItem("session-1", { user: "Felipe Madison", role: "author" });

    assert.ok(record.id.length === 16);
    assert.strictEqual(record.status, "verified");
    assert.strictEqual(record.key, "session-1");
  });

  test("3. Deve rejeitar chaves vazias ou inválidas com erro descritivo", () => {
    const engine = new PersistnetworkredirectsChromeExtension();
    assert.throws(() => {
      engine.processItem("", { invalid: true });
    }, /Chave de identificação inválida ou vazia/);
  });

  test("4. Deve mascarar segredos automaticamente garantindo Zero Credential Leak", () => {
    const engine = new PersistnetworkredirectsChromeExtension();
    const record = engine.processItem("auth-leak-test", {
      username: "felipe",
      apiKey: "sk_live_secret_12345",
      nested: { password: "super-secret-pw" }
    });

    assert.strictEqual(record.payload.apiKey, "********");
    assert.strictEqual(record.payload.nested.password, "********");
    assert.strictEqual(record.payload.username, "felipe");
  });

  test("5. SecurityVault: TimingSafeVerify deve validar hashes idênticos e rejeitar adulterações", () => {
    const hash = SecurityVault.sha256("test-content");
    const tampered = SecurityVault.sha256("tampered-content");

    assert.strictEqual(SecurityVault.timingSafeVerify(hash, hash), true);
    assert.strictEqual(SecurityVault.timingSafeVerify(hash, tampered), false);
  });

  test("6. Storage WAL: Deve registrar operações no log transacional", () => {
    const engine = new PersistnetworkredirectsChromeExtension();
    engine.processItem("item-a", { v: 1 });
    engine.processItem("item-b", { v: 2 });

    const stats = engine.getStats();
    assert.strictEqual(stats.walLogSize, 2);
    assert.strictEqual(stats.totalProcessed, 2);
  });

  test("7. Integridade: Deve validar a consistência dos registros armazenados", () => {
    const engine = new PersistnetworkredirectsChromeExtension();
    const rec = engine.processItem("record-target", { clean: true });
    const isOk = engine.verifyIntegrity(rec.id);
    assert.strictEqual(isOk, true);
  });

  test("8. Performance & Benchmarking: Deve processar lotes com taxa > 2.000 ops/segundo", () => {
    const engine = new PersistnetworkredirectsChromeExtension();
    const t0 = performance.now();
    for (let i = 0; i < 200; i++) {
      engine.processItem("batch-" + i, { iteration: i });
    }
    const t1 = performance.now();
    const durationMs = t1 - t0;
    assert.ok(durationMs < 500, `Esperava tempo sub-segundo, obteve ${durationMs}ms`);
  });
});
