import { LitElement, html, css } from "lit";
import {
  ExportPrivateKey,
  ExportPublicKey,
  GenerateKey,
  ImportPrivateKey,
  ImportPublicKey,
} from "../lib/crypto";
import { styles } from "./genericStyles";

class Component extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      privateKey: { type: String },
      publicKey: { type: String },
    };
  }

  static get styles() {
    return [
      styles,
      css`
        #root {
          padding: 10px;
        }
      `,
    ];
  }

  async generate() {
    const keyPair = await GenerateKey();
    this.privateKey = await ExportPrivateKey(keyPair.privateKey);
    this.publicKey = await ExportPublicKey(keyPair.publicKey);
  }

  async import() {
    // const importedPrivate = await ImportPrivateKey(this.privateKey);
    const importedPublic = await ImportPublicKey(this.publicKey);
  }

  render() {
    return html`
      <div id="root">
        <div><button @click="${this.generate}">Generate</button></div>
        <div id="privateKey">
          <textarea name="privateKey" .value="${this.privateKey}"></textarea>
        </div>
        <div id="publicKey">
          <textarea name="publicKey" .value="${this.publicKey}"></textarea>
        </div>
      </div>
      <div id="root">
        <h3>Import keys</h3>
        <div><button @click="${this.import}">Import</button></div>
        <div id="privateKey">
          <textarea
            name="privateKeyImport"
            .value="${this.privateKey}"
          ></textarea>
        </div>
        <div id="publicKey">
          <textarea
            name="publicKeyImport"
            .value="${this.publicKey}"
          ></textarea>
        </div>
      </div>
    `;
  }
}

customElements.define("y-key-generator", Component);
