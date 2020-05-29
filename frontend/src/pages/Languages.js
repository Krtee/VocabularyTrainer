import "../style.css";
import React, { useEffect, useState } from "react";
import ReducedNavigation from "../components/ReducedNavigation";
import { Redirect } from "react-router-dom";
import { useGlobal } from "reactn";
import api from "../api";
import LanguageButton from "../components/LanguageButton";

const getLanguages = async () => {
  const res = await api.language.getLanguages();
  return res;
};

const Languages = () => {
  const [auth, setAuth] = useGlobal("auth");
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    getLanguages().then((data) => setLanguages(data));
  }, []);

  if (!auth) {
    console.info("redirecting");
    return <Redirect to="/" />;
  }

  var i = 0;

  return (
    
    <div>
      <ReducedNavigation />
      <h1>Languages</h1>
      <h2>Select the language you want to practise.</h2>
      <div className="row box">
        {languages.map((language) => {
          return <LanguageButton key={i++} language={language} />;
        })}
      </div>
      <button type="button" className="btn btn-primary margin_top">
        Add new language
      </button>
    </div>
  );
};

export default Languages;
