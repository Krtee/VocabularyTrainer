import "../style.css";
import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Options from "../components/VocabularyTraining_Options";
import Queries from "../components/VocabularyTraining_Queries";
import Summary from "../components/VocabularyTraining_Summary";
import OptionsButton from "../components/VocabularyTraining_OptionsButton";

function VocabularyTraining() {
  const [showOptions, setShowOptions] = useState(true);
  const [showQueries, setShowQueries] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [buttonState, setButtonState] = useState("options");
  const [buttonText, setButtonText] = useState("Start training");


  const changeView = () => {
    if (buttonState === "options") {
      setButtonState("queries");
      setShowOptions(false);
      setShowQueries(true);
      setShowSummary(false);
      setButtonText("Stop Training")
    } else if (buttonState === "queries") {
      setButtonState("summary");
      setShowOptions(false);
      setShowQueries(false);
      setShowSummary(true);
      setButtonText("Start new Training")
    } else if (buttonState === "summary") {
      setButtonState("options");
      setShowOptions(true);
      setShowQueries(false);
      setShowSummary(false);
    }
  };

  return (
    <div id="content" className="vocabulary_training">
      <Navigation />
      <h1>Vocabulary Training</h1>
      {showOptions ? <Options /> : null}
      {showQueries ? <Queries show={false} /> : null}
      {showSummary ? <Summary show={false} /> : null}
      {buttonState  ? (
        <button type="button" className="btn btn-primary" onClick={changeView}>
          {`${buttonText}`}
        </button>
      ) : null}
    </div>
  );
}

export default VocabularyTraining;
