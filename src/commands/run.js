import exec from "lib/exec"
import getCommand from "lib/getCommand"
import readPkg from "read-pkg"
import chalk from "chalk"

const handler = async argv => {
  const command = getCommand(argv, "run")
  const pkg = await readPkg()
  if (pkg?.scripts?.[argv.scriptName]) {
    console.log(chalk.green(`  ↱ ${pkg.scripts[argv.scriptName]}`))
  }
  await exec(command.binary, [...command.args, argv.scriptName])
}

export default {
  handler,
  command: "run <scriptName>",
  aliases: ["*"],
  describe: "Run commands from package.json#scripts",
}