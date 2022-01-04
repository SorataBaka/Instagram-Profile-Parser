import downloadFile from "./write_file"
const processQuery = async(readFile:any, username:string) => {
  const timelineMedia = readFile.data.user.edge_owner_to_timeline_media.edges
  for(const media of timelineMedia){
    var url
    var imageName = media.node.shortcode
    var type = 0
    if(media.node.is_video === true){
      url = media.node.video_url
      type = 2
    }else{
      url = media.node.display_url
      type = 1
    }
    await downloadFile(url, imageName, type, username).catch((err:Error) => {
      console.log(err)
      throw "Error: failed at download"
    })
  }
}
export default processQuery