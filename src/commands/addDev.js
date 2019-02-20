import exec from "lib/exec"
import getCommand from "lib/getCommand"

const handler = async argv => {
  const command = getCommand(argv, "addDev")
  await exec(command.binary, [...command.args, ...argv.packages])
}

export default {
  handler,
  command: "add-dev <packages...>",
  aliases: ["+d"],
  describe: "Install dependencies and save them in package.json#devDpendencies",
}