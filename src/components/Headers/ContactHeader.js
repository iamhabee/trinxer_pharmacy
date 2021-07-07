import React from 'react'
import { useSelector } from 'react-redux'

const ContactHeader = () => {

    const data = useSelector(state => state.site)
    const {about} = data

    return (
        <section className="pb-20 relative block bg-blueGray-800">
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
                className="text-blueGray-800 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
            <div className="flex flex-wrap text-center justify-center">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold text-white">
                  Contact Us
                </h2>
                <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
                  HeadQuarter Address
                </p>
                <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
                  {about.contactAddress}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap mt-12 justify-center">
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-user-plus text-xl"></i>
                </div>
                <h6 className="text-xl mt-5 font-semibold text-white">
                  Contact Person
                </h6>
                <p className="mt-2 mb-4 text-blueGray-400">
                  {about.contactName}
                </p>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-phone text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  Pnone Number
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  {about.contactPhone}
                </p>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-chat text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  Email Address
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  {about.contactEmail}
                </p>
              </div>
            </div>
          </div>
        </section>
    )
}

export default ContactHeader
