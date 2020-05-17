import React from "react";
import Options from "./VocabularyTraining_Options";
import Queries from "./VocabularyTraining_Queries";
import Summary from "./VocabularyTraining_Summary";


class VocabularyTraining_ComponentHandler extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        if (this.props.value === 1) {
            return (<Options />)
        } else if (this.props.value === 2) {
            return (<Queries />)
        } else if (this.props.value === 3) {
            return (<Summary />)
        }
        return (<Options />)

    }


}


export default VocabularyTraining_ComponentHandler;
