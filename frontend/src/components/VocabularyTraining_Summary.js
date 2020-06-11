import React, { useGlobal } from "reactn";
import SummaryRow from "../components/SummaryRow";

const VocabularyTraining_Summary = (props) => {
  const [summary, ] = useGlobal("summary");
  const [langID, ] = useGlobal("langID");
  var i = 0;

  return (
    <div id="training_summary" className="margin_top">
      <h2>Training summary</h2>
      <div className="row vocabulary_list_entry">
        <div className="col-3 vocabulary_list_header">Given word</div>
        <div className="col-3 vocabulary_list_header">Your translation</div>
        <div className="col-3 vocabulary_list_header">Correct translation</div>
        <div className="col-3 vocabulary_list_header">Current Progress</div>
      </div>
      {summary.map((entry) => {
        
        return (
          <SummaryRow
            key={i++}
            vocab={entry.currentWord.english_word}
            input={entry.input}
            correct={entry.currentWord.translation[langID]}
            vocabID={entry.currentWord["_id"]}
          />
        );
      })}
    </div>
  );
};

export default VocabularyTraining_Summary;
