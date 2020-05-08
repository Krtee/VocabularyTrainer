import React from "react";
import TrainVocabularySummary from "./TrainVocabularySummary";


class TrainVocabularyQueries extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: false }
    }

    handleClick = () => {
        this.setState({
            value: !this.state.value
        })
    }


    render() {
        if (this.props.value) {
            return (
                <div className="margin_top">
                    <form>
                        <h2>Translate!</h2>
                        <div className="form-group row">
                            <label className="col-lg-3 col-xs-12 no_padding_left" htmlFor="train_vocabulary_translation">Example</label>
                            <input type="text" className="form-control col-lg-9 col-xs-12" id="train_vocabulary_translation" placeholder="type in translation" />
                        </div>

                        <button type="button" className="btn btn-primary" onClick={this.handleClick}>Send</button>
                        <button type="button" className="btn btn-primary margin_left" onClick={this.handleClick}>Stop training</button>
                    </form>
                    <TrainVocabularySummary value={this.state.value} />
                </div>
            )
        } else {
            return (<div />)
        }

    }

}


export default TrainVocabularyQueries;


