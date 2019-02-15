import exec from "lib/exec"
import getCommand from "lib/getCommand"

const handler = async argv => {
  console.log(argv, "install")
  const command = getCommand(argv)
  exec(command.binary, command.args)
}

export default {
  handler,
  command: "install",
  aliases: ["i"],
  describe: "Build node_modules based on dependencies in package.json",
}