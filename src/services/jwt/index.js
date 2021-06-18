import { history } from 'index'
import apiClient from '../axios'
// import store from 'store'

// login api
export async function login(email, password) {
  return apiClient
    .post('/auth/login', {
      email,
      password,
    })
    .then(response => {
      if (response) {
        const { data, status } = response
        if (status) {
          localStorage.setItem('trinxer_admin', JSON.stringify(data))
          return response.data
        }
      }
      return false
    })
    .catch(err => console.log(err))
}

// register function
export async function register(payload) {
  return apiClient
    .post('/auth/register', payload)
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

// forgot password
export async function forgotPassword(email) {
  return apiClient
    .post('/auth/forgot_password', { email })
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

// reset password
export async function resetPassword(data) {
  return apiClient
    .post('/auth/reset_password', data)
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

// logout function
export async function logout() {
  localStorage.removeItem('trinxer_admin')
  localStorage.removeItem('admin_profile')
  history.push('/auth/login')
}

// get all admin api
export async function allAdmins() {
  return apiClient
    .get('/admin')
    .then(response => {
      if (response) {
        const { data, status } = response
        if (status) {
          return data
        }
      }
      return false
    })
    .catch(err => console.log(err))
}

// delete admin api
export async function deleteAdmin(adminId) {
  return apiClient
    .delete('/admin', {data:{adminId}})
    .then(response => {
      if (response) {
        const { data, status } = response
        if (status) {
          return data
        }
      }
      return false
    })
    .catch(err => console.log(err))
}

// update admin api
export async function updateAdmin(data) {
  return apiClient
    .put('/admin', data)
    .then(response => {
      if (response) {
        const { data, status } = response
        if (status) {
          return data
        }
      }
      return false
    })
    .catch(err => console.log(err))
}

// update admin api
export async function createAdmin(data) {
  return apiClient
    .post('/admin', data)
    .then(response => {
      if (response) {
        const { data, status } = response
        if (status) {
          return data
        }
      }
      return false
    })
    .catch(err => console.log(err))
}

// activate admin api
export async function activateAdmin(data) {
  return apiClient
    .put(`/admin/${data.status}`, {adminId: data.id})
    .then(response => {
      if (response) {
        const { data, status } = response
        if (status) {
          return data
        }
      }
      return false
    })
    .catch(err => console.log(err))
}

// current admin profile api
export async function currentUser(data) {
  return apiClient
    .get('/profile')
    .then(response => {
      if (response) {
        const { data, status } = response
        if (status) {
          return data
        }
      }
      return false
    })
    .catch(err => console.log(err))
}

// all blogs api
export async function allBlogs() {
  return apiClient
    .get('/blogPost')
    .then(response => {
      if (response) {
        const { data, status } = response
        if (status) {
          return data
        }
      }
      return false
    })
    .catch(err => console.log(err))
}

// create blog post api
export async function createBlog(data) {
  return apiClient
    .post('/blogPost', data)
    .then(response => {
      if (response) {
        const { data, status } = response
        if (status) {
          return data
        }
      }
      return false
    })
    .catch(err => console.log(err))
}

// update blog api
export async function updateBlog(data) {
  return apiClient
    .put('/blogPost', data)
    .then(response => {
      if (response) {
        const { data, status } = response
        if (status) {
          return data
        }
      }
      return false
    })
    .catch(err => console.log(err))
}

// activate admin api
export async function publishBlog(data) {
  return apiClient
    .put(`/blogPost/${data.status}`, {postId: data.id})
    .then(response => {
      if (response) {
        const { data, status } = response
        if (status) {
          return data
        }
      }
      return false
    })
    .catch(err => console.log(err))
}