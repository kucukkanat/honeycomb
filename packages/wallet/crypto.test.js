import { RSA } from "./crypto.js"
import chai from "./tests/chai.esm.js"
const { expect } = chai
const { GenerateKeyPair, ImportPrivateKeyFromString, ExportPrivateKeyAsString, ImportPublicKeyFromString, ExportPublicKeyAsString } = RSA

describe("generate key pair", async () => {
    /** @type {RSA.GenerateKeyPair} */
    let keypair;
    before(async () => {
        keypair = await GenerateKeyPair(2048)
    })

    it("expects to import and export the private key correctly", async () => {
        const privateKeyAsString = await keypair.PrivateKey.toString()
        const importedPrivateKey = await ImportPrivateKeyFromString(privateKeyAsString)
        const exportedPrivateKey = await ExportPrivateKeyAsString(importedPrivateKey)
        expect(exportedPrivateKey).to.equal(privateKeyAsString)
    })

    it("expects to import and export the public key correctly", async () => {
        const publicKeyAsString = await keypair.PublicKey.toString()
        const importedPublicKey = await ImportPublicKeyFromString(publicKeyAsString)
        const exportedPublicKey = await ExportPublicKeyAsString(importedPublicKey)
        expect(exportedPublicKey).to.equal(publicKeyAsString)
    })

    // it("expects the private key to decrypt public key encrypted text", async () => {
    //     const {privateKey} = keypair
    //     const data = "hello world"
    //     const encrypted = await RSA.Encrypt(data,PublicKey)
    //     console.log({encrypted})
    // })
})
