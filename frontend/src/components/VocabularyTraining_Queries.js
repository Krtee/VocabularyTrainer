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
  const [langID] = useGlobal("langID");
  const [iterate, setIterate] = useState(0);
  const [input, setInput] = useState("");
  const [summary, setSummary] = useGlobal("summary");
  const [user, ] = useGlobal("user");
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
    // eslint-disable-next-line
  }, []);

  const handleSkip = () => {
    setIterate(iterate + 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentWord = trainingVorab[iterate];
    const localSummary = summary;
    localSummary.push({ currentWord, input });
    setSummary(localSummary);

    const idObj = {
      user_id: user,
      vocab_id: currentWord["_id"],
      lang_id: langID,
    };

    //TODO: What do do if word is wrong? Decrease progress? Or just reset RGIAR

    if (input) {
      if (input.toLowerCase().trim() === currentWord.translation[langID].toLowerCase()) {
        // Word correct
        // TODO: graphic reaction
        setIterate(iterate + 1);
        setInput("");
        setHelp("")

        // progressObj contains the ProgressObj before the update!
        const progressObj = await api.progress.increaseRGIAR(idObj);

        if (progressObj.progress === 1) {
          if (progressObj.right_guesses_in_a_row === 2) {
            api.progress.increaseProgress(idObj);
            console.info("%c Progress updated!", "Background: #00ff55");
          }
        } else if (progressObj.progress === 2) {
          if (
            progressObj.right_guesses_in_a_row === 2 ||
            progressObj.right_guesses_in_a_row === 5
          ) {
            api.progress.increaseProgress(idObj);
            console.info("%c Progress updated!", "Background: #33ff77");
          }
        } else {
          console.info("%c Maximum Progress level already achieved!", "Background: #0f0");
        }
      } else {
        api.progress.resetRGIAR(idObj);

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
      return data.data;
    });

    const vocabChoice = [];
    if (vocabFromDb.length < numberOfVocab) {
      setMessage(`Your selection contains only ${vocabFromDb.length} words.`);
      resetMessageIn5s();
    }

    while (vocabChoice.length < vocabFromDb.length && vocabChoice.length < numberOfVocab) {
      const number = Math.floor(Math.random() * vocabFromDb.length + 0);
      if (!vocabChoice.includes(vocabFromDb[number])) {
        vocabChoice.push(vocabFromDb[number]);
      }
    }
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

  const resetMessageIn5s = () => {
    setTimeout(() => { setMessage(null); }, 5000);
  }

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
