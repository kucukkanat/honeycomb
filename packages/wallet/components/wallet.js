import {html,css,LitElement} from "../lib/lit.js"
import {ExportPrivateKey,GenerateKey,ExportPublicKey,ImportPrivateKey} from "../crypto.js"

export class Wallet extends LitElement {
    static get styles(){
        return [
            css`
                button {
                    padding: 5px;
                    font-size:14px;
                    border: 1px solid #ddd;
                }
            `
        ]
    }
    generate(){ 

    }
    render() {
        return html`
            <div>
                <button @click=${this.generate}>Generate keypair</button>
            </div>
        `
    }
}