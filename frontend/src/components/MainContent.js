import React from "react";
import { Link } from "react-router-dom";
import ContentHandler from "./ContentHandler";


class MainContent extends React.Component {


    constructor(props) {
        super(props);
        this.state = { value: 1 };
    }

    openSignup = () => {
        alert('changing component')
    }

    chooseVocabularyList = () => {
        this.setState({
            value: 1
        })
    }

    chooseAddVocabulary = () => {
        this.setState({
            value: 2
        })
    }

    chooseTrainVocabulary = () => {
        this.setState({
            value: 3
        })
    }

    chooseSettings = () => {
        this.setState({
            value: 4
        })
    }

    render() {
        // The different languages have to be requested from the database.

        return (
            <div>
                <div className="row">
                    <div className="col-lg-3" id="menu">
                        <div className="row">
                            <div className="col-lg-12 menu_option" onClick={this.chooseVocabularyList}>Vocabulary overview</div>
                            <div className="col-lg-12 menu_option" onClick={this.chooseAddVocabulary}>Add vocabulary</div>
                            <div className="col-lg-12 menu_option" onClick={this.chooseTrainVocabulary}>Train vocabulary</div>
                            <Link to="/languages" className="col-lg-12 menu_option"><div>Change language</div></Link>
                            <div className="col-lg-12 menu_option" onClick={this.chooseSettings}>Settings</div>
                            <Link to="/" className="col-lg-12 menu_option"><div>Logout</div></Link>
                        </div>
                    </div>
                    <div className="col-lg-9 box" id="content">
                        <ContentHandler value={this.state.value} />
                    </div>
                </div>
            </div>






        )
    }

}




export default MainContent;


