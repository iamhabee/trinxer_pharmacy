/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import { history } from "index";
import Topbar from "./Topbar";
import IndexDropdown from "components/Dropdowns/IndexDropdown.js";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const data = useSelector(state => state.site)
  const {about} = data
  const pathname = history.location.pathname
  const menuItems = [
    {
      title: 'Blogs',
      url: '/blogs',
      icon: 'fas fa-globe',
      active: pathname === "/blogs"
    },
    {
      title: 'Products',
      url: '/products',
      icon: 'fas fa-plus-square',
      active:
            pathname === "/products/food-suppliment" || 
            pathname === "/products/medical-devices" || 
            pathname === "/products/cosmetics"
    },
    {
      title: 'Private Labelling',
      url: '/private-labelling',
      icon: 'fas fa-lock',
      active: pathname === "/private-labelling"
    },
    {
      title: 'Contact',
      url: '/contact',
      icon: 'fas fa-info-circle',
      active: pathname === "/contact"
    },
  ];
  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-0 py-0 navbar-expand-lg bg-lightBlue-500 shadow">
        <Topbar navbarOpen={navbarOpen}/>
        <div className="container px-4 py-3 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
              className="whitespace-nowrap"
            >
              <img src="/images/logo/logo.png" style={{height:50}} />
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-lightBlue-500 lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <IndexDropdown />
              </li>
              {menuItems.map( (menu, index) =>(
              <li className="flex items-center" key={index}>
                <Link
                  className={
                    `items-center text-xs uppercase font-bold px-3 py-4 lg:py-2 flex
                      ${menu.active
                      ? "text-orange-500 hover:text-white text-lg"
                      : "text-white hover:text-orange-500"}`
                  }
                  to={menu.url}
                >
                  <i className={
                      `text-lg leading-lg
                      ${menu.active
                        ? "opacity-75"
                        : "text-white"} ${menu.icon}`
                    }  />
                  <span className="inline-block ml-2">{menu.title}</span>
                </Link>
              </li>))}
            </ul>
          </div>
        </div>
      </nav>
      <a
        href={`https://wa.me/${about.contactPhone}`}
        className="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fas fa-comments whatsapp-icon"></i>
      </a>
    </>
  );
}
