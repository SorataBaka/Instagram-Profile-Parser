
import getJSON from "./get_query"
import processQuery from "./process_query"
import axios from "axios"
import fs from "fs"

const recursive = async(parameter:any, readFile:any, username:string) => {
  if(readFile.data.user.edge_owner_to_timeline_media.page_info.has_next_page){
    const newParameter = {
      id: parameter.id,
      query_hash: parameter.query_hash,
      after: readFile.data.user.edge_owner_to_timeline_media.page_info.end_cursor
    }
    const newReadFile = await getJSON(newParameter)
    await processQuery(newReadFile, username)
    recursive(newParameter, newReadFile, username)
  }
}
const execute = async(username:string) => {
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
    query_hash: "f2405b236d85e8296cf30347c9f08c2a"
  }
  const readFile = await getJSON(parameter).catch((err:any) => {
    throw "Error: Error at fetching metadata"
  })
  await processQuery(readFile, username).catch((err:any) => {
    throw "Error: Error at processing query"
  })
  recursive(parameter, readFile, username)
}
execute("jen2jen2")
