import "../style.css";
import React, { useGlobal, useState } from "reactn";
import NavigationTop from "../components/NavigationTop";
import Options from "../components/VocabularyTraining_Options";
import Queries from "../components/VocabularyTraining_Queries";
import Summary from "../components/VocabularyTraining_Summary";
import { Redirect } from "react-router";
import NavigationBottom from "../components/NavigationBottom";

function VocabularyTraining() {
  const [auth, setAuth] = useGlobal("auth");
  const [showOptions, setShowOptions] = useState(true);
  const [showQueries, setShowQueries] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [buttonState, setButtonState] = useState("options");
  const [buttonText, setButtonText] = useState("Start training");
  const [savedSettings, setSavedSettings] = useState(false);
  const [numberOfVocab, setNumberOfVocab] = useGlobal("numberOfVocab");
  const [progress, setProgress] = useGlobal("progress");
  const [direction, setDirection] = useGlobal("direction");
  const [language, setLanguage] = useGlobal("language");

  if (!auth) {
    return <Redirect to="/" />;
  }

  const changeView = () => {
    if (buttonState === "options") {
      setButtonState("queries");
      setShowOptions(false);
      setShowQueries(true);
      setShowSummary(false);
      setButtonText("Stop training");
    } else if (buttonState === "queries") {
      setButtonState("summary");
      setShowOptions(false);
      setShowQueries(false);
      setShowSummary(true);
      setButtonText("Start new training");
    } else if (buttonState === "summary") {
      setButtonState("options");
      setShowOptions(true);
      setShowQueries(false);
      setShowSummary(false);
      setButtonText("Start training");
      setSavedSettings(false);
    }
  };

  const receiveInput = (input) => {
    setSavedSettings(true);
    if (input.vocabNumber === 0){
      setNumberOfVocab(25);
    } else {
      setNumberOfVocab(input.vocabNumber);
    }
    const progressArray = [];
    if (input.progress1) {
      progressArray.push(1);
    }
    if (input.progress2) {
      progressArray.push(2);
    }
    if (input.progress3) {
      progressArray.push(3);
    }
    setProgress(progressArray);
    if (input.training_options_radios) {
      setDirection(input.training_options_radios);
    }
  };

  return (
    <div id="content" className="vocabulary_training">
      <NavigationTop />
      <NavigationBottom page={'VocabularyTraining'}/>
      <h1>Vocabulary Training</h1>
      {showOptions && !savedSettings ? (
        <Options receiveInput={receiveInput} showButton={!savedSettings} onClick={changeView} />
      ) : null}
      {showQueries ? (
        <Queries
          show={false}
          numberOfVocabs={numberOfVocab}
          progress={progress}
          direction={direction}
          language={language}
        />
      ) : null}
      {showSummary ? <Summary show={false} /> : null}
      {savedSettings ? (
        <button type="button" className="btn btn-primary margin_top" onClick={changeView}>
          {`${buttonText}`}
        </button>
      ) : null}
    </div>
  );
}

export default VocabularyTraining;
