import React, { setGlobal } from "reactn";
import { render } from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

// FIXME: FOR DEV REASONS SET ON TRUE, BUT SET FALSE FOR PRODUCTIVE!
// FIXME: REMOVE USERID AND LANGNAME AND LANGID BEFORE RELEASE!
setGlobal({
  auth: false,
  user: "5ee0e6472be0845b1432ee44",
  progress: [1],
  numberOfVocab: 25,
  direction: "fo_en",
  langName: "German",
  langID: "de",
  summary: [],
  progressSetting: 3
});

render(
        <App />,
    document.getElementById("root")
);
