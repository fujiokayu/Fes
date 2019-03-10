const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Fes',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'file encryption service' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=2' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    plugins: [
      // webpack-obfuscator
      // reference: https://hi120ki.github.io/blog/posts/20190207/
      new JavaScriptObfuscator({
        // JavaScript obfuscator option
        stringArrayEncoding: true,
        stringArrayThreshold: 1,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.2
      })
    ]
  }
}

