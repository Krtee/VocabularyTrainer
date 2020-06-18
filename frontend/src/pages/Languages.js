import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useGlobal } from "reactn";
import "../style.scss";
import LanguageButton from "../components/LanguageButton";
import ReducedNavigation from "../components/ReducedNavigation";
import api from "../api";
import serverIsRunning from "../helper";

const getLanguages = async () => {
  const res = await api.language.getLanguages();
  return res;
};

const Languages = () => {
  const [auth] = useGlobal("auth");
  const [langName, setLangName] = useGlobal("langName");
  const [langID, setLangID] = useGlobal("langID");
  const [languages, setLanguages] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [serverError, setserverError] = useGlobal("serverError");

  useEffect(() => {
    if (!serverError) {
      serverIsRunning().then((isRunning) => {
        if (isRunning) {
          setserverError(false);
        } else {
          setserverError(true);
        }
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getLanguages().then((data) => {
      if (data) {
        setLanguages(data);
      }
    });
  }, []);

  const getLanguage = (langID, langName) => {
    console.group("Language");
    console.log("%c langID ", "Background: #0CE66E", langID);
    console.log("%c langName ", "Background: #0CE6E2", langName);
    console.groupEnd();
    setLangName(langName);
    setLangID(langID);
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={{ pathname: `/VocabularyList`, query: { langName, langID } }} />;
  }

  var i = 0;

  return (
    <div>
      <ReducedNavigation />
      {console.log("languages.js: ", localStorage.getItem("isAuthorized"))}
      {serverError ? (
        <Redirect to="/Error" />
      ) : localStorage.getItem("isAuthorized") === "false" ||
        localStorage.getItem("isAuthorized") === false ? (
        <Redirect to="/" />
      ) : (
        <>
          {" "}
          <h1 className="margin_top_small">Languages</h1>
          <h2>Select the language you want to practise.</h2>
          <div className="row box">
            {languages.map((language) => {
              return <LanguageButton key={i++} language={language} getLanguage={getLanguage} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Languages;
