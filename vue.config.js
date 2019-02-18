module.exports = {
  lintOnSave: false,
  devServer: {
    host: "0.0.0.0",
    port: 8888,
    https: false,
    hotOnly: false,
    open: true,
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理

    proxy: {
      "/api": {
        target: "http://api.zhuishushenqi.com", // target host
        ws: true, // proxy websockets
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          "^/api": "" // rewrite path
        }
      },
      "/chapter": {
        target: "http://chapter2.zhuishushenqi.com", // target host
        ws: true, // proxy websockets
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          "^/chapter": "" // rewrite path
        }
      }
    }
  }
};
