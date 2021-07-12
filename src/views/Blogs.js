import React, { useEffect } from "react";
import { Result, Button, Skeleton} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

// components

import Navbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import { useDispatch, useSelector } from "react-redux";
import { imageUrl } from "services/axios";

export default function Blogs() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.blog)
  const sites = useSelector(state => state.site)
  const {about} = sites
  const {public_blogs, loading} = data

  useEffect(() => {
    dispatch({
      type:"blog/PUBLIC_BLOGS",
      payload:{offset:0, limit:10}
    })
    dispatch({
      type:"site/ABOUT"
    })
  }, [])
  return (
    <>
      <Navbar transparent />
      <main>
        <div className="relative pt-32 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
              `url(${imageUrl}settings/${about.headerImagePath})`,
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
                  <h1 className="text-white font-semibold text-4xl">
                    Welcome To Trinxer News Posts.
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    {about.headerText}
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
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              {loading && <Skeleton active />}
              {!loading && public_blogs.length === 0 ?
              <Result
                icon={<SmileOutlined />}
                title="Ooops there are currently no blogs "
                // extra={<Button type="primary" >Create Admin</Button>}
              />:
              public_blogs.map( (blog, index) =>(
                <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center" key={index}>
                  <Link to={`blog-details/${blog.blogPostId}`} >
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg bg-lightBlue-500">
                      <img
                        alt="..."
                        src={`${imageUrl}blog/${blog.imagePath}`}
                        className="w-full align-middle rounded-t-lg"
                        style={{height:200}}
                      />
                      <blockquote className="relative p-8 mb-4">
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
                          {blog.description && blog.description.slice(0, 50)}...
                        </p>
                        <p className="text-white mt-2">Post date: {new Date(blog.createdAt).toDateString()} </p>
                      </blockquote>
                      <Link to={`blog-details/${blog.blogPostId}`} className="mb-5" ><Button type="ghost" >More</Button></Link>
                    </div>
                  </Link>
                </div>
                ))}
            </div>
          </div>
        </section>
        
      </main>
      <Footer />
    </>
  );
}
