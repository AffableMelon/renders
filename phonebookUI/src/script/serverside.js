import axios from 'axios'
//const baseurl = 'http://localhost:3002/persons'

const get = (baseurl) => {
    const predata =axios.get(baseurl)
    return(predata.then((p) => {
      console.log(p.data)
      return(p.data)
    }))
}

const place =  (url, instance ) => {
  return(axios.put(url, instance).then( (r) => {
    return(r.data)
  }))
  }


const post = (url, object) => {
    const predata = axios.post(url, object)

    return(predata.then(p => p.data))
}

const remove = (url, id) => {
  const urlid = url + '/' + id

  const returnData = axios.delete(urlid).then( () => get(url)) //wait for delete to finish bc asynchronous.
 // const returnData = get(url) this wouldnt work alone bc delete didnt finish doing its thing on axios
  return(returnData) //finally return it from like 21
}

export default {get, post, remove, place}