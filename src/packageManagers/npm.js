import which from "which"

const binary = which.sync("npm", {nothrow: true})

export default {
  binary,
  name: "npm",
  commands: {
    install: () => [binary, "install"],
  },
}