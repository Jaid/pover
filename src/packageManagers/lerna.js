import which from "which"

const id = "npm"
const binary = which.sync("npm", {nothrow: true})

export default {
  binary,
  name: "npm",
  commands: {
    install: () => [binary, "install"],
  },
}