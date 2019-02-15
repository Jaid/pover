import path from "path"

import coffee from "coffee"

const main = path.resolve(process.env.MAIN)
console.log(main)

it("should run internal command", () => coffee.fork(main, ["debug"])
  .expect("code", 0)
  .debug()
  .end())

it("should run external command (npm install)", () => coffee.fork(main, ["i"])
  .expect("code", 0)
  .debug()
  .end())