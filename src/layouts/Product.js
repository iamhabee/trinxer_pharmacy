import React, { useEffect } from "react";
import { Switch, Route, Redirect, Router } from "react-router-dom";

// components
import IndexNavbar from "components/Navbars/IndexNavbar";
import ProductHeader from "components/Headers/ProductHeader";
import ProductSidebar from "components/Sidebar/ProductSidebar";
import Footer from "components/Footers/Footer";

// views
import { history } from "index";
import Category from "views/products/Category";
import ProductsCategory from "views/products/Products";
import { useDispatch } from "react-redux";
import SingleProduct from "views/products/SingleProduct";

export default function Product() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type:"site/CATEGORIES",
    })
  }, [])
  return (
    <>
      <IndexNavbar transparent />
      <main>
        <ProductHeader />
        
          {/* <div className="px-4 md:px-10 mx-auto w-full lg:w-9/12 -m-24"> */}
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full md:w-4/12 lg:w-4/12 px-4">
              <ProductSidebar />
            </div>
            <div className="w-full md:w-8/12 lg:w-8/12 px-4">
              <Router history={history}>
                <Switch>
                  <Route path="/products/category" exact component={ProductsCategory} />
                  <Route path="/products/:type/:name/:id" exact component={Category} />
                  <Route path="/products/single/product/:name/:productId" exact component={SingleProduct} />
                  <Redirect from="/products" to="/products/category" />
                </Switch>
              </Router>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
