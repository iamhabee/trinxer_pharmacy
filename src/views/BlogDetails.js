import React, { useEffect, useState } from "react";
import { Button, Skeleton, List, Comment, Avatar} from 'antd';
// import { SmileOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

// components

import Navbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import { useDispatch, useSelector } from "react-redux";
import { imageUrl } from "services/axios";
import { useParams } from "react-router";

export default function BlogDetails() {
  const dispatch = useDispatch()
  const {id} = useParams()
  const data = useSelector(state => state.blog)
  const [value, setValue] = useState({fullName:"", email:"", phone:"", comment:"", commentId:id})
  const {single_blog, loading, recent_blogs, replyLoading} = data

  useEffect(() => {
    dispatch({
      type:"blog/PUBLIC_SINGLE_BLOG",
      payload:id
    })
    dispatch({
      type:"blog/RECENT_BLOGS",
    })
    dispatch({
      type:"blog/VIEW_BLOG",
      payload:id
    })
  }, [])

  const handleInputChange = (e) =>{
    const {name, value} = e.target
    setValue(val =>({...val, [name] : value}))
  }

  const submitForm =(e) =>{
    e.preventDefault()
    dispatch({
      type:"blog/REPLY_BLOG",
      payload:value
    })
  }

  return (
    <>
      <Navbar transparent />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                `url(${imageUrl}blog/${single_blog.imagePath})`,
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    {single_blog.postTitle}
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    {single_blog.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-20 -mt-24 pt-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              {loading && <Skeleton active />}
              <div className="lg:pt-12 pt-6 w-full md:w-8/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <blockquote className="relative p-8 mb-4">
                    <h4 className="text-xl font-bold text-blueGray">
                      {single_blog.postTitle}
                    </h4>
                    <p className="text-md font-light mt-2 text-white" dangerouslySetInnerHTML={{ __html:single_blog.postContent }} />
                    <p>Post date: { single_blog && new Date(single_blog.createdAt).toDateString()} </p>
                  </blockquote>
                </div>
              </div>
              <div className="w-full md:w-4/12 lg:w-4/12 px-4">
                <h4 className="text-xl font-bold text-blueGray mt-24">Recent Posts</h4>
                {loading && <Skeleton active />}
                {recent_blogs.map( (blog, index) =>(
                <div className="lg:pt-12 pt-6 w-full px-4 text-center" key={index}>
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded-lg bg-lightBlue-500">
                    <img
                      alt="..."
                      src={`${imageUrl}blog/${blog.imagePath}`}
                      className="w-full align-middle rounded-t-lg"
                      style={{height:150}}
                    />
                    <blockquote className="relative p-8 mb-4" style={{height:180}}>
                      <svg
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 583 95"
                        className="absolute left-0 w-full block h-95-px -top-94-px"
                      >
                        <polygon
                          points="-30,95 583,95 583,65"
                          className="text-lightBlue-500 fill-current"
                        ></polygon>
                      </svg>
                      <h4 className="text-xl font-bold text-white">
                        {blog.postTitle}
                      </h4>
                      <p className="text-md font-light mt-2 text-white">
                        {blog.description}
                      </p>
                      <p>Post date: {new Date(blog.createdAt).toDateString()} </p>
                    </blockquote>
                    <Link to={`blog-details/${blog.blogPostId}`} ><Button type="ghost" >More</Button></Link>
                  </div>
                </div>))}
              </div>
            </div>
          </div>
        </section>
        
        <section className="pb-20 -mt-24 pt-20">
          <div className="container mx-auto px-4">
            <List
              loading={loading}
              className="comment-list"
              header={`${single_blog.Comments && single_blog.Comments.length } replies`}
              itemLayout="horizontal"
              dataSource={single_blog.Comments}
              renderItem={item => (
                <li>
                  <Comment
                    author={<h3 className="text-sm uppercase font-bold text-blueGray">{item.fullName}</h3>}
                    avatar={<Avatar className="uppercase" style={{ backgroundColor: '#f56a00'}}>{item.fullName.slice(0,1)}</Avatar>}
                    content={<p>{item.comment}</p>}
                    datetime={new Date(item.createdAt).toDateString()}
                  />
                </li>
              )}
            />
            <div className="mx-auto px-4 pt-20" style={{width:"50%"}}>
              <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                Fill the form below to reply, all feedback are welcome
              </p>
              <form onSubmit={submitForm}>
                <div className="relative w-full mb-3 mt-8">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="full-name"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Full Name"
                    value={ value.fullName }
                    name="fullName"
                    onChange={ handleInputChange}
                    required="required"
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Email"
                    value={ value.email }
                    name="email"
                    onChange={ handleInputChange }
                    required="required"
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="message"
                  >
                    Reply
                  </label>
                  <textarea
                    rows="4"
                    cols="80"
                    name="comment"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="Type a message..."
                    value={ value.comment }
                    onChange={ handleInputChange }
                  />
                </div>
                <div className="text-center mt-6">
                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    {replyLoading?"Sending...":"Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
