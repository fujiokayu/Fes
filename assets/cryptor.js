'use strict'

//http://qnimate.com/passphrase-based-encryption-using-web-cryptography-api/
export class Cryptor {

  constructor(mode) 
  {
    console.log("Cryptor created");
    this.mode = mode;
  }

  _convertStringToArrayBufferView(str)
  {
    let bytes = new Uint8Array(str.length);
    for (var iii = 0; iii < str.length; iii++) 
    {
        bytes[iii] = str.charCodeAt(iii);
    }

    return bytes;
  }

  setKey(key)
  {
    this.key = key;
  }

  getKey()
  {
    return this.key;
  }

  async generateNewKey()
  {
    this.key = await window.crypto.subtle.generateKey(
      {
        name: this.mode,
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );
  }

  async generateNewKeyAndNonceFromPassPhrase(passPhrase)
  {
    let mode = this.mode;
    let digest = await crypto.subtle.digest({name: "SHA-256"}, this._convertStringToArrayBufferView(passPhrase))
    let key;
    await window.crypto.subtle.importKey("raw", digest, {
        name: mode,
    }, false, ["encrypt", "decrypt"]).then(function(e){
      key = e;},
        function(e){
        console.log(e);
    });

    this.key = key;
    this.nonce = digest.slice(16);
  }

  setNonce(nonce)
  {
    this.nonce = nonce;
  }
  
  setText(text)
  {
    this.text = text;
  }
  
  setMode(mode)
  {
    this.mode = mode;
  }
  
  encrypt()
  {
    this.translatedText = crypto.subtle.encrypt(
      {
        name: this.mode,
        counter: this.nonce,
        length: 128
      },
      this.key, this.text)
  }

  decrypt()
  {
    this.translatedText = crypto.subtle.decrypt({
      name: this.mode,
      counter: this.nonce,
      length: 128
    },
    this.key, this.text)
  }
}
