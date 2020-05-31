import "../style.css";
import React, { useGlobal, useState, useEffect } from "reactn";
import Navigation from "../components/Navigation";
import { Redirect } from "react-router";
import api from "../api";
import VocabRow from "../components/VocabRow";

const getVocabs = async () => {
  const res = await api.vocab.getVocab();
  return res;
};

const VocabularyList = (props) => {
  const [auth, setAuth] = useGlobal("auth");
  const [langID, setLangID] = useGlobal("langID");
  const [langName, setLangName] = useGlobal("langName");  
  const [vocab, setVocab] = useState([]);

  useEffect(() => {
    getVocabs().then((data) => setVocab(data));
  }, []);

/*   try {
    if (props.location.query.language !== language) {
      setLanguage(props.location.query.language);
      setLanguageId(props.location.query.id);
    }
  } catch (error) {
    console.info("No language selected. Using german as default.");
  } */

  if (!auth) {
    return <Redirect to="/" />;
  }

  if (langName === null) {
    return <Redirect to="/Languages" />;
  }

  const getSortedVocab = vocab
    .filter((word) => {
      return word.language_id === langID;
    })
    .map((word) => {
      return word;
    });

  var i = 0;  

  
  //TODO catch data as json from database
  return (
    <div id="content" className="vocabulary_list">
      <Navigation />
      <div id="vocabulary_list">
        <h1>Vocabulary overview</h1>
        <div className="row vocabulary_list_entry">
          <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_header">English</div>
          <div className="col-xl-2 col-lg-2 col-md-3 col-4 vocabulary_list_header">{langName}</div>
          <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_header">Progress</div>
        </div>
        {getSortedVocab.map((vocab) => {
          return <VocabRow key={i++} vocab={vocab}/>
        })}
      </div>
    </div>
  );
};

export default VocabularyList;
