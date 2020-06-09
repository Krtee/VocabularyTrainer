import React, {useEffect, useState} from "reactn";
import api from "../api";

const getProgress = async (vocabID) => {
    const data = await api.progress.getProgressByVocabId(vocabID)
    try {
        return data.progress 
    } catch (error) {
        console.error(error)
    }
    return -1;
}

const SummaryRow = (props) => {
  const { vocab, input, correct, vocabID } = props;
  const [progress, setProgress] = useState(null)

    useEffect(() => {
        getProgress(vocabID).then((data) => {
            setProgress(data)
        })
    }, [])
    
  return (
    <div className={`row vocabulary_list_entry ${correct.toLowerCase() == input.toLowerCase() ? "right" : "wrong"}`}>
      <div className="col-3">{vocab}</div>
      <div className="col-3">{input}</div>
      <div className="col-3">{correct}</div>
      <div className="col-3">{progress}</div>
    </div>
  );
};

export default SummaryRow;
