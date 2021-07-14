import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Skeleton} from 'antd';
import Navbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import ContactCard from "components/Cards/ContactCard";
import ContactHeader from "components/Headers/ContactHeader";
import { useDispatch, useSelector } from "react-redux";
import htmlToDraft from 'html-to-draftjs';
import { ContentState, EditorState } from "draft-js";
import { imageUrl } from "services/axios";

export default function Landing() {
  
  const dispatch = useDispatch()
  const data = useSelector(state => state.site)
  const {about, services, team, loading} = data
  useEffect(() => {
    dispatch({
      type:"site/ABOUT"
    })
    dispatch({
      type:"site/SERVICES"
    })
    dispatch({
      type:"site/TEAM"
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
              backgroundImage:`url(${imageUrl}settings/${about.headerImagePath})`,
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
                    {about.headerCaption}
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

        {/* services and purpose */}
        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            {/* services */}
            <div className="flex flex-wrap">
              {loading && <Skeleton active />}
              {!loading && services.length === 0 ?
              <div className={`g:pt-12 pt-4 w-full md:w-4/12 px-4 text-center`}>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <i className="fas fa-award"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Our Services</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      We provide health care services for all
                    </p>
                  </div>
                </div>
              </div>:
              services.slice(0, 3).map((service, index) =>(
              <div className={`g:pt-12 pt-${(index+1) % 2 === 0? "4": "6"} w-full md:w-4/12 px-4 text-center`} key={index}>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <i className="fas fa-award"></i>
                    </div>
                    <h6 className="text-xl font-semibold">{service.serviceName}</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      {service.serviceDescription}
                    </p>
                  </div>
                </div>
              </div>))}
            </div>

            {/* purpose and value */}
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i className="fas fa-user-friends text-xl"></i>
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Our Social Responsibility
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  {about.social_res_description && about.social_res_description.slice(0, 150)}
                </p>
                <Link to="/about/social-responsibility" className="font-bold text-blueGray-700 mt-8">
                  Read full
                </Link>
              </div>
              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                  <img
                    alt="..."
                    src={`${imageUrl}settings/${about.social_res_image}`}
                    className="w-full align-middle rounded-t-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* private labelling */}
        <section className="relative py-20">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
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
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-lg"
                  src={`${imageUrl}settings/${about.private_labelling_image}`}
                />
              </div>
              <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-lightBlue-300">
                    <i className="fas fa-rocket text-xl"></i>
                  </div>
                  <h3 className="text-3xl font-semibold">Private Labelling</h3>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500"> {about.private_labelling_description && about.private_labelling_description.slice(0, 150)} </p>
                  <Link to="/private-labelling" className="font-bold text-blueGray-700 mt-8">
                    Read full
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="pt-20 pb-48">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-24">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold">Meet Our Experts</h2>
                {/* <p className="text-lg leading-relaxed m-4 text-blueGray-500">
                  According to the National Oceanic and Atmospheric
                  Administration, Ted, Scambos, NSIDClead scentist, puts the
                  potentially record maximum.
                </p> */}
              </div>
            </div>
            <div className="flex flex-wrap">
              {loading && <Skeleton active />}
              {team.slice(0, 4).map((tem, index) =>(
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4" key={index}>
                <div className="px-6">
                  <img
                    alt="..."
                    src={`${imageUrl}admin/${tem.image}`}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">{tem.firstName} {tem.lastName}</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      {tem.Role.roleName}
                    </p>
                  </div>
                </div>
              </div>))}
              <Link to="/about/executive-team" className="font-bold align-center text-blueGray-700 mt-8">
                <button className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                  view all
                </button>
              </Link>
            </div>
          </div>
        </section>

        <ContactHeader />
        <ContactCard />
      </main>
      <Footer />
    </>
  );
}
