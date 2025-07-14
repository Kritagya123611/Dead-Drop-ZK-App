# 🕵️‍♂️ Dead Drop ZK App

A minimal zero-knowledge proof (ZKP) application demonstrating encrypted secret verification using **zk-SNARKs**, **Poseidon hashing**, and **Groth16** proof system — all with no information disclosure.

> "Prove you know the message, without revealing it."

---

## 🔐 What Is This?

Dead Drop is a zero-knowledge proof circuit where:
- A **ciphertext** is assumed to be a message encrypted using a secret `key`.
- The user proves they know the `key` to **decrypt the message** correctly.
- A **Poseidon hash** of the decrypted message is compared against a known `commitment`.
- If the hash matches, the proof is valid. No plaintext or key is ever leaked.

---

## ⚙️ Tech Stack

| Layer         | Technology                 |
|--------------|----------------------------|
| ZK Circuits   | Circom 2.0, snarkjs        |
| Proof System  | Groth16 (via snarkjs)      |
| Hash Function | Poseidon (circomlib)       |
| Frontend      | React + Vite               |
| WASM Runtime  | circom-compiled wasm       |

---

## 🚀 How It Works

1. 🧠 **You know a secret key**
2. 🔒 You "decrypt" a given ciphertext using `plaintext[i] = ciphertext[i] - key`
3. 🌀 Poseidon hashes the plaintext
4. 📌 You prove the hash matches a known commitment — all inside a ZK circuit
5. ✅ Frontend shows proof + public signals

---

## 🛠️ Setup

### 🧩 Prerequisites

- Node.js v18+
- `snarkjs` and `circom` globally installed

### 🧪 Circuit Compilation

```bash
circom DeadDrop.circom --r1cs --wasm --sym -l ./circomlib/circuits
