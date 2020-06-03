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
  const [auth, ] = useGlobal("auth");
  const [language, setLanguage] = useGlobal("language");
  const [languageId, setLanguageId] = useGlobal("languageId");
  const [languages, setLanguages] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    getLanguages().then((data) => setLanguages(data));
  }, []);

  if (!auth) {
    console.info("redirecting");
    return <Redirect to="/" />;
  }

  const getLanguage = (languageId, language) => {
    console.log(languageId, language);
    setLanguage(language);
    setLanguageId(languageId)
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={{ pathname: `/VocabularyList`, query: { language, languageId } }} />;
  }

  const setLang = (language) => {
    setLang()
    };

  var i = 0;

  return (
    
    <div>
      <ReducedNavigation />
      <h1>Languages</h1>
      <h2>Select the language you want to practise.</h2>
      <div className="row box">
        {languages.map((language) => {
          return <LanguageButton key={i++} language={language} getLanguage={getLanguage}  />;
        })}
      </div>
    </div>
  );
};

export default Languages;

