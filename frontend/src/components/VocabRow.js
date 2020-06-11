import React, { useState, useGlobal, useEffect } from "reactn";
import api from "../api";


const getVocabAndTranslation = async (vocab_id, lang_id) => {

  const data = {
    vocab_id: vocab_id,
    lang_id: lang_id,
  };


  const res = await api.vocab.getVocabAndTranslation(data);
  return res;
};

const VocabRow = (props) => {
  const { vocab_id, progress } = props.prog;
  const [vocab, setVocab] = useState([]);
  const [langID, ] = useGlobal("langID");

  useEffect(() => {
    getVocabAndTranslation(vocab_id, langID).then((data) => setVocab(data));
    // eslint-disable-next-line
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
