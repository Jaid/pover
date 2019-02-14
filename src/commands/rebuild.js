import path from "path"

import exec from "lib/exec"
import getCommand from "lib/getCommand"
import fsp from "@absolunet/fsp"

const handler = async argv => {
  const command = getCommand(argv)
  await Promise.all([fsp.emptyDir(path.resolve("node_modules"))])
  exec(command.binary, command.args)
}

export default {
  handler,
  command: "install-hard",
  aliases: ["hard-install"],
  describe: "Delete node_modules and lockfile and install fresh dependencies",
}