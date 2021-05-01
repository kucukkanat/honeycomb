import { Logger } from "./log.js";

const RsaHashedKeyGenParams = {
  name: "RSA-OAEP",
  // Consider using a 4096-bit key for systems that require long-term security
  modulusLength: 2048,
  publicExponent: new Uint8Array([1, 0, 1]),
  hash: "SHA-256",
};
export class RSA {
  /**
   * Automatically exports private and public keys upon generation
   * @returns {Promise<{privateKey:string,publicKey:string}>}
   */
  static async GenerateKeyPair() {
    Logger.log("Exporting keys")
    const { privateKey, publicKey } = await crypto.subtle.generateKey(RsaHashedKeyGenParams, true, [
      "encrypt",
      "decrypt",
    ]);

    return { privateKey, publicKey }
  }

  /**
   * Imports a base64 private key string 
   * base64 -> ArrayBuffer -> CryptoKey
   * @param {ArrayBuffer} privateKey 
   * @returns {CryptoKey}
   */
  static async ImportPrivateKeyFromString(privatKeyString) {
    return await RSA.ImportPrivateKey(ArrayBufferTools.str2ab(atob(privatKeyString)))
  }

  /**
   * Imports a base64 public key string 
   * base64 -> ArrayBuffer -> CryptoKey
   * @param {ArrayBuffer} privatKeyString 
   * @returns {CryptoKey}
   */
  static async ImportPublicKeyFromString(publicKeyString) {
    return await RSA.ImportPublicKey(ArrayBufferTools.str2ab(atob(publicKeyString)))
  }


  /**
   * Imports a private key 
   * @param {ArrayBuffer} privateKey 
   * @returns {CryptoKey}
   */
  static async ImportPrivateKey(privateKey) {
    return await crypto.subtle.importKey(
      "pkcs8",
      privateKey,
      RsaHashedKeyGenParams,
      true,
      ["decrypt"]
    );
  }

  /**
   * Imports a public key
   * @param {ArrayBuffer} privatKeyString 
   * @returns {CryptoKey}
   */
  static async ImportPublicKey(publicKey) {
    return await crypto.subtle.importKey(
      "spki",
      publicKey,
      RsaHashedKeyGenParams,
      true,
      ["encrypt"]
    );
  }


  /**
   * @param {CryptoKey} privateKey 
   */
  static async ExportPrivateKey(privateKey) {
    return await crypto.subtle.exportKey("pkcs8", privateKey)
  }
  /**
   * @param {CryptoKey} publicKey 
   */
  static async ExportPublicKey(publicKey) {
    return await crypto.subtle.exportKey("spki", publicKey)
  }

  /**
   * Takes a RSA private key and exports as string
   * @param {CryptoKey} publicKey 
   * @returns {string}
   */
  static async ExportPrivateKeyAsString(publicKey) {
    let exported = await RSA.ExportPrivateKey(publicKey)
    return btoa(ArrayBufferTools.ab2str(exported))
  }

  /**
   * Takes a RSA public key and exports as string
   * @param {CryptoKey} publicKey 
   * @returns {string}
   */
  static async ExportPublicKeyAsString(publicKey) {
    let exported = await RSA.ExportPublicKey(publicKey)
    return btoa(ArrayBufferTools.ab2str(exported))
  }

  static async Encrypt(data, publicKey) {
    const encoder = new TextEncoder()
    const encoded = encoder.encode(data)
    const encrypted = crypto.subtle.encrypt(
      {
        name: "RSA_OAEP",
      },
      publicKey,
      encoded
    )
    return ArrayBufferTools.ab2str(encrypted)
  }

}

class ArrayBufferTools {
  /*
  Convert  an ArrayBuffer into a string
  from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
  */
  static ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
  }
  /*
  Convert a string into an ArrayBuffer
  from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
  */
  static str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0; i < str.length; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
}
