import axios from 'axios'
import { history } from 'index'
// import store from 'store'
// import { notification } from 'antd'

export const imageUrl = "https://143.244.181.77:3000/images/"

export const numberFormat = (value) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(value);

const apiClient = axios.create({
  baseURL: 'https://143.244.181.77:3000/api/v1/admin/',
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' }
})

apiClient.interceptors.request.use(request => {
  const userData = JSON.parse(localStorage.getItem('trinxer_admin'))
  if (userData && userData.data) {
    // request.headers.Authorization = `Bearer ${userData.token}`
    request.headers.token = userData.data.token
  }
  return request
})

apiClient.interceptors.response.use(undefined, error => {
  // Errors handling
  const { response } = error
  console.log(error, response)
  return response

  // if (response.status_code === 401 && response.message === "Token has expired") {
  //   localStorage.removeItem('trinxer_admin')
  //   history.push("/auth/login")
  // }
})

export default apiClient
