import which from "which"

const 
const binary = which.sync("npm", {nothrow: true})

export default {
  binary,
  name: "npm",
  commands: {
    install: () => [binary, "install"],
  },
}