const path = require("path");
module.exports = {
  devServer: {
    proxy: "http://localhost:3000", // Replace with the actual URL of your API
  },
  outputDir: path.resolve(__dirname, "../server/client_app"),

  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Data Lake Task";
      return args;
    });
  },
  transpileDependencies: ["vuetify"],
};
