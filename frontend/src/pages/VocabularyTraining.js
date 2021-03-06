import React, { useGlobal, useState, useEffect } from "reactn";
import { Redirect } from "react-router";
import "../style.scss";
import NavigationBottom from "../components/NavigationBottom";
import NavigationTop from "../components/NavigationTop";
import Options from "../components/VocabularyTraining_Options";
import Queries from "../components/VocabularyTraining_Queries";
import Summary from "../components/VocabularyTraining_Summary";
import serverIsRunning from "../helper";
import useWindowDimensions from "../components/Windowsize";

function VocabularyTraining() {
  const [direction, setDirection] = useGlobal("direction");
  const [language] = useGlobal("language");
  const [numberOfVocab, setNumberOfVocab] = useGlobal("numberOfVocab");
  const [progress, setProgress] = useGlobal("progress");
  const [serverError, setserverError] = useGlobal("serverError");

  const [buttonState, setButtonState] = useState("options");
  const [buttonText, setButtonText] = useState("Start training");
  const [savedSettings, setSavedSettings] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [showQueries, setShowQueries] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  let { width } = useWindowDimensions();

  useEffect(() => {
    serverIsRunning().then((isRunning) => {
      if (isRunning) {
        setserverError(false);
      } else {
        setserverError(true);
      }
    });
    // eslint-disable-next-line
  }, []);

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
    if (input.vocabNumber === 0) {
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
    } else {
      setDirection("fo_en");
    }
  };

  return (
    <>
      {serverError ? (
        <Redirect to="/Error" />
      ) : localStorage.getItem("isAuthorized") === "false" ||
        localStorage.getItem("isAuthorized") === false ? (
        <Redirect to="/" />
      ) : (
        <div id="content" className="vocabulary_training">
          <NavigationTop width={width} />
          {width < 700 && <NavigationBottom page={"VocabularyTraining"} />}
          <h1 className="margin_top_small">Vocabulary Training</h1>
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
            <button type="button" className="blue-button margin_top" onClick={changeView}>
              {`${buttonText}`}
            </button>
          ) : null}
        </div>
      )}
    </>
  );
}

export default VocabularyTraining;
