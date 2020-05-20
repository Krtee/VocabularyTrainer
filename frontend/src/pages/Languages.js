import "../style.css";
import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import { Link, Redirect } from "react-router-dom";
import { useGlobal } from "reactn";
import NoAuth from "../components/NoAuth";

function Languages() {
  const [auth, setAuth] = useGlobal("auth");
  console.log("Languages: auth: ", auth);
  if (!auth) {
    return <Redirect to="/" />;
  }

    async function callBackendAPI() {
        const response = await fetch("/express_backend");
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    }

  return (
    <div>
      <Navigation />
      <h1>Languages</h1>
      <h2>Select the language you want to practise.</h2>
      <div className="row box">
        <div className="col-lg-3">
          <Link to="/VocabularyList">
            <div className="col-lg-12 languages_option">French</div>
          </Link>
        </div>
        <div className="col-lg-3">
          <Link to="/VocabularyList">
            <div className="col-lg-12 languages_option">Spanish</div>
          </Link>
        </div>
        <div className="col-lg-3">
          <Link to="/VocabularyList">
            <div className="col-lg-12 languages_option">Swedish</div>
          </Link>
        </div>
        <div className="col-lg-3">
          <Link to="/VocabularyList">
            <div className="col-lg-12 languages_option">Dutch</div>
          </Link>
        </div>
      </div>
      <button type="button" className="btn btn-primary margin_top">
        Add new language
      </button>
        </div>
    );
}

export default Languages;
