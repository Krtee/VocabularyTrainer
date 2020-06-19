import React from "react";

const SendVocabFom = (props) => {
  return (
    <>
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
            onChange={props.change}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={props.action}>
          Add vocabulary
        </button>
      </form>
    </>
  );
};

export default SendVocabFom;
