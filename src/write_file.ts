import fs from "fs"
import axios from "axios"
import consola from "consola"
const downloadFile = async(url:string, name:string, type:number, username:string) =>{
  const query = await axios.request({
    url: url,
    method: "GET",
    responseType: "arraybuffer"
  }).catch((err:Error) => {return undefined})
  if(!query) return
  if(type == 1){
    //Is photo
    if(fs.existsSync(`./output/${username}Profile/${name}.jpeg`)){
      consola.info(`Exists File: ${name}.jpeg. Skipping File.`)
      return
    }
    fs.writeFileSync(`./output/${username}Profile/${name}.jpeg`, query.data)
    consola.info(`Writing Photo: ${name}.jpeg`)
  }else if(type == 2){
    if(fs.existsSync(`./output/${username}Profile/${name}.mp4`)){
      consola.info(`Exists File: ${name}.mp4. Skipping File.`)
      return
    }
    fs.writeFileSync(`./output/${username}Profile/${name}.mp4`, query.data)
    consola.info(`Writing Video: ${name}.mp4`)
  }
}
export default downloadFile