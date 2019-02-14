import exec from "lib/exec"

const handler = async argv => {
  console.log(argv)
  const commands = argv.packageManagers[argv.packageManager].commands
  const command = commands.install()
  exec(...command)
}

export default {
  handler,
  command: "install",
  aliases: ["i"],
  describe: "Build node_modules based on dependencies in package.json",
}