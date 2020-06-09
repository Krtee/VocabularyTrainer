import "../style.css";
import NavigationTop from "../components/NavigationTop";
/* import axios from "axios";
 */import { Redirect } from "react-router";
import React, { useGlobal, useState, createRef } from "reactn";
import api from "../api";
import { Link } from "react-router-dom";
import SendVocabFom from "../components/SendVocabFom";
import NavigationBottom from "../components/NavigationBottom";

const AddVocabulary = () => {
  let textinput = createRef();
  const [auth, setAuth] = useGlobal("auth");
  const [langID, setLangID] = useGlobal("langID");
  const [color, setColor] = useState("");
  const [info, setInfo] = useState("");
  const [user, setUser] = useGlobal("user");
  const [loading, setLoading] = useState(false)

  if (!auth) {
    return <Redirect to="/" />;
  }

  const addVocab = async (event) => {
    event.preventDefault();
    setLoading(true)
    const data = {
      language_id: langID,
      english_word: textinput.current.value,
      user_id: user,
    };

    const res = await api.vocab.insert(data);
    if(res.success === true) {
      setInfo(res.info);
      setColor("right");
    } else {
      setInfo(res.error);
      setColor("wrong");
    }
    setLoading(false)
  };


  return (
    <div id="content" className="add_vocabulary">
      <NavigationTop />
      <NavigationBottom page={'AddVocabulary'}/>
      <form>
        <h1>Add vocabulary</h1>
        <h2>Enter the word you want to add</h2>
        <div className="form-group row">
          <label className="col-lg-2 col-12 no_padding_left" htmlFor="add_vocabulary_english">
            English
          </label>
          <input
            type="text"
            className="form-control col-lg-10 col-12"
            id="add_vocabulary_english"
            placeholder="type in English word"
            ref={textinput}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={addVocab} disabled={loading}>
          
          {loading ? (
            <div className="spinner-border " role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Add vocabulary"
          )}
        </button>
        <Link to="/VocabularyList">
          <button type="button" className="btn btn-primary margin_left grey_button">
            Show overview
          </button>
        </Link>
      </form>
      <div className={"inline_block margin_top " + color}>{info}</div>
    </div>
  );
};

export default AddVocabulary;
