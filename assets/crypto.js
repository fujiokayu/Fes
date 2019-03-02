import Vue from 'vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'

Vue.use(Vuesax)


function encryptByCBCMode( key, iv, text )
{
  return crypto.subtle.importKey('raw', key,
      { name: "AES-CBC" },
      false, ['encrypt'])
  .then( (k) => {
      return crypto.subtle.encrypt(
      {
          name: 'AES-CBC',
          iv: iv,
      },
      k, text)
  })
}


export async function decryptFile(text)
{
  return;
}

export async function encryptFile(text)
{
	let key = new Uint8Array(16);
  crypto.getRandomValues(key);
  console.log(String.fromCharCode.apply(null, key));
  let iv = crypto.getRandomValues(new Uint8Array(16));   

  let result = await encryptByCBCMode(key,iv,text)
  return result;
}


export function isSelected(self)
{
  if (self.files.length != 0){
    return true;
  }

  self.$vs.notify({
    title:"Chose file",
    color:"danger"
  })
  return false;
}
