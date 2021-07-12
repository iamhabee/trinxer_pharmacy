import React from "react";
import { Switch, Route, Redirect, Router } from "react-router-dom";

// components

import IndexNavbar from "components/Navbars/IndexNavbar";
import Topbar from "components/Navbars/Topbar";
// import Sidebar from "components/Sidebar/Sidebar.js";
import AboutHeader from "components/Headers/AboutHeader";
import Footer from "components/Footers/Footer";

// views
import { history } from "index";
import WhoWeAre from "views/about/WhoWeAre";
import PurposeAndValue from "views/about/PurposeAndValue";
import BoardOfDirectors from "views/about/BoardOfDirectors";
import ExecutiveTeam from "views/about/ExecutiveTeam";
import Offices from "views/about/Offices";
import OurDistributor from "views/about/OurDistributor";
import SocialResponsibility from "views/about/SocialResponsibility.js";
import AboutSidebar from "components/Sidebar/AboutSidebar";

export default function Admin() {
  return (
    <>
      {/* <Topbar /> */}
      <IndexNavbar transparent />
      <main>
        <AboutHeader />
        
          {/* <div className="px-4 md:px-10 mx-auto w-full lg:w-9/12 -m-24"> */}
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center ">
            <div className="w-full md:w-4/12 lg:w-4/12 px-4">
              <AboutSidebar />
            </div>
            <div className="w-full md:w-8/12 lg:w-8/12 px-4">
              <Router history={history}>
                <Switch>
                  <Route path="/about/who-we-are" exact component={WhoWeAre} />
                  <Route path="/about/purpose-and-value" exact component={PurposeAndValue} />
                  <Route path="/about/board-of-director" exact component={BoardOfDirectors} />
                  <Route path="/about/executive-team" exact component={ExecutiveTeam} />
                  <Route path="/about/offices" exact component={Offices} />
                  <Route path="/about/our-distributors" exact component={OurDistributor} />
                  <Route path="/about/social-responsibility" exact component={SocialResponsibility} />
                  <Redirect from="/about" to="/about/who-we-are" />
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
