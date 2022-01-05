import entry from "./src/entry_point"

const username = process.argv[2]
if(!username) throw "Error: Username needs to be provided"
entry(username)