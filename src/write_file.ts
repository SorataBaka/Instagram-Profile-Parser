import fs from "fs"
import axios from "axios"
const downloadFile = async(url:string, name:string, type:number, username:string) =>{
  const query = await axios.request({
    url: url,
    method: "GET",
    responseType: "arraybuffer"
  }).catch((err:Error) => {return undefined})
  if(!query) return
  if(type == 1){
    //Is photo
    fs.writeFileSync(`./output/${username}Profile/${name}.jpeg`, query.data)
    console.log(`Writing Photo: ${name}.jpeg `)
  }else if(type == 2){
    fs.writeFileSync(`./output/${username}Profile/${name}.mp4`, query.data)
    console.log(`Writing Video: ${name}.mp4`)
  }
}
export default downloadFile