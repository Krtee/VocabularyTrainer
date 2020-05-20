import React from "react";


class VocabularyTraining_OptionsButton extends React.Component {

    constructor(props) {
        super(props);
        this.show = props.show;
    }

    startTraining = () => {
        console.log("startTraining-Methode wurde aufgerufen. show ist aktuell: " + this.show);
        this.show = false;
        console.log("State wurde nun verändert. show ist aktuell: " + this.show);
        this.render();
    }

    render() {

        if (this.show) {
            return (
                <button type="button" className="btn btn-primary" onClick={this.startTraining}>Start training</button>
            )
        } else {
            return null;
        }

    }

}


export default VocabularyTraining_OptionsButton;


