import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ProductProvider } from "./Context/ProductContext";
import App from "./App";

import setupMockServer from "./api/mock.server";

setupMockServer();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ProductProvider>
      <App />
    </ProductProvider>
  </StrictMode>,
  rootElement
);

