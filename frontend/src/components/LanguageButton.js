import React, { useGlobal } from "reactn";
import api from "../api";


const LanguageButton = (props) => {
  const { language, id } = props.language;
  const { getLanguage } = props;

  const [langID, setLangID] = useGlobal("langID");
  const [, setLangName] = useGlobal("langName");
  const [user,] = useGlobal("user");


  const handleSubmitLocal = (event) => {
    event.preventDefault();
    getLanguage(id, language);
    setLangID(id);
    setLangName(language);
    checkIfBasicVocabExist();
  };

  const checkIfBasicVocabExist = async () => {
    
      const data = {
        user_id: user,
        lang_id: langID,
      };
      const res = await api.progress.getProgressForUserAndLanguage(data);
      console.log("*** res.length: " + res.length);

    if (res.length < 50) {
      createBasicVocab();
    }
  }

  const createBasicVocab = async () => {
    const basics = require('../basic_vocab.json');
    const vocabulary = basics.vocabulary;

    for (var key in vocabulary) {
      var currentVocab = vocabulary[key].toString();
      console.log("*** " + id + ": add vocab " + currentVocab + " for user: " + user);
      const data = {
        language_id: id,
        english_word: currentVocab,
        user_id: user,
      };
      await api.vocab.insert(data);
    }
    return true;
  }

  return (
    <div className="col-lg-3">
      <form onSubmit={handleSubmitLocal}>
        <input type="hidden" value={language} name="language"></input>
        <button type="submit" className="btn btn-primary margin_top col-lg-12 languages_option">
          {language}
        </button>
      </form>
    </div>
  );
};

export default LanguageButton;