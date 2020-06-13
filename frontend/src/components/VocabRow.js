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

const VocabRow = ({ english_word, progress }) => {
  //const [vocab, setVocab] = useState([]);
  const [langID ] = useGlobal("langID");
  const [user ] = useGlobal("user");
  const [translation, setTranslation] = useState("");

  console.log("*** " + english_word);

   useEffect(() => {
    console.log("This is use effect");
    getVocabAndTranslation(english_word, langID, user).then((data) => {
      setTranslation(data.translation);
      console.log("translation: " + translation);
    });
      // eslint-disable-next-line
  }, []); 

  return (
    <div className="row vocabulary_list_entry">
      <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_english">{english_word}</div>
      <div className="col-xl-2 col-lg-2 col-md-3 col-4 vocabulary_list_foreign">{translation}</div>
      <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_progress">{progress}</div>
    </div>
  );
};

export default VocabRow;
