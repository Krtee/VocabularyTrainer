import React, { setGlobal } from "reactn";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

// FIXME: FOR DEV REASONS SET ON TRUE, BUT SET FALSE FOR PRODUCTIVE!
// FIXME: REMOVE USERID AND LANGNAME AND LANGID BEFORE RELEASE!
setGlobal({
  auth: false,
  user: "",
  progress: 1,
  numberOfVocab: 25,
  direction: "fn_en",
  langName: null,
  langID: null,
  summary: []
});

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
