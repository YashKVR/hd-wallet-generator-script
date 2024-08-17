import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { HDNodeWallet, Wallet } from "ethers";



// const mnemonic = generateMnemonic(256);
/*
const mnemonic = generateMnemonic(128);
console.log(mnemonic);
const seed = mnemonicToSeedSync(mnemonic);
console.log(seed);
*/


//Create a function to generate HD Wallet For Solana
const generateSolWallet = async (account_number: Number) => {
    const mnemonic = generateMnemonic(128);
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${account_number}'/0'`; //This is the derivation path for solana
    const derivedSeed = derivePath(path, seed.toString('hex')).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    console.log(`Wallet Address of Account ${account_number} is ${Keypair.fromSecretKey(secret).publicKey.toBase58()}`);
}


//Create a function to generate HD Wallet For Eth
const generateEthWallet = async (account_number: Number) => {
    const mnemonic = generateMnemonic(256);
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/60'/${account_number}'/0'` //This is the derivation path for Eth
    // const derivedSeed = derivePath(path, seed.toString('hex')).key;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const derivedSeed = hdNode.derivePath(path);
    const secret = derivedSeed.privateKey;
    const public_key = new Wallet(secret)

    console.log(`Wallet Address of Account ${account_number} is ${JSON.stringify(public_key.address)}`);

}

//Functions to run and test
// generateSolWallet(1);
generateEthWallet(0);