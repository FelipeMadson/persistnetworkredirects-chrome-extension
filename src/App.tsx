import React, { useState } from "react";
import { Feature } from "./components/Feature.tsx";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ fontFamily: "Inter, sans-serif", margin: "40px auto", maxWidth: "800px", padding: "0 20px" }}>
      <header style={{ borderBottom: "1px solid #e2e4dc", paddingBottom: "20px", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", color: "#1f2421", margin: 0 }}>PersistNetworkRedirects Chrome Extension</h1>
        <p style={{ color: "#5c645e", marginTop: "8px" }}>A rede tab do Chrome DevTools limpa automaticamente os registros de rede após redirecionamentos, impedindo a análise de requisições POST críticas que ocorrem em cadeias de redirecionamento.</p>
      </header>

      <main>
        <Feature title="Painel Operacional" status="Ativo" />
        
        <div style={{ marginTop: "24px" }}>
          <button
            style={{
              background: "#145e4d",
              color: "#ffffff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 600
            }}
            onClick={() => setCount((c) => c + 1)}
          >
            Interações: {count}
          </button>
        </div>
      </main>
    </div>
  );
}
