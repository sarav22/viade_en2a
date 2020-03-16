import React, { Fragment } from "react";
import { PrivateLayout, PublicLayout, NotLoggedInLayout } from "@layouts";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import {
  Login,
  Register,
  PageNotFound,
  Welcome,
  RegistrationSuccess,
  Map,
  RouteList,
  FriendRoutes,
  ManageFriends
} from "./containers";

const privateRoutes = [
  {
    id: "welcome",
    path: "/welcome",
    component: Welcome
  },
  {
    id: "map",
    path: "/map/:route",
    component: Map
  },

  {
    id: "manageFriends",
    path: "/manageFriends",
    component: ManageFriends
  },
  {
    id: "manageFriends",
    path: "/friendRoutes/:f/:s/:n",
    component: FriendRoutes
  },
  {
    id: "seeRoutes",
    path: "/seeRoutes",
    component: RouteList
  }
];

const Routes = () => (
  <Router>
    <Fragment>
      <Switch>
        <NotLoggedInLayout component={Login} path={process.env.PUBLIC_URL + "/login"} exact />
        <NotLoggedInLayout component={Register} path={process.env.PUBLIC_URL + "/register"} exact />
        <NotLoggedInLayout
          path="/register/success"
          component={RegistrationSuccess}
          exact
        />
        <PublicLayout path="/404" component={PageNotFound} exact />
        <Redirect from={process.env.PUBLIC_URL + "/"} to={process.env.PUBLIC_URL + "/welcome"} exact />
        <PrivateLayout path={process.env.PUBLIC_URL + "/"} routes={privateRoutes} />
        <Redirect to="/404" />
      </Switch>
    </Fragment>
  </Router>
);

export default Routes;
