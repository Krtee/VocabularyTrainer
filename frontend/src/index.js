import React, { setGlobal } from "reactn";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

// FIXME: FOR DEV REASONS SET ON TRUE, BUT SET FALSE FOR PRODUCTIVE!
// FIXME: REMOVE USERID AND LANGNAME AND LANGID BEFORE RELEASE!
setGlobal({
  auth: true,
  user: "5ed96ffe95d98c76a6571cdf",
  progress: [1],
  numberOfVocab: 25,
  direction: "fo_en",
  langName: "German",
  langID: "de",
  summary: []
});

render(
        <App />,
    document.getElementById("root")
);
