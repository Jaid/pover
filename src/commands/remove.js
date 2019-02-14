const handler = () => {
  console.log(2)
}

export default {
  handler,
  command: "remove",
  aliases: ["uninstall", "r"],
  describe: "Uninstall dependencies and remove them from package.json",
}