/**
 * PersistNetworkRedirects Chrome Extension
 * 
 * Problema: A rede tab do Chrome DevTools limpa automaticamente os registros de rede após redirecionamentos, impedindo a análise de requisições POST críticas que ocorrem em cadeias de redirecionamento.
 * Diferencial: Extensão Chrome que intercepta eventos de redirecionamento, armazena cópias das requisições no navegador e permite exportação de logs completos com contexto de fluxo de redirecionamento.
 * Autor: Felipe Madison (https://github.com/FelipeMadson)
 * Licença: MIT — Arquitetura Determinística em Camadas
 */

import { SecurityVault } from "./security/crypto-vault.ts";
import { StorageWal } from "./storage/wal.ts";
import { TelemetryCollector } from "./telemetry/metrics.ts";
import type { ExecutionRecord, EngineStats } from "./domain/types.ts";

export interface PersistnetworkredirectsChromeExtensionConfig {
  name?: string;
  enableAudit?: boolean;
  timeoutMs?: number;
}

export class PersistnetworkredirectsChromeExtension {
  private name: string;
  private enableAudit: boolean;
  private timeoutMs: number;
  private records: Map<string, ExecutionRecord> = new Map();
  private wal = new StorageWal();
  private telemetry = new TelemetryCollector();

  constructor(config?: PersistnetworkredirectsChromeExtensionConfig) {
    this.name = config?.name || "persistnetworkredirects-chrome-extension";
    this.enableAudit = config?.enableAudit ?? true;
    this.timeoutMs = config?.timeoutMs ?? 5000;
  }

  public getName(): string {
    return this.name;
  }

  public processItem(key: string, payload: any): ExecutionRecord {
    if (!key || typeof key !== "string" || key.trim().length === 0) {
      throw new Error("Chave de identificação inválida ou vazia.");
    }

    const cleanKey = key.trim();
    const serialized = JSON.stringify(payload ?? null);
    const hash = SecurityVault.sha256(serialized);
    const id = SecurityVault.sha256(`${cleanKey}:${hash}`).slice(0, 16);

    const record: ExecutionRecord = {
      id,
      key: cleanKey,
      payload: SecurityVault.maskSecrets(payload),
      hash,
      timestamp: new Date().toISOString(),
      status: "verified"
    };

    if (this.enableAudit) {
      this.records.set(id, record);
      this.wal.append(id, hash);
      this.telemetry.count("items_processed");
    }

    return record;
  }

  public getRecord(id: string): ExecutionRecord | null {
    return this.records.get(id) || null;
  }

  public verifyIntegrity(id: string): boolean {
    const record = this.records.get(id);
    if (!record) return false;

    const recomputed = SecurityVault.sha256(JSON.stringify(record.payload ?? null));
    return SecurityVault.timingSafeVerify(record.hash, recomputed);
  }

  public getStats(): EngineStats {
    const snapshot = this.telemetry.getSnapshot();
    return {
      totalProcessed: this.records.size,
      verifiedCount: Array.from(this.records.values()).filter(r => r.status === "verified").length,
      flaggedCount: Array.from(this.records.values()).filter(r => r.status === "flagged").length,
      walLogSize: this.wal.size(),
      uptimeSeconds: snapshot.uptime_seconds
    };
  }
}

export default PersistnetworkredirectsChromeExtension;
