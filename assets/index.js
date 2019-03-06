'use strict'

import Vue from 'vue'
import Vuesax from 'vuesax'
import { Cryptor } from "./cryptor.js"

Vue.use(Vuesax)

const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024// 2GB

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

export function checkFileSize(_this, size)
{
  if (size < MAX_FILE_SIZE)
  {
    return true;
  }

  _this.$vs.notify({
    title:"Cannot deal with large file, over 2GB ",
    color:"danger"
  })

  return false;
}

export function isReady(_this)
{
  if (_this.files.length != 0 && _this.textarea.length != 0)
  {
    return true;
  }

  if (_this.files.length == 0)
  {
    _this.$vs.notify({
      title:"File is not selected",
      color:"danger"
    })  
  }
  if (_this.textarea.length == 0)
  {
    _this.$vs.notify({
      title:"Pass-phrase is not filled",
      color:"danger"
    })  
  }

  return false;
}
