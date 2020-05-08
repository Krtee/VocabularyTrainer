import '../style.css';
import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import MainContent from "../components/MainContent";
import VocabularyList from "../components/VocabularyList";
import ContentHandler from "../components/ContentHandler";



function Main() {

    useEffect(() =>{
        callBackendAPI()
            .then(res => console.log( {data: res.express} ))
            .catch(err => console.log(err));
    })

    async function callBackendAPI() {
        const response = await fetch('/express_backend');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };


  return (
    <MainContent/>
  );
}

export default Main;
