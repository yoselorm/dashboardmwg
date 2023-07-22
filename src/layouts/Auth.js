import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

// views

import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Auth() {
  return (
    <>
      {/* <Navbar transparent /> */}
      <div className="w-full bg-blueGray-800 p-6">
        {/* <Link to='/admin/dashboard' className="text-white font-bold text-xl p-6 m-6 hover:text-blue-500">
          Back to Dashboard
        </Link> */}

      </div>
      <main>
        <section className="relative w-full h-full pt-20 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/register_bg_2.png").default + ")",
            }}
          ></div>
          <Switch>
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/register" exact component={Register} />
            <Redirect from="/auth" to="/auth/login" />
          </Switch>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
