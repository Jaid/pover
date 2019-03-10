import path from "path"

import chalk from "chalk"
import figures from "figures"
import execa from "execa"
import ora from "ora"
import byline from "byline"
import stripAnsi from "strip-ansi"

const createAnsiString = (file, commandArgs) => {
  let line = chalk.bgGreenBright.black(`${figures.pointer} `)
  line += " "
  if (file.includes(path.sep)) {
    line += chalk.gray(`${path.dirname(file)}`)
    line += path.sep
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
    const execution = execa(file, commandArgs, {
      cwd: options.cwd,
      timeout: options.timeout,
    })

    if (options.ora) {
      const pipes = [
        {
          field: "stdout",
          event: text => options.ora.info(text),
          filter: text => {
            if (text.includes("0 vulnerabilities")) {
              return false
            }
            return true
          },
        },
        {
          field: "stderr",
          event: text => options.ora.warn(text),
          filter: text => {
            if (text.includes("SKIPPING OPTIONAL DEPENDENCY:")) {
              return false
            }
            return true
          },
        },
      ]

      for (const {field, event, filter} of pipes) {
        const emitter = byline(execution[field])
        emitter.on("data", line => {
          const textLine = String(line) |> stripAnsi |> #.trim()
          if (textLine.length > 0 && filter(textLine)) {
            event(textLine)
          }
        })
      }
    }

    await execution
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