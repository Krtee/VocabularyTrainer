import "../style.css";
import Navigation from "../components/Navigation";
/* import axios from "axios";
 */import { Redirect } from "react-router";
import React, { useGlobal, createRef } from "reactn";
import api from "../api";

const AddVocabulary = () => {
  let textinput = createRef();

  const [auth, setAuth] = useGlobal("auth");

  if (!auth) {
    return <Redirect to="/" />;
  }

  const addVocab = () => {
    const data = {
      language_id: "de",
      english_word: textinput.current.value,
    };
    api.vocab.insert(data);
  };

  return (
    <div id="content" className="add_vocabulary">
      <Navigation />
      <form>
        <h1>Add vocabulary</h1>
        <h2>Enter the word you want to add</h2>
        <div className="form-group row">
          <label className="col-lg-3 col-12 no_padding_left" htmlFor="add_vocabulary_english">
            English
          </label>
          <input
            type="text"
            className="form-control col-lg-9 col-12"
            id="add_vocabulary_english"
            placeholder="type in English word"
            ref={textinput}
          />
        </div>
        {/* <div className="form-group row">
          <label className="col-lg-3 col-12 no_padding_left" htmlFor="add_vocabulary_english">
            Foreign
          </label>
          <input
            type="text"
            className="form-control col-lg-9 col-12"
            id="add_vocabulary_english"
            placeholder="type in Forein language word"
          />
        </div> */}

        <button type="submit" className="btn btn-primary" onClick={addVocab}>
          Add vocabulary
        </button>
      </form>
    </div>
  );
};

export default AddVocabulary;
