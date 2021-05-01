import { RSA } from "./crypto.js"
import chai from "./tests/chai.esm.js"
const { expect } = chai
const { GenerateKeyPair, ImportPrivateKey, ExportPrivateKeyAsString, ExportPublicKeyAsString, ImportPublicKey } = RSA

describe("generate key pair", async () => {
    let keypair;
    before(async () => {
        keypair = await GenerateKeyPair(2048)
    })

    it("expects to import and export the private key correctly", async () => {
        const { PrivateKey } = keypair
        const importedPrivateKey = await ImportPrivateKey(PrivateKey)
        const exportedPrivateKey = await ExportPrivateKeyAsString(importedPrivateKey)
        expect(exportedPrivateKey).to.equal(PrivateKey)
    })

    it("expects to import and export the public key correctly", async () => {
        const { PublicKey } = keypair
        const importedPublicKey = await ImportPublicKey(PublicKey)
        const exportedPublicKey = await ExportPublicKeyAsString(importedPublicKey)
        expect(exportedPublicKey).to.equal(PublicKey)
    })
})
