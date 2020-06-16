import "../style.scss";
import React, { useGlobal, useState, useEffect } from "reactn";
import NavigationTop from "../components/NavigationTop";
import { Redirect } from "react-router";
import api from "../api";
import VocabRow from "../components/VocabRow";
import Pagination from "../components/Pagination";
import NavigationBottom from "../components/NavigationBottom";
import useWindowDimensions from "../components/Windowsize";

const getProgressForUserAndLanguage = async (user_id, lang_id) => {
  try {
    const data = {
      user_id: user_id,
      lang_id: lang_id,
    };
    const res = await api.progress.getProgressForUserAndLanguage(data);
    if (res.length < 50) {
      // true if all words created
      await createBasicVocab(user_id, lang_id);
      return getProgressForUserAndLanguage(user_id, lang_id);
    }
    return res;
  } catch (error) {
    console.error(error);
  }
};

const createBasicVocab = async (user, id) => {
  const basics = require("../basic_vocab.json");
  const vocabulary = basics.vocabulary;

  Object.entries(vocabulary).forEach(async ([index, word]) => {
    const data = {
      language_id: id,
      english_word: word,
      user_id: user,
    };
      const res = await api.vocab.insert(data);
      if(res.status === 200){
        api.progress.createProgress(data);
      }
  });
  return true;
};

const VocabularyList = (props) => {
  const [auth] = useGlobal("auth");
  const [user] = useGlobal("user");
  const [langID] = useGlobal("langID");
  const [langName] = useGlobal("langName");

  const [prog, setProg] = useState([]);
  const [loading, setLoading] = useState(true);
  let { width } = useWindowDimensions();

  const [currentPage, setCurrentPage] = useState(1);
  const [vocabsPerPage] = useState(50);

  useEffect(() => {
    getProgressForUserAndLanguage(user, langID).then((data) => {
      setProg(data);
      setLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
      console.log("cleaned up");
    };
  }, []);

  if (!auth) {
    return <Redirect to="/" />;
  }

  var key = 0;

  const indexOfLastVocab = currentPage * vocabsPerPage;
  const indexOfFirstVocab = indexOfLastVocab - vocabsPerPage;
  const currentVocabs = prog.slice(indexOfFirstVocab, indexOfLastVocab);

  // Change page

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //TODO catch data as json from database
  return (
    <div id="content" className="vocabulary_list">
      <NavigationTop width={width} />
      {width < 700 && <NavigationBottom page={"VocabularyList"} />}
      <div id="vocabulary_list">
        <h1 className="margin_top_small">Vocabulary overview</h1>
        <div className="row vocabulary_list_entry">
          <div className="col-xl-2 col-lg-2 col-md-3 col-4 vocabulary_list_header">English</div>
          <div className="col-xl-2 col-lg-2 col-md-3 col-4 vocabulary_list_header">{langName}</div>
          <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_header">Progress</div>
        </div>

        {!loading && currentVocabs && currentVocabs.length > 0 ? (
          currentVocabs.map((progressObject) => {
            return (
              <VocabRow
                key={new Date().getTime() + key++}
                english_word={progressObject.english_word}
                progress={progressObject.progress}
                translation=""
                even={key % 2 === 0 ? true : false}
              />
            );
          })
        ) : (
          <div className="spinner-border m-5" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        <Pagination vocabsPerPage={vocabsPerPage} totalVocabs={prog.length} paginate={paginate} />
      </div>
    </div>
  );
};

export default VocabularyList;
