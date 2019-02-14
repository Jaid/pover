const handler = () => {
  console.log(2)
}

export default {
  handler,
  command: "run",
  aliases: ["r"],
  describe: "Run commands from package.json#scripts",
}