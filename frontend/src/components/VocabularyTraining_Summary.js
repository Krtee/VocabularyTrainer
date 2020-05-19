import React from "react";

class VocabularyTraining_Summary extends React.Component {

    constructor(props) {
        super(props);
        this.show = props.show;
    }


    render() {
        if (this.show) {
            return (
                <div id="training_summary" className="margin_top">
                    <h2>Training summary</h2>
                    <div className="row vocabulary_list_entry">
                        <div className="col-3 vocabulary_list_header">Given word</div>
                        <div className="col-3 vocabulary_list_header">Your translation</div>
                        <div className="col-3 vocabulary_list_header">Correct translation</div>
                        <div className="col-3 vocabulary_list_header">New progress</div>
                    </div>
                    <div className="row vocabulary_list_entry right">
                        <div className="col-3">Example</div>
                        <div className="col-3">Beispiel</div>
                        <div className="col-3">Beispiel</div>
                        <div className="col-3">3</div>
                    </div>
                    <div className="row vocabulary_list_entry wrong">
                        <div className="col-3">Example</div>
                        <div className="col-3">Beispiel</div>
                        <div className="col-3">XXX</div>
                        <div className="col-3">1</div>
                    </div>
                    <div className="row vocabulary_list_entry right">
                        <div className="col-3">Example</div>
                        <div className="col-3">Beispiel</div>
                        <div className="col-3">Beispiel</div>
                        <div className="col-3">2</div>
                    </div>
                </div>
            );
        } else {
            return <div />;
        }
    }
}

export default VocabularyTraining_Summary;
