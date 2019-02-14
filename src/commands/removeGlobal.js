const handler = () => {
  console.log(2)
}

export default {
  handler,
  command: "remove-global",
  aliases: ["uninstall-global", "global-uninstall", "global-remove", "rg"],
  describe: "Uninstall global dependencies",
}