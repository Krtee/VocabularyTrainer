import React, { setGlobal } from "reactn";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

// FIXME: FOR DEV REASONS SET ON TRUE, BUT SET FALSE FOR PRODUCTIVE!
setGlobal({
  auth: false, user: "", langName: null, langID: null
});


render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);
