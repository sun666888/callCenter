import axios from 'axios'

let token = localStorage.getItem('token')
axios.defaults.headers['token'] = token;

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
// http response 全局拦截
axios.interceptors.response.use(
    response => {
      if (response.data) {
        if (!response.data.code) {
          return Promise.resolve(response.data)
        }
        switch (response.data.code) {
          case 0:
            return Promise.resolve(response.data)
          case 102:
            return Promise.resolve(response.data)
          case 200:
            return Promise.resolve(response.data)
          case 401:
            Navigator.go(-1)
            break
          case 400:
            return Promise.resolve(response.data)
          case 500:
            return Promise.reject(response.data)
          default:  
            return Promise.resolve(response.data)
        }
      } else {
        return Promise.resolve(response)
      }
    },
    error => {
      return Promise.resolve(error)
    }
)

export default axios
