import exec from "lib/exec"
import getCommand from "lib/getCommand"

const handler = async argv => {
  const command = getCommand(argv, "remove")
  exec(command.binary, [...command.args, ...argv.packages])
}

export default {
  handler,
  command: "remove <packages...>",
  aliases: ["uninstall", "r"],
  describe: "Uninstall dependencies and remove them from package.json",
}