import yargs from "yargs"
import guessPackageManager from "guess-package-manager"

const job = async args => {
  const packageManagers = {}
  const packageManagersRequire = require.context("./packageManagers", false, /\.js$/)
  for (const module of packageManagersRequire.keys()) {
    const packageManager = packageManagersRequire(module).default
    packageManagers[packageManager.id] = packageManager
  }

  const cli = yargs
    .usage("Usage: $0 <command> [options]")
    .option("package-manager", {
      demandOption: true,
      default: guessPackageManager(),
      choices: ["npm", "pnpm", "yarn"],
    })
    .middleware(argv => {
      argv.packageManagers = packageManagers
    })

  const commandsRequire = require.context("./commands", false, /\.js$/)
  for (const module of commandsRequire.keys()) {
    cli.command(commandsRequire(module).default)
  }

  const {argv} = cli
    .recommendCommands()
    .demandCommand()
    .scriptName(_PKG_NAME)
    .version(_PKG_VERSION)
    .help()
}

job(process.argv)