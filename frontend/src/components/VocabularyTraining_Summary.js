import React, { useGlobal } from "reactn";
import SummaryRow from "../components/SummaryRow";

const VocabularyTraining_Summary = (props) => {
  const [summary, setSummary] = useGlobal("summary");
  const [langID, setLangID] = useGlobal("langID");
  const [user] = useGlobal("user");

  let i = 0;

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
        const test = entry.currentWord.translation[langID]
          ? entry.currentWord.translation[langID]
          : "HOOOOOOW";
        i++;
        return (
          <SummaryRow
            key={i++}
            vocab={entry.currentWord.english_word}
            input={entry.input}
            correct={test}
            english_word={entry.currentWord.english_word}
            langID={langID}
            user={user}
            key={i}
          />
        );
      })}
    </div>
  );
};

export default VocabularyTraining_Summary;
