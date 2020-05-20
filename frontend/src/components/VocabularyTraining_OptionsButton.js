import React from "react";

class VocabularyTraining_OptionsButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: props.show };
  }

  handleClick = () => {
    const changeView = this.props.changeView;
    changeView("options");
  };

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={() => this.handleClick}>
        Start training
      </button>
    );
  }
}

export default VocabularyTraining_OptionsButton;
