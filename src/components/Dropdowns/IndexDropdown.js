import React from "react";
import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";
import { history } from "index";

const IndexDropdown = () => {
  // dropdown props
  const pathname = history.location.pathname
  const active = pathname === "/about/who-we-are" || 
              pathname === "/about/purpose-and-value" ||
              pathname === "/about/board-of-director" ||
              pathname === "/about/executive-team" ||
              pathname === "/about/offices" ||
              pathname === "/about/social-responsibility" ||
              pathname === "/about/our-distributors"
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const menuItems = [
    {
      title: 'Who we are',
      url: '/about/who-we-are',
      icon: 'fas fa-globe',
    },
    {
      title: 'Purpose and value',
      url: '/about/purpose-and-value',
      icon: 'fas fa-lock',
    },
    {
      title: 'Board of Director',
      url: '/about/board-of-director',
      icon: 'fas fa-info-circle',
    },
    {
      title: 'Executive team',
      url: '/about/executive-team',
      icon: 'fas fa-info-circle',
    },
    {
      title: 'Offices',
      url: '/about/offices',
      icon: 'fas fa-info-circle',
    },
    {
      title: 'Social Responsibility',
      url: '/about/social-responsibility',
      icon: 'fas fa-info-circle',
    },
    {
      title: 'Our Distributors',
      url: '/about/our-distributors',
      icon: 'fas fa-info-circle',
    }
  ];

  return (
    <>
      <a
        className={
          `items-center text-xs uppercase font-bold px-3 py-4 lg:py-2 flex
            ${active
            ? "text-orange-500 hover:text-white text-lg"
            : "text-white hover:text-orange-500"}`}
        href="#about"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className={
            `text-lg leading-lg
            ${active
              ? "opacity-75"
              : "text-white"} fas fa-users`
          }  />
        <span className="inline-block ml-2">About Us</span>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        {menuItems.map( (menu, index) =>(
        <Link
          key={index}
          to={menu.url}
          onClick={()=>{dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover()}}
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          {menu.title}
        </Link>
        ))}
      </div>
    </>
  );
};

export default IndexDropdown;
