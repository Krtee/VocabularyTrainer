import React from "react";
import { Link } from "react-router-dom";

const LanguageButton = (props) => {
  const { language, id } = props.language;
  return (
    <div className="col-lg-3">
      <Link to={{ pathname: `/VocabularyList`, query: { id, language } }}>
        <div className="col-lg-12 languages_option">{language}</div>
      </Link>
    </div>
  );
};

export default LanguageButton;


