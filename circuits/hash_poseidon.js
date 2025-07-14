const circomlibjs = require("circomlibjs");

async function main() {
  const poseidon = await circomlibjs.buildPoseidon();
  const input = [42n, 99n];
  const hash = poseidon.F.toString(poseidon(input));
  console.log("Poseidon([42, 99]) =", hash);
}

main();
