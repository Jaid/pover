import exec from "lib/exec"
import getCommand from "lib/getCommand"

const handler = async argv => {
  const command = getCommand(argv, "run")
  exec(command.binary, [...command.args, argv.scriptName])
}

export default {
  handler,
  command: "run <scriptName>",
  aliases: ["*"],
  describe: "Run commands from package.json#scripts",
}