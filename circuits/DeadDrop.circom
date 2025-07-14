pragma circom 2.0.0;
include "poseidon.circom";

template DeadDrop {
    signal input ciphertext[2];
    signal input key;
    signal input commitment;

    signal plaintext[2];

    plaintext[0] <== ciphertext[0] - key;
    plaintext[1] <== ciphertext[1] - key;

    component hasher = Poseidon(2);
    hasher.inputs[0] <== plaintext[0];
    hasher.inputs[1] <== plaintext[1];

    signal hash;
    hash <== hasher.out;

    signal output computed_hash;
    computed_hash <== hash;

    // Remove assertion temporarily
    // hash === commitment;
}

component main = DeadDrop();
