import '../style.css';
import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import VocabularyList from "../components/VocabularyList";



function Languages() {

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
    <div>
        <h1>Languages</h1>
        <h2>Select the language you want to practise.</h2>
        <div className="row box">
            <div className="col-lg-3"><Link to="/main"><div className="col-lg-12 languages_option">French</div></Link></div>
            <div className="col-lg-3"><Link to="/main"><div className="col-lg-12 languages_option">Spanish</div></Link></div>
            <div className="col-lg-3"><Link to="/main"><div className="col-lg-12 languages_option">Swedish</div></Link></div>
            <div className="col-lg-3"><Link to="/main"><div className="col-lg-12 languages_option">Dutch</div></Link></div>
        </div>
        <button type="button" className="btn btn-primary">Add new language</button>
    </div>
  );
}


export default Languages;
