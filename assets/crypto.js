import Vue from 'vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'

Vue.use(Vuesax)


//http://qnimate.com/passphrase-based-encryption-using-web-cryptography-api/
class Cryptor {

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

  async generateNewKeyAndIVFromPassPhrase(passPhrase)
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
    this.iv = digest.slice(16);
  }

  setIV(iv)
  {
    this.iv = iv;
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
          iv: this.iv,
      },
      this.key, this.text)
  }

  decrypt()
  {
    this.translatedText = crypto.subtle.decrypt(
      {
          name: this.mode,
          iv: this.iv,
      },
      this.key, this.text)
  }
}


export async function decryptFile(data, passPhrase)
{
  const decryptor = new Cryptor('AES-CBC');
  await decryptor.generateNewKeyAndIVFromPassPhrase(passPhrase);
  decryptor.setText(data);
  decryptor.decrypt();

  return decryptor.translatedText;
}

export async function encryptFile(data, passPhrase)
{
  const encryptor = new Cryptor('AES-CBC');
  await encryptor.generateNewKeyAndIVFromPassPhrase(passPhrase);
  encryptor.setText(data);
  encryptor.encrypt();

  return encryptor.translatedText;
}

export function isReady(self)
{
  if (self.files.length != 0 && self.textarea.length != 0)
  {
    return true;
  }

  if (self.files.length == 0)
  {
    self.$vs.notify({
      title:"File is not selected",
      color:"danger"
    })  
  }
  if (self.textarea.length == 0)
  {
    self.$vs.notify({
      title:"Pass-phrase is not filled",
      color:"danger"
    })  
  }

  return false;
}
