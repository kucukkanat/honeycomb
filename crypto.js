const format = {
  name: "RSA-OAEP",
  // Consider using a 4096-bit key for systems that require long-term security
  modulusLength: 2048,
  publicExponent: new Uint8Array([1, 0, 1]),
  hash: "SHA-256",
};

export async function GenerateKey() {
  const pair = await crypto.subtle.generateKey(format, true, [
    "encrypt",
    "decrypt",
  ]);
  return pair;
}

export async function ExportPublicKey(key) {
  const exported = await crypto.subtle.exportKey("spki", key);
  return btoa(ab2str(exported));
}

export async function ExportPrivateKey(key) {
  const exported = await crypto.subtle.exportKey("pkcs8", key);
  return btoa(ab2str(exported));
}

/*
Convert  an ArrayBuffer into a string
from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
*/
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
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

/*
Convert a string into an ArrayBuffer
from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
*/
function str2ab(str) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
