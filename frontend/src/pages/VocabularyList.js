import "../style.css";
import React, { useGlobal, useState, useEffect } from "reactn";
import Navigation from "../components/Navigation";
import { Redirect } from "react-router";
import api from "../api";
import VocabRow from "../components/VocabRow";

const getProgressForUserAndLanguage = async (user_id, lang_id) => {
  const data = {
    user_id: user_id,
    lang_id: lang_id,
  };
  const res = await api.progress.getProgressForUserAndLanguage(data);
  return res;
};

const VocabularyList = (props) => {
  const [auth, ] = useGlobal("auth");
  const [user, setUser] = useGlobal("user");
  const [langID, setLangID] = useGlobal("langID");
  const [langName, setLangName] = useGlobal("langName");

  const [prog, setProg] = useState([]);

  useEffect(() => {
    getProgressForUserAndLanguage(user, langID).then((data) => {setProg(data)});
  }, []);

  if (!auth) {
    return <Redirect to="/" />;
  }

  const mapProgress = prog
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
        {mapProgress.map((prog) => {
          return <VocabRow key={i++} prog={prog} />
        })}


      </div>
    </div>
  );
};

export default VocabularyList;
