const handler = () => {
  console.log(2)
}

export default {
  handler,
  command: "add-dev",
  aliases: ["+d"],
  describe: "Install dependencies and save them in package.json#devDpendencies",
}