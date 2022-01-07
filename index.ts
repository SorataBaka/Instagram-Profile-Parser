import consola from "consola"
import entry from "./src/entry_point"

const username = process.argv[2]
if(!username) throw "Error: Username needs to be provided"
consola.info(username)
entry(username).catch((err:Error) => {
  consola.error(err)
  throw "Error: failed at entry"
})