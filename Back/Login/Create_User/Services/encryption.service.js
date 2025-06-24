import xpath from 'xpath';
import { DOMParser } from 'xmldom';

export class EncryptionService {
    constructor(encryptionUrl) {
        this.encryptionUrl = encryptionUrl;
    }

    async encrypt(phone, password) {
        const response = await fetch(this.encryptionUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'text/xml'
            },
            body: this.createSoapEnvelope(phone, password)
        });

        return this.parseEncryptionResponse(await response.text());
    }

    createSoapEnvelope(phone, password) {
        return `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <EncryptRequest xmlns="http://encrypt.com/">
                    <phone>${phone}</phone>
                    <password>${password}</password>
                    </EncryptRequest>
                </soap:Body>
                </soap:Envelope>`;
    }

    parseEncryptionResponse(responseText) {
        const doc = new DOMParser().parseFromString(responseText);
        const select = xpath.useNamespaces({
            "soap": "http://schemas.xmlsoap.org/soap/envelope/",
            "enc": "http://encrypt.com/"
        });

        return {
            encryptedPhone: select("//enc:EncryptedPhone/text()", doc)[0]?.nodeValue,
            encryptedPassword: select("//enc:EncryptedPassword/text()", doc)[0]?.nodeValue
        };
    }
}