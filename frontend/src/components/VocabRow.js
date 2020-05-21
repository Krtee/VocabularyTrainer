import React from "react";

const LanguageButton = (props) => {
  const { english_word, translation } = props.vocab;

  return (
    <div className="row vocabulary_list_entry">
      <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_english">{english_word}</div>
      <div className="col-xl-2 col-lg-2 col-md-3 col-4 vocabulary_list_foreign">{translation}</div>
      <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_progress">2</div>
    </div>
  );
};

export default LanguageButton;
