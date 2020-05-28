import React, { useState, useEffect, useGlobal } from "reactn";
import api from "../api";

const getVocabs = async () => {
  const res = await api.vocab.getVocab();
  return res;
};

const VocabularyTraining_Queries = (props) => {
  const [vocab, setVocab] = useState([]);
  const [language, setLanguage] = useGlobal("language");
  const [iterate, setIterate] = useState(0);
  const [input, setInput] = useState("");

  useEffect(() => {
    getVocabs().then((data) => {
      setVocab(data);
    });
  }, []);

  const handleSkip = () => {
    setIterate(iterate + 1);
  };

  const handleClick = (event) => {
    event.preventDefault();
    if (input) {
      setIterate(iterate + 1);
      setInput("")
    }

  };

  const handleInput = (event) => {
    const inputValue = event.target.value;
    setInput(inputValue);
  };

  return (
    <div className="margin_top">
      <form>
        <h2>Translate!</h2>
        <div className="form-group row">
          <label
            className="col-lg-3 col-xs-12 no_padding_left"
            htmlFor="train_vocabulary_translation"
          >
            {vocab[iterate] ? vocab[iterate]["english_word"] : null}
          </label>
          <input
            type="text"
            className="form-control col-lg-9 col-xs-12"
            id="train_vocabulary_translation"
            placeholder="type in translation"
            name="translationInput"
            onChange={handleInput}
            value={input}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit and continue
        </button>
        <button type="button" className="btn btn-secondary ml-1" onClick={handleSkip}>
          Skip
        </button>
      </form>
    </div>
  );
};

export default VocabularyTraining_Queries;
