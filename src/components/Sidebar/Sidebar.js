/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

// import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";
import { connect } from "react-redux";
import { history } from "index";

const mapStateToProps = ({user, dispatch}) =>({
  profile:user.profile,
  dispatch
})

function Sidebar({profile, dispatch}) {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const menuItems = [
    {
      text: 'All Admin',
      url: '/admin/admin-list',
      icon: 'fas fa-user-shield',
      role:["cooperative", "super_admin", "admin" ]
    },
    {
      text: 'Settings',
      url: '/admin/setting',
      icon: 'fas fa-tools',
      role:["cooperative"]
    },
    {
      text: 'Blogs',
      url: '/admin/blog',
      icon: 'fas fa-table',
      role:["super_admin", "admin"]
    },
    {
      text: 'Roles',
      url: '/admin/role',
      icon: 'fas fa-user-tag',
      role:["cooperative"]
    },
    {
      text: 'Messages',
      url: '/admin/message',
      icon: 'fas fa-envelope-square',
      role:["cooperative"]
    },
    {
      text: 'Services',
      url: '/admin/service',
      icon: 'fas fa-code-branch',
      role:["cooperative"]
    },
    {
      text: 'Profile',
      url: '/admin/profile',
      icon: 'fas fa-user',
      role:["super_admin", "admin"]
    },
  ];

  const handleLogout =()=>{
    dispatch({
      type:"auth/LOGOUT"
    })
  }
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-blueGray-200 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            Trinxer Pharmacy
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            {/* <li className="inline-block relative">
              <NotificationDropdown />
            </li> */}
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    Trinxer Pharmacy
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h1 className="md:min-w-full text-blueGray-500 uppercase font-bold block pt-1 pb-4 no-underline">
              {profile.firstName} {profile.lastName}
              <span className="md:min-w-full text-blueGray-500 text-xs font-bold block pt-1 pb-4 no-underline">
                Administrator 
              </span>
            </h1>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {menuItems.map((menu, index) =>(
              <li key={index} className="items-center">
                <Link
                  className={
                    `py-3 font-bold block 
                      ${history.location.pathname === menu.url
                      ? "text-lightBlue-500 hover:text-lightBlue-600 text-lg"
                      : "text-blueGray-700 hover:text-blueGray-500"}`
                  }
                  to={menu.url}
                >
                  <i
                    className={
                      `mr-2 text-xl
                      ${history.location.pathname === menu.url
                        ? "opacity-75"
                        : "text-blueGray-300"} ${menu.icon}`
                    }
                  ></i>{" "}
                  {menu.text}
                </Link>
              </li>))}
              <li>
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={()=>handleLogout(true)}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default connect(mapStateToProps)(Sidebar)