import React, { useGlobal, useState } from "reactn";

const LanguageButton = (props) => {
  const { language, id } = props.language;
  const { getLanguage } = props;

  const [, setLangID] = useGlobal("langID");
  const [, setLangName] = useGlobal("langName");

  const handleSubmitLocal = (event) => {
    event.preventDefault();
    getLanguage(id, language);
    setLangID(id);
    setLangName(language);
  };

  return (
    <div className="col-4">
      <form onSubmit={handleSubmitLocal}>
        <input type="hidden" value={language} name="language"></input>
        <button type="submit" className="btn btn-primary margin_top col-lg-12 languages_option">
          {language}
        </button>
      </form>
    </div>
  );
};

export default LanguageButton;