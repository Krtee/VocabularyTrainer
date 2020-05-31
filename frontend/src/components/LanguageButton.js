import { Link } from "react-router-dom";
import React, { useGlobal} from "reactn";


const LanguageButton = (props) => {
  const { language, id } = props.language;
  const [langID, setLangID] = useGlobal("langID");
  const [langName, setLangName] = useGlobal("langName");

  const setLanguage = () => {
    setLangID(id);
    setLangName(language);
  };

  return (
    <div className="col-lg-3">
      <Link to={{ pathname: `/VocabularyList`, query: { id, language } }}>
        <div className="col-lg-12 languages_option" onClick={setLanguage}>{language}</div>
      </Link>
    </div>
  );
};

export default LanguageButton;







