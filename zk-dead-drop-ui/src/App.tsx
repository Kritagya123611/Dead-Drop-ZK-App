import { useState } from "react";
import * as snarkjs from "snarkjs";

function App() {
  const [key, setKey] = useState("");
  const [ciphertext, setCiphertext] = useState(["", ""]);
  const [commitment, setCommitment] = useState("");
  const [proof, setProof] = useState(null);
  const [status, setStatus] = useState("");

  const generateProof = async () => {
    if (!key || !ciphertext[0] || !ciphertext[1] || !commitment) {
      alert("❗ Please fill in all fields before generating proof.");
      return;
    }

    setStatus("⏳ Generating proof...");

    const input = {
      key,
      ciphertext: [ciphertext[0], ciphertext[1]],
      commitment
    };

    try {
      const wasm = await fetch("/DeadDrop.wasm").then(res => res.arrayBuffer());
      const zkey = await fetch("/DeadDrop_final.zkey").then(res => res.arrayBuffer());

      const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        input,
        new Uint8Array(wasm),
        new Uint8Array(zkey)
      );

      setProof(proof);
      setStatus("✅ ZK Proof generated successfully!");
      console.log("Proof:", proof);
      console.log("Public Signals:", publicSignals);
    } catch (err) {
      setStatus("❌ Failed to generate proof.");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial", maxWidth: 600, margin: "auto" }}>
      <h1> Dead Drop ZK App</h1>
      <p>
        This app uses a Zero-Knowledge circuit to prove knowledge of a secret decryption key 
        without revealing it. Enter the encrypted values and the expected commitment hash.
      </p>

      <label> Secret Key (private)</label>
      <input
        placeholder="e.g., 1234"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <label> Ciphertext[0] & Ciphertext[1] (encrypted message)</label>
      <div style={{ display: "flex", gap: 10 }}>
        <input
          placeholder="e.g., 2234"
          value={ciphertext[0]}
          height={20}
          width={50}
          onChange={(e) => setCiphertext([e.target.value, ciphertext[1]])}
          style={{ flex: 1 }}
        />
        <input
          placeholder="e.g., 2234"
          value={ciphertext[1]}
          onChange={(e) => setCiphertext([ciphertext[0], e.target.value])}
          style={{ flex: 1 }}
        />
      </div>

      <label style={{ marginTop: 10 }}> Commitment Hash (Poseidon Hash of plaintext)</label>
      <input
        placeholder="e.g., 129823498..."
        value={commitment}
        onChange={(e) => setCommitment(e.target.value)}
        style={{ width: "100%", marginBottom: 20 }}
      />

      <button
        onClick={generateProof}
        style={{
          padding: "10px 20px",
          backgroundColor: "#111",
          color: "#fff",
          border: "none",
          borderRadius: 5,
          cursor: "pointer"
        }}
      >
         Generate ZK Proof
      </button>

      <p style={{ marginTop: 20 }}>{status}</p>

      {proof && (
        <div style={{ marginTop: 20 }}>
          <h3>🧪 Generated Proof:</h3>
          <pre style={{ background: "#111", color: "#0f0", padding: 10, borderRadius: 5 }}>
            {JSON.stringify(proof, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
