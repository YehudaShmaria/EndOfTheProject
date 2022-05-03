import React from "react";
import {Switch , Route } from "react-router-dom";
import Login from "../Auto/Login";
import Register from "../Auto/Register";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Home from "../Pages/Home/Home";
import MyGarden from "../Pages/MyGarden/MyGarden";
import AddGarden from "../Pages/CreateGarden/AddGarden";
import FlowerDiseases from '../Pages/Diseases/FlowerDiseases'

const WebRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        
        <Route path="/mygarden">
          <MyGarden />
        </Route>
        <Route path="/disease">
          <FlowerDiseases />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/addgarden">
          <AddGarden />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
      </Switch>
    </div>
  );
};

export default WebRouter;
