import "../style.css";
import React, { useGlobal, useState, useEffect } from "reactn";
import NavigationTop from "../components/NavigationTop";
import { Redirect } from "react-router";
import api from "../api";
import VocabRow from "../components/VocabRow";
import NavigationBottom from "../components/NavigationBottom";

const getProgressForUserAndLanguage = async (user_id, lang_id) => {
  const data = {
    user_id: user_id,
    lang_id: lang_id,
  };
  const res = await api.progress.getProgressForUserAndLanguage(data);
  if (res.length === 0) {
    // true if all words created
    await createBasicVocab(user_id, lang_id);
    return getProgressForUserAndLanguage(user_id, lang_id);
  }
  return res;
};

const createBasicVocab = async (user, id) => {
  const basics = require("../basic_vocab.json");
  const vocabulary = basics.vocabulary;

  Object.entries(vocabulary).forEach(([index, word]) => {
    const data = {
      language_id: id,
      english_word: word,
      user_id: user,
    };
    api.vocab.insert(data);
    api.progress.createProgress(data);
  });
  return true;
};

const VocabularyList = (props) => {
  const [auth] = useGlobal("auth");
  const [user] = useGlobal("user");
  const [langID] = useGlobal("langID");
  const [langName] = useGlobal("langName");

  const [prog, setProg] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProgressForUserAndLanguage(user, langID).then((data) => {
      setProg(data);

      setLoading(false);
    });
  }, []);

  if (!auth) {
    return <Redirect to="/" />;
  }

  var i = 0;

  //TODO catch data as json from database
  return (
    <div id="content" className="vocabulary_list">
      <NavigationTop />
      <NavigationBottom page={"VocabularyList"} />
      <div id="vocabulary_list">
        <h1>Vocabulary overview</h1>
        <div className="row vocabulary_list_entry">
          <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_header">English</div>
          <div className="col-xl-2 col-lg-2 col-md-3 col-4 vocabulary_list_header">{langName}</div>
          <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_header">Progress</div>
        </div>

        {!loading && prog && prog.length > 0 ? (
          prog.map((progress) => {
            return <VocabRow key={i++} prog={progress} />;
          })
        ) : (
          <div className="spinner-border m-5" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VocabularyList;
