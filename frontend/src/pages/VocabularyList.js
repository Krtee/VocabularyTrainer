import "../style.css";
import React, { useEffect } from "react";
import Navigation from "../components/Navigation";


    function VocabularyList() {
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

        //TODO catch data as json from database
        return (
            <div id="content" class="vocabulary_list">
                <Navigation/>
                <div id="vocabulary_list">
                    <h1>Vocabulary overview</h1>
                    <div className="row vocabulary_list_entry">
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_header">English</div>
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_header">French</div>
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_header">Progress</div>
                    </div>
                    <div className="row vocabulary_list_entry">
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_english">vocabulary</div>
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_foreign">vocabulaire</div>
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_progress">2</div>
                    </div>
                    <div className="row vocabulary_list_entry">
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_english">Monday</div>
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_foreign">lundi</div>
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_progress">1</div>
                    </div>
                    <div className="row vocabulary_list_entry">
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_english">university</div>
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_foreign">université</div>
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_progress">3</div>
                    </div>
                    <div className="row vocabulary_list_entry">
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_english">vocabulary</div>
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_foreign">vocabulaire</div>
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_progress">2</div>
                    </div>
                    <div className="row vocabulary_list_entry">
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_english">Monday</div>
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_foreign">lundi</div>
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_progress">1</div>
                    </div>
                    <div className="row vocabulary_list_entry">
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_english">university</div>
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_foreign">université</div>
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_progress">3</div>
                    </div>
                    <div className="row vocabulary_list_entry">
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_english">vocabulary</div>
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_foreign">vocabulaire</div>
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_progress">2</div>
                    </div>
                    <div className="row vocabulary_list_entry">
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_english">Monday</div>
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_foreign">lundi</div>
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_progress">1</div>
                    </div>
                    <div className="row vocabulary_list_entry">
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_english">university</div>
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_foreign">université</div>
                        <div className="col-xl-1 col-lg-2 col-md-3 col-4 vocabulary_list_progress">3</div>
                    </div>
                </div>
            </div>
        );
    }

export default VocabularyList;
