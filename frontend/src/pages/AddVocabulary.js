import "../style.css";
import Navigation from "../components/Navigation";
/* import axios from "axios";
 */import { Redirect } from "react-router";
import React, { useGlobal, useState, createRef } from "reactn";
import api from "../api";
import SendVocabFom from "../components/SendVocabFom";

const AddVocabulary = () => {
  let [textinput,setTextinput] = useState();

  const [auth, setAuth] = useGlobal("auth");
  const [color, setColor] = useState("");
  const [info, setInfo] = useState("");

  if (!auth) {
    return <Redirect to="/" />;
  }

  const addVocab = async (event) => {
    event.preventDefault();
    const data = {
      language_id: "de",
      english_word: textinput,
    };

    const res = await api.vocab.insert(data);
    console.log("res: " + res);
    if(res.success === true) {
      setInfo(res.info);
      setColor("right");
    } else {
      setInfo(res.error);
      setColor("wrong");
    }

  };

  const onChange = (event)=>{
    console.log(event)
    setTextinput(event.target.value)
  }

  return (
    <div id="content" className="add_vocabulary">
      <Navigation />
      <SendVocabFom change={(e) => onChange(e)} action={addVocab}/>
    </div>
  );
};

export default AddVocabulary;
