import { RSA } from "./crypto.js"

describe("generate key pair", async () => {
    const { GenerateKeyPair } = RSA
    const { PrivateKey, PublicKey } = await GenerateKeyPair(2048)
    console.log({ PrivateKey, PublicKey })
})