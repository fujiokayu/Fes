<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        Fes
      </h1>
      <h2 class="subtitle">
        simple File Encription Service 
      </h2>
      <!-- https://www.tohuandkonsome.site/entry/2018/01/22/223224#dropvue%E3%81%AB%E3%83%89%E3%83%A9%E3%83%83%E3%82%B0--%E3%83%89%E3%83%AD%E3%83%83%E3%83%97%E3%81%A7%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E9%81%B8%E6%8A%9E%E3%82%92%E8%BF%BD%E5%8A%A0%E3%81%99%E3%82%8B -->
      <div class="drop" @dragleave.prevent @dragover.prevent @drop.prevent="onDrop">
        <label> select, or drop your file: 
          <input class="drop__input" type="file" multiple="multiple" @change="onDrop">
        </label>
      </div>
      <div class="textArea">
          <vs-textarea width="550px" height="50px" label="enter your pass-phrase" v-model="textarea" />
      </div>

      <div class="buttons">
        <vs-button size="large" color="success" type="border" v-on:click="Encrypt">Encrypt</vs-button>
        <vs-button size="large" color="primary" type="border" v-on:click="Decrypt">Decrypt</vs-button>
      </div>
      <br>
      <vs-divider/>
      <div class="downloader">
        <a id="crypted" target="_blank">Download</a>
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import Vue from 'vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import {isReady, encryptFile, decryptFile} from 'assets/crypto.js'

Vue.use(Vuesax)

export default {
  data() {
    return {
      files:[],
      url:"",
      textarea: ''
    }
  },
  methods:{
    onDrop:function(event){
      // initialyze
      this.files = [];
      this.url = "";
      this.filename = "";

      let fileList = event.target.files ? 
                     event.target.files:
                     event.dataTransfer.files;
      for(let i = 0; i < fileList.length; i++){
          this.files.push(fileList[i]);
      }
    },
    
    Encrypt() {
      console.log("Encrypt " + this.files[0]);
      console.log("Encrypt " + this.textarea.value);
      if (!isReady(this))
      {
        return;
      }
      let reader = new FileReader;
      reader.readAsArrayBuffer(this.files[0]);
      let filename = this.files[0].name;
      let passPhrase = this.textarea;

      reader.onload = function(){
        encryptFile(reader.result, passPhrase).then( (res) => {
          let blob = new Blob([res], { type: 'application/octet-binary' });
          this.url = window.URL.createObjectURL(blob)
          let download_file = document.getElementById('crypted');
          download_file.download = filename + '_encrypted';
          download_file.href = this.url;
        })
      };
    },

    Decrypt() {
      console.log("Decrypt " + this.files[0]);
      if (!isReady(this))
      {
        return;
      }
      let reader = new FileReader;
      reader.readAsArrayBuffer(this.files[0]);
      let filename = this.files[0].name;
      let passPhrase = this.textarea;

      reader.onload = function(){
        decryptFile(reader.result, passPhrase).then( (res) => {
          let blob = new Blob([res], { type: 'application/octet-binary' });
          this.url = window.URL.createObjectURL(blob)
          let download_file = document.getElementById('crypted');
          download_file.download = filename + '_decrypted';
          download_file.href = this.url;
        })
      };
    }
  },

  components: {
    AppLogo
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 10%;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #ffffff;
  letter-spacing: 1px;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 16%;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.drop {
  font-weight: 300;
  font-size: 24px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.textArea {
  font-weight: 300;
  font-size: 24px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.buttons {
  padding-top: 10px;
}

.downloader {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  font-weight: 300;
  font-size: 18px;
  color: #32aa56;
  word-spacing: 5px;
  padding-bottom: 15px;
}

</style>

