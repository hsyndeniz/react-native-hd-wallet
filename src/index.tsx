import 'react-native-get-random-values';
import { NativeModules, Platform } from 'react-native';
import { hdkey } from 'ethereumjs-wallet';
import * as ed25519 from 'ed25519-hd-key';
import * as bip39 from 'bip39';
import nacl from 'tweetnacl';
import base58 from 'bs58';

import * as TaquitoUtils from '@taquito/utils';
import { InMemorySigner } from '@taquito/signer';

const LINKING_ERROR =
  `The package 'react-native-hd-wallet' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const HdWallet = NativeModules.HdWallet
  ? NativeModules.HdWallet
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function generateMnemonic(): string {
  return bip39.generateMnemonic();
}

/**
 * Check if the mnemonic is valid
 * @param mnemonic the mnemonic to check
 * @returns true if the mnemonic is valid
 */
export function validateMnemonic(mnemonic: string): boolean {
  return bip39.validateMnemonic(mnemonic);
}

/**
 * Creates a wallet object with a mnemonic, eth, solana, and tezos
 * @param {number} index Index of the wallet
 * @param {string} mnemonic Optional mnemonic to derive the wallet from
 * @param {string} password Optional password for tezos
 * @returns {Wallet} Wallet object
 */

export async function createHDWallet(index: number = 0, mnemonic?: string, password?: string): Promise<Wallet> {
  try {
    const eth_derivation_path = `m/44'/60'/0'/0/${index}`;
    const sol_derivation_path = `m/44'/501'/${index}'/0'`;
    const tezos_derivation_path = `m/44'/1729'/${index}'/0'`;

    if (!mnemonic) {
      mnemonic = generateMnemonic();
    } else if (!validateMnemonic(mnemonic)) {
      throw new Error("Invalid mnemonic! Please check your mnemonic. Don't pass any mnemonic to generate a new one.");
    }

    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const hd_wallet = hdkey.fromMasterSeed(seed);
    const wallet = hd_wallet.derivePath(eth_derivation_path).getWallet();

    const address = wallet.getAddressString();
    const publicKey = wallet.getPublicKeyString();
    const privateKey = wallet.getPrivateKeyString();

    let derivedPrivateKey = ed25519.derivePath(sol_derivation_path, seed.toString('hex'));
    let keyPair = nacl.sign.keyPair.fromSeed(derivedPrivateKey.key);

    const solana = {
      publicKey: base58.encode(keyPair.publicKey),
      secretKey: base58.encode(keyPair.secretKey),
    };

    const tezosDerivedPrivateKey = ed25519.derivePath(tezos_derivation_path, seed.toString('hex'));
    const tezosPrivateKey = TaquitoUtils.b58cencode(tezosDerivedPrivateKey.key, TaquitoUtils.prefix.edsk2);

    const signer = await InMemorySigner.fromSecretKey(tezosPrivateKey, password);

    const tezos = {
      publicKeyHash: await signer.publicKeyHash(),
      privateKey: TaquitoUtils.b58cencode(tezosDerivedPrivateKey.key, TaquitoUtils.prefix.edsk2),
    };

    return {
      mnemonic,
      address,
      publicKey,
      privateKey,
      solana,
      tezos,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}

export type Wallet = {
  mnemonic: string;
  address: string;
  publicKey: string;
  privateKey: string;
  solana: {
    publicKey: string;
    secretKey: string;
  };
  tezos: {
    publicKeyHash: string;
    privateKey: string;
  };
};

// TODO: remove this example
export function multiply(a: number, b: number): Promise<number> {
  return HdWallet.multiply(a, b);
}
