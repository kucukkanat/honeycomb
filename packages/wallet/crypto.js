import { Logger} from "./log.js";

const format = {
  name: "RSA-OAEP",
  // Consider using a 4096-bit key for systems that require long-term security
  modulusLength: 2048,
  publicExponent: new Uint8Array([1, 0, 1]),
  hash: "SHA-256",
};
export class RSA {
  static async GenerateKeyPair(modulusLength = 2048) {
    const { privateKey, publicKey } = await crypto.subtle.generateKey({ ...format, modulusLength }, true, [
      "encrypt",
      "decrypt",
    ]);
    let exportedPublicKey = await crypto.subtle.exportKey("spki", publicKey)
    // binary to ascii
    exportedPublicKey = btoa(ArrayBufferTools.ab2str(exportedPublicKey));

    let exportedPrivateKey = await crypto.subtle.exportKey("pkcs8", privateKey)
    exportedPrivateKey = btoa(ArrayBufferTools.ab2str(exportedPrivateKey));
    Logger.log("Exporting keys")
    return { PrivateKey: exportedPrivateKey, PublicKey: exportedPublicKey }
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



export async function ImportPrivateKey(base64PrivateKeyString) {
  return await crypto.subtle.importKey(
    "pkcs8",
    str2ab(atob(base64PrivateKeyString)),
    format,
    true,
    ["decrypt"]
  );
}

