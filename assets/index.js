'use strict'

import Vue from 'vue'
import Vuesax from 'vuesax'
import { Cryptor } from "./cryptor.js"

Vue.use(Vuesax)

const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024// 2GB

async function decryptFile(data, passPhrase)
{
  const decryptor = new Cryptor('AES-CTR');
  await decryptor.generateNewKeyAndNonceFromPassPhrase(passPhrase);
  decryptor.setText(data);
  decryptor.decrypt();

  return decryptor.translatedText;
}

async function encryptFile(data, passPhrase)
{
  const encryptor = new Cryptor('AES-CTR');
  await encryptor.generateNewKeyAndNonceFromPassPhrase(passPhrase);
  encryptor.setText(data);
  encryptor.encrypt();

  return encryptor.translatedText;
}

function checkFileSize(_this, size)
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

function isReady(_this)
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

export function execute(self)
{
  if (!isReady(self))
  {
    return;
  }
  let reader = new FileReader;
  reader.readAsArrayBuffer(self.files[0]);

  let filename = self.files[0].name;
  let passPhrase = self.textarea;
  let _this = self;

  reader.onload = function(){
    if (!checkFileSize(_this, reader.result.byteLength))
    {
      return;
    }
    if (_this.isEncrypt)
    {
      encryptFile(reader.result, passPhrase).then( (res) => {
        let blob = new Blob([res], { type: 'application/octet-binary' });
        let download_file = document.getElementById('crypted');
        download_file.download = filename + '_encrypted';
        download_file.href = window.URL.createObjectURL(blob);
      })  
    }
    else
    {
      decryptFile(reader.result, passPhrase).then( (res) => {
        let blob = new Blob([res], { type: 'application/octet-binary' });
        let download_file = document.getElementById('crypted');
        download_file.download = filename + '_decrypted';
        download_file.href = window.URL.createObjectURL(blob);
      })
    }
  };

}