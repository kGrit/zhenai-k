module.exports = {
  configureWebpack: {
    devServer: {
      port: 3003,
      open: true
    },
    resolve: {
      alias: {
        components: '@/components'
      }
    }
  }
}
