import which from "which"

const id = "lerna"
const binary = which.sync(id, {nothrow: true})

export default {
  id,
  binary,
  name: "Lerna",
  commands: {
    install: {
      binary,
      args: ["bootstrap", "--hoist"],
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
      binary: "npm",
      args: ["install", "--global"],
    },
    remove: {
      binary,
      args: ["uninstall"],
    },
    removeGlobal: {
      binary: "npm",
      args: ["uninstall", "--global"],
    },
    rebuild: {
      binary,
      args: ["bootstrap", "--hoist"],
    },
    run: {
      binary,
      args: ["run"],
    },
  },
}