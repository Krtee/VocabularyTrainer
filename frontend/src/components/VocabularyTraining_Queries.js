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
  const [progress] = useGlobal("progress");
  const [summary, setSummary] = useGlobal("summary");
  const [user] = useGlobal("user");
  const [progressSetting] = useGlobal("progressSetting");
  const [direction] = useGlobal("direction");

  const [falseInputCount, setFalseInputCount] = useState(0);
  const [help, setHelp] = useState(null);
  const [input, setInput] = useState("");
  const [iterate, setIterate] = useState(0);
  const [message, setMessage] = useState(null);

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
    setInput("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentWord = trainingVorab[iterate];
    const localSummary = summary;
    localSummary.push({ currentWord, input });
    setSummary(localSummary);

    const idObj = {
      user_id: user,
      english_word: currentWord.english_word,
      lang_id: langID,
    };

    if (input) {
      let wellJustFakeIt = false;
      let correct;

      if (!currentWord.translation[langID]) {
        // TODO: WHY CAN THIS EVEN HAPPEN? IT SHOULD NOT APPEAR FOR THIS LANGUAGE THEN!!!
        console.error("Word not found in current language.");
        wellJustFakeIt = true;
      } else {
        correct =
          direction === "fo_en"
            ? input.toLowerCase().trim() === currentWord.translation[langID].toLowerCase()
            : input.toLowerCase().trim() === currentWord.english_word.toLowerCase();
      }

      if (correct || wellJustFakeIt) {
        // Word correct
        // TODO: graphic reaction
        setIterate(iterate + 1);
        setInput("");
        setHelp("");

        // progressObj contains the ProgressObj before the update!
        const progressObj = await api.progress.increaseRGIAR(idObj);

        if (progressObj.progress === 1) {
          if (progressObj.right_guesses_in_a_row === progressSetting - 1) {
            api.progress.increaseProgress(idObj);
            console.info("%c Progress updated!", "Background: #00ff55");
          }
        } else if (progressObj.progress === 2) {
          if (
            progressObj.right_guesses_in_a_row === progressSetting - 1 ||
            progressObj.right_guesses_in_a_row === progressSetting * 2 - 1
          ) {
            api.progress.increaseProgress(idObj);
            console.info("%c Progress updated!", "Background: #33ff77");
          }
        } else {
          console.info("%c Maximum Progress level already achieved!", "Background: #0f0");
        }
      } else {
        api.progress.resetRGIAR(idObj);
        setHelp("Unfortunately not correct! Please try again.");
        const newInputCount = falseInputCount + 1;
        setFalseInputCount(newInputCount);
        if (falseInputCount >= 1) {
          const translationByDirection =
            props.direction === "fo_en"
              ? currentWord.translation[langID]
              : currentWord.english_word;
          setHelp(`Translation: ${translationByDirection}`);
          setFalseInputCount(0);
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
    const en_words = [];
    sortedVocab.forEach((vocab) => {
      en_words.push(vocab.english_word);
    });

    // Vocabs from DB:Vocabs
    const vocabFromDb = await getVocabsById(en_words).then((data) => {
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
    setTimeout(() => {
      setMessage(null);
    }, 5000);
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
          {help ? <p className="alert-warning">{help}</p> : null}
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
