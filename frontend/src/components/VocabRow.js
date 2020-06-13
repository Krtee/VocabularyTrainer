import React, { useState, useGlobal, useEffect } from "reactn";
import api from "../api";


const getVocabAndTranslation = async (english_word, lang_id, user) => {

  const data = {
    english_word: english_word,
    lang_id: lang_id,
    user_id: user
  };

  const res = await api.vocab.getVocabAndTranslation(data);
  return res;
};

const VocabRow = (props) => {
  const { english_word, progress } = props.prog;
  const [vocab, setVocab] = useState([]);
  const [langID, setLangID] = useGlobal("langID");
  const [user, ] = useGlobal("user");

  useEffect(() => {
    getVocabAndTranslation(english_word, langID, user).then((data) => {      
      setVocab(data)});
  }, []);


  return (
    <div className="row vocabulary_list_entry">
      <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_english">{vocab.vocab}</div>
      <div className="col-xl-2 col-lg-2 col-md-3 col-4 vocabulary_list_foreign">{vocab.translation}</div>
      <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_progress">{progress}</div>
    </div>
  );
};

export default VocabRow;
