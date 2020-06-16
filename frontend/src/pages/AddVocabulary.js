import React, { useGlobal, useState, createRef, useEffect } from "reactn";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

import "../style.scss";
import NavigationBottom from "../components/NavigationBottom";
import NavigationTop from "../components/NavigationTop";
import api from "../api";
import serverIsRunning from "../helper";
import useWindowDimensions from "../components/Windowsize";

const AddVocabulary = () => {
  const [auth] = useGlobal("auth");
  const [langID] = useGlobal("langID");
  const [serverError, setserverError] = useGlobal("serverError");
  const [user] = useGlobal("user");

  const [color, setColor] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  let textinput = createRef();
  let { width } = useWindowDimensions();

  useEffect(() => {
    serverIsRunning().then((isRunning) => {
      if (isRunning) {
        setserverError(false);
      } else {
        setserverError(true);
      }
    });
  }, []);

  if (!auth) {
    return <Redirect to="/" />;
  }

  const addVocab = async (event) => {
    event.preventDefault();
    setInfo("");
    setColor("no-color");
    setLoading(true);
    const data = {
      language_id: langID,
      english_word: textinput.current.value,
      user_id: user,
    };
    const res = await api.vocab.insert(data);

    if (res.status === 200) {
      const resProg = await api.progress.createProgress(data);
      if (resProg.success) {
        if (resProg.didAlreadyExist) {
          setInfo("This word is already in your collection.");
          setColor("info");
        } else {
          setInfo("Your word was successfully added.");
          setColor("right");
        }
      } else {
        setInfo("An error occured. Please try again later.");
        setColor("wrong");
      }
    } else {
      console.log("addVocab -> res", res);
      setInfo("Word not found. Please check the spelling.");
      setColor("wrong");
    }
    setLoading(false);
  };

  return (
    <div id="content" className="add_vocabulary">
      <NavigationTop width={width} />
      {width < 700 && <NavigationBottom page={"AddVocabulary"} />}
      {serverError ? (
         <Redirect to="/Error" />
      ) : (
        <form>
          <h1 className="margin_top_small">Add vocabulary</h1>
          <h2>Enter the word you want to add</h2>
          <div className="form-group row">
            <label
              className="col-lg-2 col-md-3 col-sm-3 col-12 no-padding-left"
              htmlFor="add_vocabulary_english"
            >
              English
            </label>
            <input
              type="text"
              className="form-control col-lg-10 col-md-9 col-sm-9 col-12"
              id="add_vocabulary_english"
              placeholder="type in English word"
              ref={textinput}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary margin_top_small"
            onClick={addVocab}
            disabled={loading}
          >
            {loading ? (
              <div className="spinner-border " role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Add vocabulary"
            )}
          </button>
          <Link to="/VocabularyList">
            <button
              type="button"
              className="btn btn-primary margin_left grey_button margin_top_small"
            >
              Show overview
            </button>
          </Link>
        </form>
      )}
      <div className={"p-1 inline_block margin_top " + color}>{info}</div>
    </div>
  );
};

export default AddVocabulary;
