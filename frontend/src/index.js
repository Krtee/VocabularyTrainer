import React, { setGlobal } from "reactn";
import { render } from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";

// FIXME: FOR DEV REASONS SET ON TRUE, BUT SET FALSE FOR PRODUCTIVE!
// FIXME: REMOVE USERID AND LANGNAME AND LANGID BEFORE RELEASE!
setGlobal({
  user: "",
  progress: [1],
  numberOfVocab: 25,
  direction: "fo_en",
  langName: "German",
  langID: "",
  summary: [],
  progressSetting: 3,
  serverError: false,
});

render(<App />, document.getElementById("root"));
