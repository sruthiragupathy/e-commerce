import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ProductProvider } from "./Context/ProductContext";
import App from "./App";
import {HashRouter as Router} from "react-router-dom";

import setupMockServer from "./api/mock.server";

setupMockServer();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
    <ProductProvider>
      <App />
    </ProductProvider>
    </Router>
  </StrictMode>,
  rootElement
);

