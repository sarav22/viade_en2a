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
  ManageFriends,
  CreateRoute
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
    path: "/friendRoutes/:friend",
    component: FriendRoutes
  },
  {
    id: "seeRoutes",
    path: "/seeRoutes",
    component: RouteList
  },
  {
    id:"createRoute",
    path:"/createRoute",
    component: CreateRoute
  }
];

const Routes = () => (
  <Router basename = {process.env.PUBLIC_URL}>
    <Fragment>
      <Switch>
        <NotLoggedInLayout component={Login} path="/login" exact />
        <NotLoggedInLayout component={Register} path="/register" exact />
        <NotLoggedInLayout
          path="/register/success"
          component={RegistrationSuccess}
          exact
        />
        <PublicLayout path="/404" component={PageNotFound} exact />
        <Redirect from="/" to="/welcome" exact />
        <PrivateLayout path="/" routes={privateRoutes} />
        <Redirect to="/404" />
      </Switch>
    </Fragment>
  </Router>
);

export default Routes;
