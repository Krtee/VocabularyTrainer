import React, { useState, useEffect, useGlobal } from "reactn";
import api from "../api";

const getVocabs = async () => {
  const res = await api.vocab.getVocab();
  return res;
};

const getProgress = async () => {
  const res = await api.vocab.getVocab();
  return res;
};

const VocabularyTraining_Queries = (props) => {
  const [vocab, setVocab] = useState([]);
  const [trainingVorab, setTrainingVorab] = useState([]);
  const [langName, setLangName] = useGlobal("langName");
  const [langID, ] = useGlobal("langID");
  const [iterate, setIterate] = useState(0);
  const [input, setInput] = useState("");
  const [summary, setSummary] = useGlobal("summary");
  const [user, setUser] = useGlobal("user");

  useEffect(() => {
    getVocabs().then((data) => {
      setVocab(data);
      getTrainingVocab(data);
      setSummary([]);
    });
  }, []);

  const handleSkip = () => {
    setIterate(iterate + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentWord = trainingVorab[iterate]
    const localSummary = summary;
    localSummary.push({currentWord, input})
    setSummary(localSummary)

    if (input) {
      if(input.toLowerCase() == currentWord.translation[langID].toLowerCase()){
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
      if (obj.translation[langID]) {    
        vSortedByLangAndProgress.push(obj);
      }
    });

    // TODO: Abfrage nach Progress & entsprechend eingrenzen
    // FIXME: Dürfen Vokabeln mehrmals vorkommen? Sonst bei den aktuell 5en passiert das recht oft
    // später dürfte das recht selten passieren. 
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
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
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
