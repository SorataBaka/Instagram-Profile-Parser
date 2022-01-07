
import getJSON from "./get_query"
import processQuery from "./process_query"
import axios from "axios"
import fs from "fs"
import consola from "consola"
const recursive = async(parameter:any, readFile:any, username:string) => {
  if(readFile.data.user.edge_owner_to_timeline_media.page_info.has_next_page){
    const newParameter = {
      id: parameter.id,
      query_hash: parameter.query_hash,
      after: readFile.data.user.edge_owner_to_timeline_media.page_info.end_cursor
    }
    const newReadFile = await getJSON(newParameter)
    if(!newReadFile) throw "Error: Error at fetching metadata"
    await processQuery(newReadFile, username).catch((err:any) => {
      consola.error(err)
      throw "Error: Error at processing query"
    })
    await recursive(newParameter, newReadFile, username).catch((err:any) => {
      consola.error(err)
      throw "Error: Error at recursive"
    })
  }
}
const execute = async(username:string) => {
  if(!username) throw "Error: No instagram profile provided. `npm start {profile name}`"
  if(!fs.existsSync("./output")) fs.mkdirSync("./output")
  if(!fs.existsSync(`./output/${username}Profile`))fs.mkdirSync(`./output/${username}Profile`)

  const idquery = await axios.request({
    url: `https://www.instagram.com/${username}/?__a=1`,
    method: "GET"
  }).catch((err:Error) => {return undefined})

  if(!idquery) throw "Error: user id fetch failed"
  if(!idquery.data) throw "Error: user not found"

  const userid = idquery.data.graphql.user.id
  const parameter = {
    id: userid,
    query_hash: "8c2a529969ee035a5063f2fc8602a0fd"
  }
  const readFile = await getJSON(parameter).catch((err:any) => {
    consola.error(err)
    throw "Error: Error at fetching metadata"
  })
  if(!readFile) throw "Error: Error at fetching metadata"
  await processQuery(readFile, username).catch((err:any) => {
    consola.error(err)
    throw "Error: Error at processing query"
  })
  await recursive(parameter, readFile, username).catch((err:any) => {
    consola.error(err)
    throw "Error: Error at recursive"
  })
  consola.info("Finished parsing profile")
  consola.info("Output at directory: ")
  consola.info(__dirname + `\\..\\output\\${username}Profile`)
}
export default execute