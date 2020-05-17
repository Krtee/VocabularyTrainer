import "../style.css";
import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import ComponentHandler from "../components/VocabularyTraining_ComponentHandler";



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
      <div id="content" class="vocabulary_training">
            <Navigation />
            <h1>Vocabulary Training</h1>
            <ComponentHandler />
        </div>
    );
}

export default VocabularyTraining;
