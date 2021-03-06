// import axios from 'axios'
// import { history } from 'index'
// import apiClient from '../axios'
// import store from 'store'

const siteURL = 'https://trinxer.tk/api/v1/site/'

export async function publicBlogs(payload) {
    try {
        let response = await fetch(`${siteURL}blog?offset=${payload.offset}&limit=${payload.limit}`);
        let data = await response.json();
        return data
      } catch(err) {
        // catches errors both in fetch and response.json
        console.log(err);
    }
}
  
export const fetchTeam = async() =>{
    try {
        let response = await fetch(`${siteURL}team`);
        let data = await response.json();
        return data

      } catch(err) {
        // catches errors both in fetch and response.json
        console.log(err);
        return err
      }
}

export const fetchSetting = async() =>{
  try {
      let response = await fetch(`${siteURL}setting`);
      let data = await response.json();
      return data

    } catch(err) {
      // catches errors both in fetch and response.json
      console.log(err);
      return err
    }
}

export const fetchService = async() =>{
    try {
        let response = await fetch(`${siteURL}service`);
        let data = await response.json();
        return data
      } catch(err) {
        // catches errors both in fetch and response.json
        console.log(err);
      }
}

export const searchBlog = async(term) =>{
  try {
      let response = await fetch(`${siteURL}blog/search?term=${term}`);
      let data = await response.json();
      return data
    } catch(err) {
      // catches errors both in fetch and response.json
      console.log(err);
    }
}

export const fetchSingleBlog = async(id) =>{
  try {
      let response = await fetch(`${siteURL}blog/${id}`);
      let data = await response.json();
      return data
    } catch(err) {
      // catches errors both in fetch and response.json
      console.log(err);
    }
}

export const fetchPopularBlog = async() =>{
  try {
      let response = await fetch(`${siteURL}blog/popular`);
      let data = await response.json();
      return data
    } catch(err) {
      // catches errors both in fetch and response.json
      console.log(err);
    }
}

export const increaseBlogView = async(id) =>{
  try {
      let response = await fetch(`${siteURL}blog/${id}/views`,{
        method:"post",
        headers:{'Content-Type': 'application/json'}
      });
      let data = await response.json();
      return data
    } catch(err) {
      // catches errors both in fetch and response.json
      console.log(err);
    }
}

export const sendMessage = async(payload) =>{
    try {
        let response = await fetch(`${siteURL}message`, {
            method: 'post',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        let data = await response.json();
        return data
      } catch(err) {
        // catches errors both in fetch and response.json
        console.log(err);
      }
}

export const sendReply = async(payload) =>{
  try {
      let response = await fetch(`${siteURL}blog/${payload.commentId}/comment`, {
          method: 'post',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify(payload)
      });
      let data = await response.json();
      return data
    } catch(err) {
      // catches errors both in fetch and response.json
      console.log(err);
    }
}

export const fetchSingleProduct = async(id) =>{
  try {
      let response = await fetch(`${siteURL}product/${id}`);
      let data = await response.json();
      return data
    } catch(err) {
      // catches errors both in fetch and response.json
      console.log(err);
    }
}

export const fetchProducts = async(payload) =>{
  try {
      let response = await fetch(`${siteURL}product?limit=${payload.limit}&offset=${payload.offset}`);
      let data = await response.json();
      return data
    } catch(err) {
      // catches errors both in fetch and response.json
      console.log(err);
    }
}

export const fetchCatProduct = async(id) =>{
  try {
      let response = await fetch(`${siteURL}product/category/${id}`);
      let data = await response.json();
      return data
    } catch(err) {
      // catches errors both in fetch and response.json
      console.log(err);
    }
}

export const fetchCategories = async() =>{
  try {
      let response = await fetch(`${siteURL}product/category`);
      let data = await response.json();
      return data
    } catch(err) {
      // catches errors both in fetch and response.json
      console.log(err);
    }
}

export const fetchOffices = async() =>{
  try {
      let response = await fetch(`${siteURL}setting/office`);
      let data = await response.json();
      return data
    } catch(err) {
      // catches errors both in fetch and response.json
      console.log(err);
    }
}

export const fetchDistributor = async() =>{
  try {
      let response = await fetch(`${siteURL}setting/distributor`);
      let data = await response.json();
      return data
    } catch(err) {
      // catches errors both in fetch and response.json
      console.log(err);
    }
}