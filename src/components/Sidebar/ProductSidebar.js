/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { history } from "index";

const mapStateToProps = ({site, dispatch}) =>({
  products:site.products,
  categories:site.categories,
  loading:site.loading,
  dispatch
})

function ProductSidebar({categories, loading}) {
  const [collapseShow, setCollapseShow] = React.useState("hidden");

  const menuItems = [];

  categories.forEach(element => {
    menuItems.push(
      {
        text: element.name,
        url: `/products/parent/${element.name}/${element.categoryId}`,
        icon: 'fas fa-user-shield',
        catType:"parent"
      },
    )
    if(element.SubCategories){
      element.SubCategories.forEach(sub =>{
        menuItems.push(
          {
            text: sub.name,
            url: `/products/sub/${sub.name}/${sub.categoryId}`,
            icon: 'fas fa-user-shield',
            catType:"sub"
          },
        )
      })
    }
  });

  return (
    <>
      {/* <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-blueGray-200 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"> */}
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          
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
                <div className="w-6/12 flex justify-end mt-10">
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

            <ul className="md:flex-col md:min-w-full flex flex-col list-circle">
              {menuItems.map((menu, index) =>{
                if(menu.catType === "sub"){
                  return(
                      <li key={index} className="items-center" style={{marginLeft:35}}>
                        <a
                          className={
                            `py-3 font-bold block 
                              ${history.location.pathname === menu.url
                              ? "text-lightBlue-500 hover:text-lightBlue-600 text-sm"
                              : "text-blueGray-700 hover:text-blueGray-500"}`
                          }
                          href={menu.url}
                        >
                          {menu.text}
                        </a>
                      </li>)
                }else{
                  return(
                    <li key={index} className="items-center">
                      <a
                        className={
                          `py-3 font-bold block 
                            ${history.location.pathname === menu.url
                            ? "text-lightBlue-500 hover:text-lightBlue-600 text-lg"
                            : "text-blueGray-700 hover:text-blueGray-500"}`
                        }
                        href={menu.url}
                      >
                        {menu.text}
                      </a>
                    </li>)}})}
            </ul>
          </div>
        </div>
      {/* </nav> */}
    </>
  );
}

export default connect(mapStateToProps)(ProductSidebar)