const configure = require("webpack-config-jaid").configureCli

module.exports = configure({
  publishimo: {fetchGithub: true},
})