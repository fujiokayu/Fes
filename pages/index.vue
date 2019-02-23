<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        Fes
      </h1>
      <h2 class="subtitle">
        a simple File Encription Service 
      </h2>
      <!-- https://www.tohuandkonsome.site/entry/2018/01/22/223224#dropvue%E3%81%AB%E3%83%89%E3%83%A9%E3%83%83%E3%82%B0--%E3%83%89%E3%83%AD%E3%83%83%E3%83%97%E3%81%A7%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E9%81%B8%E6%8A%9E%E3%82%92%E8%BF%BD%E5%8A%A0%E3%81%99%E3%82%8B -->
      <div class="drop" @dragleave.prevent @dragover.prevent @drop.prevent="onDrop">
        <label> chose, or drag your file here: 
          <input class="drop__input" type="file" multiple="multiple" @change="onDrop">
        </label>
      </div>

      <div class="links">
        <a
          href="https://github.com/fujiokayu/Fes"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import Vue from 'vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'

Vue.use(Vuesax)

export default {
  methods:{
  //input tag, or drag and drop will call; 
    onDrop:function(event){
      let fileList = event.target.files ? 
                     event.target.files:
                     event.dataTransfer.files;
      let files = [];
      for(let i = 0; i < fileList.length; i++){
          files.push(fileList[i]);
      }
    }
  },
  components: {
    AppLogo
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

