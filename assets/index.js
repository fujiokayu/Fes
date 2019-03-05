'use strict'

import Vue from 'vue'
import Vuesax from 'vuesax'
import { Cryptor } from "./cryptor.js"

Vue.use(Vuesax)


export async function decryptFile(data, passPhrase)
{
  const decryptor = new Cryptor('AES-CTR');
  await decryptor.generateNewKeyAndNonceFromPassPhrase(passPhrase);
  decryptor.setText(data);
  decryptor.decrypt();

  return decryptor.translatedText;
}

export async function encryptFile(data, passPhrase)
{
  const encryptor = new Cryptor('AES-CTR');
  await encryptor.generateNewKeyAndNonceFromPassPhrase(passPhrase);
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
