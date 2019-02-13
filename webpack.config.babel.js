import {configureLib} from "webpack-config-jaid"

export default configureLib({
  documentation: true,
  publishimo: {fetchGithub: true},
})