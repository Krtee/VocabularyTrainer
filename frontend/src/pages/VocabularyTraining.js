import "../style.css";
import React, { useGlobal, useState } from "reactn";
import Navigation from "../components/Navigation";
import Options from "../components/VocabularyTraining_Options";
import Queries from "../components/VocabularyTraining_Queries";
import Summary from "../components/VocabularyTraining_Summary";
import { Redirect } from "react-router";

function VocabularyTraining() {
  const [auth, setAuth] = useGlobal("auth");
  const [showOptions, setShowOptions] = useState(true);
  const [showQueries, setShowQueries] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [buttonState, setButtonState] = useState("options");
  const [buttonText, setButtonText] = useState("Start training");
  const [savedSettings, setSavedSettings] = useState(false);

  if (!auth) {
    return <Redirect to="/" />;
  }

  const changeView = () => {
    if (buttonState === "options") {
      setButtonState("queries");
      setShowOptions(false);
      setShowQueries(true);
      setShowSummary(false);
      setButtonText("Stop Training");
    } else if (buttonState === "queries") {
      setButtonState("summary");
      setShowOptions(false);
      setShowQueries(false);
      setShowSummary(true);
      setButtonText("Start new Training");
    } else if (buttonState === "summary") {
      setButtonState("options");
      setShowOptions(true);
      setShowQueries(false);
      setShowSummary(false);
    }
  };

  const receiveInput = (input) => {
    setSavedSettings(true);
    console.info(input);
  };

  return (
    <div id="content" className="vocabulary_training">
      <Navigation />
      <h1>Vocabulary Training</h1>
      {showOptions ? <Options receiveInput={receiveInput} showButton={!savedSettings} /> : null}
      {showQueries ? <Queries show={false} /> : null}
      {showSummary ? <Summary show={false} /> : null}
      {savedSettings ? (
        <button type="button" className="btn btn-primary" onClick={changeView}>
          {`${buttonText}`}
        </button>
      ) : null}
    </div>
  );
}

export default VocabularyTraining;
