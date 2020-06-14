import "../style.scss";
import NavigationTop from "../components/NavigationTop";
/* import axios from "axios";
 */import { Redirect } from "react-router";
import React, { useGlobal, useState, createRef } from "reactn";
import api from "../api";
import { Link } from "react-router-dom";
import NavigationBottom from "../components/NavigationBottom";
import useWindowDimensions from "../components/Windowsize";

const AddVocabulary = () => {
  let textinput = createRef();
  const [auth, ] = useGlobal("auth");
  const [langID, ] = useGlobal("langID");
  const [color, setColor] = useState("");
  const [info, setInfo] = useState("");
  const [user, ] = useGlobal("user");
  const [loading, setLoading] = useState(false)
  let {height, width} = useWindowDimensions();

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
    const res = await api.vocab.insert(data)
    if(res.status === 200) {
      await api.progress.createProgress(data)
      setInfo(res.data.message);
      setColor("right");
    } else {
      console.log("addVocab -> res", res)
      setInfo("Word not found. Please try another one.");
      setColor("wrong");
    }
    setLoading(false)
  };


  return (
    <div id="content" className="add_vocabulary">
      <NavigationTop width={width}/>
      {width < 700 && <NavigationBottom page={'AddVocabulary'}/>}
      <form>
        <h1 className="margin_top_small">Add vocabulary</h1>
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
        <button type="submit" className="btn btn-primary margin_top_small" onClick={addVocab} disabled={loading}>
          
          {loading ? (
            <div className="spinner-border " role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Add vocabulary"
          )}
        </button>
        <Link to="/VocabularyList">
          <button type="button" className="btn btn-primary margin_left grey_button margin_top_small">
            Show overview
          </button>
        </Link>
      </form>
      <div className={"p-1 inline_block margin_top " + color}>{info}</div>
    </div>
  );
};

export default AddVocabulary;
