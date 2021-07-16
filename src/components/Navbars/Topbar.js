import React from 'react'
import { useSelector } from 'react-redux'

const Topbar = () => {
  const data = useSelector(state => state.site)
  const {about} = data
    return (
      <div className="w-full bg-white py-3 lg:block hidden">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between bg-white">
          <a
            href={`tel:${about.contactPhone}`}
            className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap"
          >
            <i className="fas fa-phone"></i> 	&nbsp;
            {about.contactPhone}
          </a>
          <a
            href={`mailto:${about.contactEmail}`}
            className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap"
          >
            <i className="fas fa-envelope"></i>	&nbsp;
            {about.contactEmail}
          </a>
          <div >
            <a target="_blank" href="#">
              <button
                className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <i className="fab fa-twitter"></i>
              </button>
            </a>
            <a target="_blank" href="https://www.facebook.com/Trinxer-Pharmaceutical-Switzerland-107327381633230">
              <button
                className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <i className="fab fa-facebook-square"></i>
              </button>
            </a>
            <a target="_blank" href="https://www.linkedin.com/company/trinxer-pharmaceutical-switzerland/about/?viewAsMember=true">
              <button
                className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <i className="fab fa-linkedin"></i>
              </button>
            </a>
            <a target="_blank" href="#">
              <button
                className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <i className="fab fa-github"></i>
              </button>
            </a>
          </div>
        </div>
      </div>
    )
}

export default Topbar
