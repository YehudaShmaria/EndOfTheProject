import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import GardenProvider from "./Context/GardenProvider";

ReactDOM.render(
  <BrowserRouter>
    <GardenProvider>
      <App />
    </GardenProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
