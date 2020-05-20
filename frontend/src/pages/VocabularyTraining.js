import "../style.css";
import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import Options from "../components/VocabularyTraining_Options";
import Queries from "../components/VocabularyTraining_Queries";
import Summary from "../components/VocabularyTraining_Summary";


function VocabularyTraining() {

    useEffect(() => {
        callBackendAPI()
            .then((res) => console.log({ data: res.express }))
            .catch((err) => console.log(err));
    });

    async function callBackendAPI() {
        const response = await fetch("/express_backend");
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    }


    return (
        <div id="content" className="vocabulary_training">
            <Navigation />
            <h1>Vocabulary Training</h1>
            <Options show={true} />
            <Queries show={false} />
            <Summary show={false} />
        </div>
    );
}

export default VocabularyTraining;
