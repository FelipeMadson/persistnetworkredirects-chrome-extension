import { PersistnetworkredirectsChromeExtension } from "../index.ts";

async function runCli() {
  const args = process.argv.slice(2);
  const command = args[0] || "help";
  const instance = new PersistnetworkredirectsChromeExtension();

  if (command === "status") {
    console.log(JSON.stringify(instance.getStats(), null, 2));
    process.exit(0);
  }

  if (command === "benchmark") {
    console.log("Executando benchmark de performance (10.000 iterações)...");
    const t0 = performance.now();
    for (let i = 0; i < 10000; i++) {
      instance.processItem("key-" + i, { index: i, value: "test-data" });
    }
    const t1 = performance.now();
    console.log(`Concluído em ${(t1 - t0).toFixed(2)}ms (${(10000 / ((t1 - t0) / 1000)).toFixed(0)} ops/seg)`);
    process.exit(0);
  }

  console.log(`CLI: ${instance.getName()} v1.0.0`);
  console.log("Comandos disponíveis: status, benchmark");
}

runCli();
