import which from "which"

const id = "yarn"
const binary = which.sync(id, {nothrow: true})

export default {
  id,
  binary,
  name: "Yarn",
  commands: {
    install: {
      binary,
      args: ["install"],
    },
    add: {
      binary,
      args: ["add"],
    },
    addDev: {
      binary,
      args: ["add", "--dev"],
    },
    addGlobal: {
      binary,
      args: ["global", "add"],
    },
    remove: {
      binary,
      args: ["remove"],
    },
    removeGlobal: {
      binary,
      args: ["global", "remove"],
    },
    rebuild: {
      binary,
      args: ["install"],
    },
    run: {
      binary,
      args: ["run"],
    },
  },
}