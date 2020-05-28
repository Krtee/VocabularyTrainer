import React from "react";
import { Link } from "react-router-dom";

const LanguageButton = (props) => {
  const { language, id } = props.language;
  const { getLanguage } = props;

  const handleSubmitLocal = (event) => {
    event.preventDefault();
    getLanguage(id, language);
  };

  return (
    <div className="col-lg-3">
      {/* <Link to={{ pathname: `/VocabularyList`, query: { id, language } }}> */}
      <form onSubmit={handleSubmitLocal}>
        {/* <div>{language}</div> */}
        <input type="hidden" value={language} name="language"></input>
        <button type="submit" className="btn btn-primary margin_top col-lg-12 languages_option">
          {language}
        </button>
      </form>
      {/* </Link> */}
    </div>
  );
};

export default LanguageButton;
