import {
  GenerateKey,
  ExportPublicKey,
  ExportPrivateKey,
  ImportPrivateKey,
} from "./crypto.js";

GenerateKey()
  .then(async ({ publicKey, privateKey }) => {
    const priv = await ExportPrivateKey(privateKey);
    const pub = await ExportPublicKey(publicKey);
    return [priv, pub];
  })
  .then(async (exported) => {
    const [private_] = exported;
    const i = await ImportPrivateKey(private_);
    console.log({ exported, i });
  });

  import "./components/wallet.js"