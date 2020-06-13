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
  }, []);

  return (
    <div
      className={`row vocabulary_list_entry ${
        correct.toLowerCase().trim() === input.toLowerCase().trim() ? "right" : "wrong"
      }`}
    >
      <div className="col-3">{vocab}</div>
      <div className="col-3">{input}</div>
      <div className="col-3">{correct}</div>
      <div className="col-3">{progress}</div>
    </div>
  );
};

export default SummaryRow;
