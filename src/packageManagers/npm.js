import which from "which"

const id = "npm"
const binary = which.sync(id, {nothrow: true})

export default {
  id,
  binary,
  name: id,
  commands: {
    install: {
      binary,
      args: ["install"],
    },
    add: {
      binary,
      args: ["install", "--save"],
    },
    addDev: {
      binary,
      args: ["install", "--save-dev"],
    },
    addGlobal: {
      binary,
      args: ["install", "--global"],
    },
    remove: {
      binary,
      args: ["uninstall"],
    },
    removeGlobal: {
      binary,
      args: ["uninstall", "--global"],
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