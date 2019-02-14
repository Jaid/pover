import path from "path"

import coffee from "coffee"

const main = path.resolve(process.env.MAIN)
console.log(main)

it("should run with 1 argument", () => coffee.fork(main)
  .expect("code", 0)
  .end())