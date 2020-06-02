import React, { useState, useEffect, useGlobal } from "reactn";
import api from "../api";
import { all } from "bluebird";

const getVocabs = async () => {
  const res = await api.vocab.getVocab();
  return res;
};

const VocabularyTraining_Queries = (props) => {
  const [vocab, setVocab] = useState([]);
  const [trainingVorab, setTrainingVorab] = useState([]);
  const [language, setLanguage] = useGlobal("language");
  const [languageId] = useGlobal("languageId");
  const [iterate, setIterate] = useState(0);
  const [input, setInput] = useState("");

  useEffect(() => {
    getVocabs().then((data) => {
      setVocab(data);
      getTrainingVocab(data);
    });
  }, []);

  const handleSkip = () => {
    setIterate(iterate + 1);
  };

  const handleClick = (event) => {
    event.preventDefault();
    const currentWord = trainingVorab[iterate]
    console.log(currentWord)
    console.log("Translation in db: ", currentWord.translation)
    console.log("Translation by user: ", input)

    if (input) {
      if(input.toLowerCase() == currentWord.translation.toLowerCase()){
        // Word correct 
        // TODO: graphic reaction
        // TODO: add progress to word
        setIterate(iterate + 1);
        setInput("");
      }
    }
  };

  const handleInput = (event) => {
    const inputValue = event.target.value;
    setInput(inputValue);
  };

  const getTrainingVocab = (allVocab) => {
    const numberOfVocab = props.numberOfVocabs;
    const vSortedByLangAndProgress = [];
    allVocab.forEach((obj) => {
      if (obj.language_id === languageId) {
        vSortedByLangAndProgress.push(obj);
      }
    });

    // TODO: Abfrage nach Progress & entsprechend eingrenzen
    const vocabChoice = [];
    while (vocabChoice.length < numberOfVocab) {
      const number = Math.floor(Math.random() * vSortedByLangAndProgress.length + 0);
      vocabChoice.push(vSortedByLangAndProgress[number]);
    }
    setTrainingVorab(vocabChoice);
  };

  return (
    <div className="margin_top">
      {iterate < trainingVorab.length ? (
        <form>
          <h2>{`Translate! ${iterate + 1}/${trainingVorab.length}`}</h2>
          <div className="form-group row">
            <label
              className="col-lg-3 col-xs-12 no_padding_left"
              htmlFor="train_vocabulary_translation"
            >
              {trainingVorab[iterate] ? trainingVorab[iterate]["english_word"] : null}
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
      ) : (
        <div>Completed! Show summary?</div>
      )}
    </div>
  );
};

export default VocabularyTraining_Queries;
