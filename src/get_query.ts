import axios from "axios"
import consolaGlobalInstance from "consola"
import consola from "consola"
interface parameter {
  id: string
  query_hash: string
  after ? : string
}
const getJSON = async (PARAMETERS: parameter) => {
  if (!PARAMETERS.id || !PARAMETERS.query_hash) throw "Error: Insuffcient parameters provided"
  var variables: any | string
  if (PARAMETERS.after) {
    variables = {
      "id": PARAMETERS.id,
      "first": 100,
      "after": PARAMETERS.after
    }
  } else {
    variables = {
      "id": PARAMETERS.id,
      "first": 100
    }
  }
  variables = encodeURIComponent(JSON.stringify(variables))
  const baseURL = `https://www.instagram.com/graphql/query/?query_hash=${PARAMETERS.query_hash}&variables=${variables}`
  consolaGlobalInstance.info(baseURL)
  const query = await axios.request({
    url: baseURL,
    method: "GET",
    // headers: {
    //   "cookie": "sessionid=550166403%3A2FNnCerwGKcslx%3A17;"
    // },

    responseType: "json"
  }).catch(err => {
    consola.error(err)
    return undefined
  })
  if (query === undefined) return undefined
  return query.data
}
export default getJSON