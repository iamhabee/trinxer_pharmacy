/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import { history } from "index";
// components

// import IndexDropdown from "components/Dropdowns/IndexDropdown.js";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const pathname = history.location.pathname
  const menuItems = [
    {
      title: 'About Us',
      url: '/about',
      icon: 'fas fa-users',
      active: pathname === "/about/who-we-are" || 
              pathname === "/about/purpose-and-value" ||
              pathname === "/about/board-of-director" ||
              pathname === "/about/executive-team" ||
              pathname === "/about/offices" ||
              pathname === "/about/social-responsibility" ||
              pathname === "/about/our-distributors"
    },
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
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
              className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
              Trinxer Pharmacy
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
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {menuItems.map( (menu, index) =>(
              <li className="flex items-center" key={index}>
                <Link
                  className={
                    `items-center text-xs uppercase font-bold px-3 py-4 lg:py-2 flex
                      ${menu.active
                      ? "text-lightBlue-500 hover:text-lightBlue-600 text-lg"
                      : "text-blueGray-700 hover:text-blueGray-500"}`
                  }
                  to={menu.url}
                >
                  <i className={
                      `text-lg leading-lg
                      ${menu.active
                        ? "opacity-75"
                        : "text-blueGray-400"} ${menu.icon}`
                    }  />
                  <span className="inline-block ml-2">{menu.title}</span>
                </Link>
              </li>))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
