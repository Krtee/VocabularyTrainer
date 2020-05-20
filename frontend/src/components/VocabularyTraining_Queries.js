import React from "react";


class VocabularyTraining_Queries extends React.Component {

    constructor(props) {
        super(props);
        this.show = props.show;
    }


    render() {
        if (this.show) {
            return (
                <div className="margin_top">
                    <form>
                        <h2>Translate!</h2>
                        <div className="form-group row">
                            <label className="col-lg-3 col-xs-12 no_padding_left" htmlFor="train_vocabulary_translation">Example</label>
                            <input type="text" className="form-control col-lg-9 col-xs-12" id="train_vocabulary_translation" placeholder="type in translation" />
                        </div>

                        <button type="button" className="btn btn-primary">Send</button>
                        <button type="button" className="btn btn-primary margin_left">Stop training</button>
                    </form>
                </div>
            )
        } else {
            return null;
        }

    }

}


export default VocabularyTraining_Queries;


