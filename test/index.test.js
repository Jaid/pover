import path from "path"

import coffee from "coffee"

const main = path.resolve(process.env.MAIN)
console.log(main)

it("should run with 1 argument", () => coffee.fork(main, ["debug"])
  .expect("code", 0)
  .debug()
  .end())