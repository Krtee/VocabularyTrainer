import React from "react";

class AddVocabulary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    openSignup = () => {
        alert('changing component')
    }

    render() {

        return (
            <form>
                <h1>Add vocabulary</h1>
                <h2>Enter the new word</h2>
                <div className="form-group row">
                    <label className="col-lg-3 col-xs-12 no_padding_left" htmlFor="add_vocabulary_english">English</label>
                    <input type="text" className="form-control col-lg-9 col-xs-12" id="add_vocabulary_english" placeholder="type in English word" />
                </div>
                <div className="form-group row">
                    <label className="col-lg-3 col-xs-12 no_padding_left" htmlFor="add_vocabulary_english">Foreign</label>
                    <input type="text" className="form-control col-lg-9 col-xs-12" id="add_vocabulary_english" placeholder="type in Forein language word" />
                </div>

                <button type="submit" className="btn btn-primary">Add vocabulary</button>
            </form>

        )
    }

}




export default AddVocabulary;


