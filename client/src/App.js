import React, { Fragment } from "react";
import Home from "./Components/Layouts/Home/Home.js";
import Signup from "./Components/Auth/Signup";
import Enterpassword from "./Components/Auth/Ipassword";
import Email from "./Components/Auth/Email";
import Token from "./Components/Auth/token";
import Dashboard from "./Components/Dashboard/Dashboard";
import InitialProfile from "./Components/Layouts/Profile/Profile";
import Login from "./Components/Auth/Login";
import Post from "./Components/Dashboard/Posts/Viewpost/Post";
import Viewprofile from "./Components/Layouts/Profile/ViewProfile";
import Createpost from "./Components/Dashboard/Posts/Createpost";
import Editprofile from "./Components/Layouts/Profile/EditProfile";
import Userposts from "./Components/Dashboard/Posts/Userposts";
import Vieweditpost from "./Components/Dashboard/Posts/Vieweditpost";
import Explore from "./Components/Dashboard/Posts/Explore";
import ViewOtherProfile from "./Components/Layouts/Profile/ViewOtherProfile";
import Footer from "./Components/Layouts/Footer/Footer";
import { Provider } from "react-redux";
import store from "./store";
/*Importing the router */

import { BrowserRouter, Switch, Route } from "react-router-dom";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/signup" component={Signup}></Route>
          <Route
            exact
            path="/registerpassword"
            component={Enterpassword}
          ></Route>
          <Route exact path="/enteremail" component={Email}></Route>
          <Route exact path="/entertoken" component={Token}></Route>
          <Route exact path="/dashboard" component={Dashboard}></Route>
          <Route
            exact
            path="/initialprofile"
            component={InitialProfile}
          ></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/post" component={Post}></Route>
          <Route exact path="/userprofile" component={Viewprofile} />
          <Route exact path="/editprofile" component={Editprofile} />
          <Route exact path="/createpost" component={Createpost} />
          <Route exact path="/currentuserposts" component={Userposts} />
          <Route exact path="/editpost" component={Vieweditpost} />
          <Route exact path="/explore" component={Explore} />
          <Route exact path="/viewuserprofile" component={ViewOtherProfile} />
          <Footer />
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
