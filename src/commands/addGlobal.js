import exec from "lib/exec"
import getCommand from "lib/getCommand"

const handler = async argv => {
  const command = getCommand(argv, "addGlobal")
  await exec(command.binary, [...command.args, ...argv.packages])
}

export default {
  handler,
  command: "add-global <packages...>",
  aliases: ["global-add", "+g"],
  describe: "Install global dependencies",
}