import React, { useEffect, useState } from "reactn";
import api from "../api";

const getProgress = async (english_word, user, langID) => {
  const data = await api.progress.searchProgress({ english_word, user_id: user, language_id: langID });
  try {
    return data.progress;
  } catch (error) {
    console.error(error);
  }
  return -1;
};

const SummaryRow = (props) => {
  const { vocab, input, correct, english_word, user, langID } = props;
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    getProgress(english_word, user, langID).then((data) => {
      setProgress(data);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={`vocabulary_list_entry ${
        correct.toLowerCase().trim() === input.toLowerCase().trim() ? "right" : "wrong"
        }`}
    >

      {
        props.width > 700 ?
          <div className="row">
            <div className="col-3">{vocab}</div>
            <div className="col-3">{input}</div>
            <div className="col-3">{correct}</div>
            <div className="col-3">{progress}</div>
          </div>
          :
          <>
            <div className="row">
              <div className="col-6 bold">Given word: </div>
              <div className="col-6">{vocab}</div>
            </div>
            <div className="row">
              <div className="col-6 bold">Your translation: </div>
              <div className="col-6">{input}</div>
            </div>
            <div className="row">
              <div className="col-6 bold">Correct translation: </div>
              <div className="col-6">{correct}</div>
            </div>
            <div className="row">
              <div className="col-6 bold">Current progress: </div>
              <div className="col-6">{progress}</div>
            </div>
          </>
      }

    </div>


  );
};

export default SummaryRow;
