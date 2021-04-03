# this repository is no longer maintained

<img src="https://github.com/fujiokayu/Fes/blob/images/Fes.png" width="400">

# Fes
is a free File Encryption Service by using [Nuxt.js](https://nuxtjs.org/).

## Features
- This application can encrypt / decrypt files by using pass-phrase encryption.  
- Encryption with AES CTR mode.

## Note:
Encript / Decrypt programs run by client-side.  
So, there are 2 problems, at least.  
1. Encryption logic is obviously to everyone. So anyone can know how the key and the nonce generates.  
1. Using client resource without any confirm.

## How To Start

```
git clone https://github.com/fujiokayu/Fes.git && cd Fes
npm install
npm run dev
```

## How To Use

~visit https://f-es.herokuapp.com/~
