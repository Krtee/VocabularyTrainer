import React from "react";

class VocabularyList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    openSignup = () => {
        alert('changing component')
    }

    render() {

        return (
            <div id="vocabulary_list">
                <h1>Vocabulary overview</h1>
                <div className="row vocabulary_list_entry">
                    <div className="col-4 vocabulary_list_header">English</div>
                    <div className="col-4 vocabulary_list_header">French</div>
                    <div className="col-4 vocabulary_list_header">Progress</div>
                </div>
                <div className="row vocabulary_list_entry">
                    <div className="col-4 vocabulary_list_english">vocabulary</div>
                    <div className="col-4 vocabulary_list_foreign">vocabulaire</div>
                    <div className="col-4 vocabulary_list_progress">2</div>
                </div>
                <div className="row vocabulary_list_entry">
                    <div className="col-4 vocabulary_list_english">Monday</div>
                    <div className="col-4 vocabulary_list_foreign">lundi</div>
                    <div className="col-4 vocabulary_list_progress">1</div>
                </div>
                <div className="row vocabulary_list_entry">
                    <div className="col-4 vocabulary_list_english">university</div>
                    <div className="col-4 vocabulary_list_foreign">université</div>
                    <div className="col-4 vocabulary_list_progress">3</div>
                </div>
                <div className="row vocabulary_list_entry">
                    <div className="col-4 vocabulary_list_english">vocabulary</div>
                    <div className="col-4 vocabulary_list_foreign">vocabulaire</div>
                    <div className="col-4 vocabulary_list_progress">2</div>
                </div>
                <div className="row vocabulary_list_entry">
                    <div className="col-4 vocabulary_list_english">Monday</div>
                    <div className="col-4 vocabulary_list_foreign">lundi</div>
                    <div className="col-4 vocabulary_list_progress">1</div>
                </div>
                <div className="row vocabulary_list_entry">
                    <div className="col-4 vocabulary_list_english">university</div>
                    <div className="col-4 vocabulary_list_foreign">université</div>
                    <div className="col-4 vocabulary_list_progress">3</div>
                </div>
                <div className="row vocabulary_list_entry">
                    <div className="col-4 vocabulary_list_english">vocabulary</div>
                    <div className="col-4 vocabulary_list_foreign">vocabulaire</div>
                    <div className="col-4 vocabulary_list_progress">2</div>
                </div>
                <div className="row vocabulary_list_entry">
                    <div className="col-4 vocabulary_list_english">Monday</div>
                    <div className="col-4 vocabulary_list_foreign">lundi</div>
                    <div className="col-4 vocabulary_list_progress">1</div>
                </div>
                <div className="row vocabulary_list_entry">
                    <div className="col-4 vocabulary_list_english">university</div>
                    <div className="col-4 vocabulary_list_foreign">université</div>
                    <div className="col-4 vocabulary_list_progress">3</div>
                </div>
            </div>

        )
    }

}




export default VocabularyList;