import exec from "lib/exec"


const handler = async argv => {
  const [file, args] = packageManagers[argv.packageManager]
  await exec(file, [...args, {oraSpinner: true}])
}

export default {
  handler,
  command: "add",
  aliases: ["+", "save"],
  describe: "Install dependencies and save them in package.json#dependencies",
}