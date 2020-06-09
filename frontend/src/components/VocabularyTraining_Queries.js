import React, { useState, useEffect, useGlobal } from "reactn";
import api from "../api";

const getProgress = async (query) => {
  const res = await api.progress.filterProgress(query);
  return res;
};

const getVocabsById = async (id) => {
  const res = await api.vocab.getVocabById(id);
  return res;
};

const VocabularyTraining_Queries = (props) => {
  const [trainingVorab, setTrainingVorab] = useState([]);
  const [langName, setLangName] = useGlobal("langName");
  const [langID] = useGlobal("langID");
  const [iterate, setIterate] = useState(0);
  const [input, setInput] = useState("");
  const [summary, setSummary] = useGlobal("summary");
  const [user, setUser] = useGlobal("user");
  const [progress] = useGlobal("progress");
  const [message, setMessage] = useState(null);
  const [help, setHelp] = useState(null);
  const [falseInputCount, setFalseInputCount] = useState(0);

  useEffect(() => {
    const query = { user_id: user, language_id: langID, progress: progress };

    getProgress(query).then((data) => {
      if (data.success) {
        getTrainingVocab(data.data);

        // reset Summary
        setSummary([]);
      }
    });
  }, []);

  const handleSkip = () => {
    setIterate(iterate + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentWord = trainingVorab[iterate];
    const localSummary = summary;
    localSummary.push({ currentWord, input });
    setSummary(localSummary);

    if (input) {
      if (input.toLowerCase() == currentWord.translation[langID].toLowerCase()) {
        // Word correct
        // TODO: graphic reaction
        // TODO: add progress to word
        setIterate(iterate + 1);
        setInput("");
      } else {
        const newInputCount = falseInputCount + 1;
        setFalseInputCount(newInputCount);
        if (falseInputCount >= 1) {
          const translationByDirection =
            props.direction === "fo_en"
              ? currentWord.translation[langID]
              : currentWord.english_word;
          setHelp(translationByDirection);
        }
      }
    }
  };

  const handleInput = (event) => {
    const inputValue = event.target.value;
    setInput(inputValue);
  };

  const getTrainingVocab = async (sortedVocab) => {
    const numberOfVocab = props.numberOfVocabs;

    // VocabIds Aus DB:Progresses
    const ids = [];
    sortedVocab.forEach((vocab) => {
      ids.push(vocab.vocab_id);
    });

    // Vocabs from DB:Vocabs
    const vocabFromDb = await getVocabsById(ids).then((data) => {
      // console.log("%c data: ", "background: #009933; color: white", data.data);
      return data.data;
    });

    const vocabChoice = [];
    // console.log("%c vSortedByLang: ", "background: #009933; color: white", vocabFromDb);
    if (vocabFromDb.length < numberOfVocab) {
      setMessage(`Your selection contains only ${vocabFromDb.length} words.`);
    }

    while (vocabChoice.length < vocabFromDb.length && vocabChoice.length < numberOfVocab) {
      const number = Math.floor(Math.random() * vocabFromDb.length + 0);
      if (!vocabChoice.includes(vocabFromDb[number])) {
        vocabChoice.push(vocabFromDb[number]);
      }
    }
    // console.log("%c vocabChoice: ", "background: #00b33c; color: white", vocabChoice);
    setTrainingVorab(vocabChoice);
  };

  const renderTrainingVocab = () => {
    if (trainingVorab[iterate]) {
      if (props.direction === "fo_en") {
        // default
        return trainingVorab[iterate]["english_word"];
      }
      return trainingVorab[iterate].translation[langID];
    }
    return "error";
  };

  return (
    <div className="margin_top">
      {iterate < trainingVorab.length ? (
        <form>
          {message ? <p className="bg-warning p-1">{message}</p> : null}
          <h2>{`Translate! ${iterate + 1}/${trainingVorab.length}`}</h2>
          <div className="form-group row">
            <label
              className="col-lg-3 col-xs-12 no_padding_left"
              htmlFor="train_vocabulary_translation"
            >
              {renderTrainingVocab()}
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
          {help ? <p className="alert-success">Translation: {help}</p> : null}
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
