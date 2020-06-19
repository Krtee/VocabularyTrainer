import React, { useState, useGlobal, useEffect } from "reactn";
import api from "../api";

const getTranslation = async (english_word, lang_id, USER_ID) => {
  const data = {
    english_word: english_word,
    lang_id: lang_id,
    user_id: USER_ID,
  };

  const res = await api.vocab.getVocabAndTranslation(data);
  return res.translation;
};

const VocabRow = ({ english_word, progress, even }) => {
  const [langID] = useGlobal("langID");
  const [user] = useGlobal("user");
  const [translation, setTranslation] = useState("");

  const USER_ID = localStorage.getItem("userId") || user;
  const LANG_ID = localStorage.getItem("langID") || langID;

  useEffect(() => {
        getTranslation(english_word, LANG_ID, USER_ID).then((data) => {
      setTranslation(data);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className={"row vocabulary_list_entry"}>
      <div className={"col-xl-2 col-lg-2 col-md-3 col-4" + (even ? " blue_background" : "")}>
        {english_word}
      </div>
      <div className={"col-xl-2 col-lg-2 col-md-3 col-4" + (even ? " blue_background" : "")}>
        {translation}
      </div>
      <div className={"col-xl-1 col-lg-2 col-md-3 col-4" + (even ? " blue_background" : "")}>
        {progress}
      </div>
    </div>
  );
};

export default VocabRow;
