import "../style.css";
import React,   { useGlobal } from "reactn";
import Navigation from "../components/Navigation";
import NoAuth from "../components/NoAuth";

const  AddVocabulary = () => {
  const [auth, setAuth] = useGlobal("auth");

  if (!auth) {
    return <NoAuth />;
  }

  async function callBackendAPI() {
    const response = await fetch("/express_backend");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  return (
    <div id="content" className="add_vocabulary">
      <Navigation />
      <form>
        <h1>Add vocabulary</h1>
        <h2>Enter the new word</h2>
        <div className="form-group row">
          <label className="col-lg-3 col-12 no_padding_left" htmlFor="add_vocabulary_english">
            Foreign
          </label>
          <input
            type="text"
            className="form-control col-lg-9 col-12"
            id="add_vocabulary_english"
            placeholder="type in Foreign language word"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add vocabulary
        </button>
      </form>
    </div>
  );
}

export default AddVocabulary;
