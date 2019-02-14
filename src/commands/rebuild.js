const handler = () => {
  console.log(2)
}

export default {
  handler,
  command: "install-hard",
  aliases: ["hard-install"],
  describe: "Delete node_modules and lockfile and install fresh dependencies",
}