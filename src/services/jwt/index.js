import { history } from 'index'
import apiClient from '../axios'


// login api
export async function login(email, password) {
  return apiClient
    .post('auth/login', {
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

// update admin profile api
export async function updateProfile(data) {
  return apiClient
    .put('/profile', data)
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

// activate admin api
export async function deleteBlog(id) {
  return apiClient
    .delete(`/blogPost/${id}`)
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

// get stats api
export async function getStats() {
  return apiClient
    .get('/stat')
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

// get all roles api
export async function allRoles() {
  return apiClient
    .get('/role')
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

// update role api
export async function updateRole(data) {
  return apiClient
    .put('/role', data)
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

// create role api
export async function createRole(data) {
  return apiClient
    .post('/role', data)
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

// get all categories api
export async function allCategories() {
  return apiClient
    .get('/product/category')
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

// get all categories api
export async function allParentCategories() {
  return apiClient
    .get('/product/category/parent')
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

// update category api
export async function updateCategory(data) {
  return apiClient
    .put('/product/category', data)
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

// create category api
export async function createCategory(data) {
  return apiClient
    .post('/product/category', data)
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

// get all product api
export async function allProducts() {
  return apiClient
    .get('/product')
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

// update product api
export async function updateProduct(data) {
  return apiClient
    .put('/product', data)
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

// create product api
export async function createProduct(data) {
  return apiClient
    .post('/product', data)
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

// get all services api
export async function allServices() {
  return apiClient
    .get('/service')
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

// update service api
export async function updateService(data) {
  return apiClient
    .put('/service', data)
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

// update service api
export async function createService(data) {
  return apiClient
    .post('/service', data)
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

// get all messages api
export async function allMessages(payload) {
  return apiClient
    .get(`/message?limit=${payload.limit}&offset=${payload.offset}`)
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

// search all messages api
export async function searchMessages(term) {
  return apiClient
    .get(`/message/find?searchTerm=${term}`)
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

// get Contact api
export async function getContact() {
  return apiClient
    .get('/setting/contact')
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

// update contact api
export async function updateContact(data) {
  return apiClient
    .put('/setting/contact', data)
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

// get Header api
export async function getHeader() {
  return apiClient
    .get('/setting/header')
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

// update Header api
export async function updateHeader(data) {
  return apiClient
    .put('/setting/header', data)
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

// get About api
export async function getAbout() {
  return apiClient
    .get('/setting/about')
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

// update About api
export async function updateAbout(data) {
  return apiClient
    .put('/setting/about', data)
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

// get Who we are api
export async function getWhoWeAre() {
  return apiClient
    .get('/setting/who_we_are')
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

// update who we are api
export async function updateWhoWeAre(data) {
  return apiClient
    .put('/setting/who_we_are', data)
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

// get Private Labelling api
export async function getLabelling() {
  return apiClient
    .get('/setting/private_label')
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

// update private labelling api
export async function updateLabelling(data) {
  return apiClient
    .put('/setting/private_label', data)
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

// get Social Responsibility api
export async function getResponsibility() {
  return apiClient
    .get('/setting/social_res')
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

// update social responsibility api
export async function updateResponsibility(data) {
  return apiClient
    .put('/setting/social_res', data)
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