import exec from "lib/exec"
import getCommand from "lib/getCommand"

const handler = async argv => {
  const command = getCommand(argv, "removeGlobal")
  await exec(command.binary, [...command.args, ...argv.packages])
}

export default {
  handler,
  command: "remove-global <packages...>",
  aliases: ["uninstall-global", "global-uninstall", "global-remove", "rg"],
  describe: "Uninstall global dependencies",
}