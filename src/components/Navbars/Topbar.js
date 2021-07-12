import React from 'react'

const Topbar = () => {
    return (
      <div className="w-full bg-white py-3 lg:block hidden">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between bg-white">
          <a
            href="08165607970"
            className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
          >
            <i className="fas fa-phone"></i> 	&nbsp;
            +2348165607970
          </a>
          <a
            href="info@trinxer.com"
            className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
          >
            <i className="fas fa-envelope"></i>	&nbsp;
            info@trinxer.com
          </a>
          <div >
            <button
              className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              type="button"
            >
              <i className="fab fa-twitter"></i>
            </button>
            <button
              className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              type="button"
            >
              <i className="fab fa-facebook-square"></i>
            </button>
            <button
              className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              type="button"
            >
              <i className="fab fa-dribbble"></i>
            </button>
            <button
              className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              type="button"
            >
              <i className="fab fa-github"></i>
            </button>
          </div>
          </div>
      </div>
    )
}

export default Topbar
