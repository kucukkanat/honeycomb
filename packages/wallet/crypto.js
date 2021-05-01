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
   * @returns {Promise<{PrivateKey:string,PublicKey:string}>}
   */
  static async GenerateKeyPair() {
    const { privateKey, publicKey } = await crypto.subtle.generateKey(RsaHashedKeyGenParams, true, [
      "encrypt",
      "decrypt",
    ]);
    let exportedPublicKey = await RSA.ExportPublicKeyAsString(publicKey)

    let exportedPrivateKey = await RSA.ExportPrivateKeyAsString(privateKey)
    Logger.log("Exporting keys")
    return { PrivateKey: exportedPrivateKey, PublicKey: exportedPublicKey }
  }

  /**
   * Imports a privatekey as a string and returns a CryptoKey
   * @param {string} privatKeyString 
   * @returns {CryptoKey}
   */
  static async ImportPrivateKey(privatKeyString) {
    return await crypto.subtle.importKey(
      "pkcs8",
      ArrayBufferTools.str2ab(atob(privatKeyString)),
      RsaHashedKeyGenParams,
      true,
      ["decrypt"]
    );
  }

  /**
   * Imports a public key as a string and returns a CryptoKey
   * @param {string} privatKeyString 
   * @returns {CryptoKey}
   */
  static async ImportPublicKey(publicKeyString) {
    return await crypto.subtle.importKey(
      "spki",
      ArrayBufferTools.str2ab(atob(publicKeyString)),
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
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
}
