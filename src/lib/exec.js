import path from "path"

import chalk from "chalk"
import figures from "figures"
import execa from "execa"
import ora from "ora"

const createAnsiString = (file, commandArgs) => {
  let line = chalk.bgGreenBright.black(`${figures.pointer} `)
  line += " "
  if (file.includes(path.sep)) {
    line += chalk.gray(`${path.dirname(file)}/`)
    line += chalk.bold(path.basename(file))
  } else {
    line += chalk.bold(file)
  }
  line += " "
  line += commandArgs
    .map(arg => {
      if (arg.includes("'") || arg.includes("\"") || arg.includes(" ")) {
        return chalk.yellow(arg)
      }
      if (arg.startsWith("-")) {
        return chalk.cyan(arg)
      }
      return arg
    }).join(" ")
  return line
}

export default async (file, args) => {
  const options = {
    ora: true,
    oraFps: 10,
    cwd: process.cwd(),
    timeout: 180 * 1000,
  }
  const commandArgs = []
  for (const arg of args) {
    if (typeof arg === "string") {
      commandArgs.push(arg)
    } else if (typeof arg === "object") {
      Object.assign(options, arg)
    }
  }
  let interval
  if (options.ora === true) {
    options.ora = ora().start()
  }
  if (options.ora) {
    options.ora.text = createAnsiString(file, commandArgs)
    interval = setInterval(() => {
      options.ora.render()
    }, 1000 / options.oraFps)
  }
  try {
    await execa(file, commandArgs, {
      cwd: options.cwd,
      timeout: options.timeout,
    })
  } catch (error) {
    if (options.ora) {
      if (error?.code) {
        options.ora.fail(`${options.ora.text} ${chalk.red(`= ${error.code}`)}`)
        console.error(chalk.red(error.message))
      }
    }
    return false
  } finally {
    if (options.ora) {
      clearInterval(interval)
    }
  }
  if (options.ora) {
    options.ora.succeed()
  }
  return true
}