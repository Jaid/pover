import exec from "lib/exec"
import getCommand from "lib/getCommand"

const handler = async argv => {
  const command = getCommand(argv, "add")
  exec(command.binary, [...command.args, ...argv.packages])
}

export default {
  handler,
  command: "add <packages...>",
  aliases: ["+", "save"],
  describe: "Install dependencies and save them in package.json#dependencies",
}