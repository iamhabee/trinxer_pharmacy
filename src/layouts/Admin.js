import React, { useEffect } from "react";
import { Switch, Route, Redirect, Router } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import AdminList from "views/admin/AdminList.js";
import Blogs from "views/admin/Blogs.js";
import Profile from "views/admin/Profile.js";
import Roles from "views/admin/Roles";
import Messages from "views/admin/Messages.js";
import Services from "views/admin/Services";
import Category from "views/admin/Category";
import { history } from "index";
import Product from "views/admin/Product";

export default function Admin() {
  useEffect(() => {
    
  }, [])
  const data = JSON.parse(localStorage.getItem('trinxer_admin'))
  if (!data){
    return <Redirect to="/auth/login"/>
  }
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <Router history={history}>
          <Switch>
            <Route path="/admin/admin-list" exact component={AdminList} />
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/maps" exact component={Maps} />
            <Route path="/admin/blog" exact component={Blogs} />
            <Route path="/admin/profile" exact component={Profile} />
            <Route path="/admin/setting" exact component={Settings} />
            <Route path="/admin/role" exact component={Roles} />
            <Route path="/admin/message" exact component={Messages} />
            <Route path="/admin/service" exact component={Services} />
            <Route path="/admin/category" exact component={Category} />
            <Route path="/admin/product" exact component={Product} />
            <Route path="/admin/tables" exact component={Tables} />
            <Redirect from="/admin" to="/admin/admin-list" />
          </Switch>
          </Router>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
