import React from "react";
import AddVocabulary from "./AddVocabulary";
import TrainVocabulary from "./TrainVocabulary";
import VocabularyList from "./VocabularyList";
import Settings from "./Settings";


class ContentHandler extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        if (this.props.value == 1) {
            return (<VocabularyList />)
        } else if (this.props.value == 2) {
            return (<AddVocabulary />)
        } else if (this.props.value == 3) {
            return (<TrainVocabulary />)
        }
        else {
            return (<Settings />)
        }

    }


}


export default ContentHandler;


