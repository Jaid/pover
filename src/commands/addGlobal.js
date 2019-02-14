const handler = () => {
  console.log(2)
}

export default {
  handler,
  command: "add-global",
  aliases: ["global-add", "+g"],
  describe: "Install global dependencies",
}