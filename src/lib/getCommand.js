import {camelCase} from "lodash"

export default (argv, commandId) => {
  if (!commandId) {
    commandId = camelCase(argv._[0])
  }
  const packageManager = argv.packageManagers[argv.packageManager]
  if (!packageManager) {
    throw new Error(`Invalid package manager "${argv.packageManager}"`)
  }
  if (!packageManager.binary) {
    throw new Error(`No binary found for package manager "${packageManager.id}"`)
  }
  const command = packageManager.commands[commandId]
  if (!command) {
    throw new Error(`Command "${commandId}" is not implemented for package manager "${argv.packageManager}"`)
  }
  if (typeof command === "function") {
    return command(argv)
  } else {
    return command
  }
}