import React from "react";

class VocabularyTraining_Options extends React.Component {
  constructor(props) {
    super(props);
    this.show = props.show;
    this.state = {
      vocabNumber: 0,
      progress1: false,
      progress2: false,
      progress3: false,
      training_options_radios: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getOptions() {
    return this.show;
  }

  handleSubmit(event) {
    event.preventDefault();
    const { receiveInput } = this.props;
    receiveInput(this.state);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { showButton } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Please set your training prefrences</h2>
        <div className="form-group row">
          <label className="col-lg-4 col-xs-12 no_padding_left" htmlFor="training_options_amount">
            How many vocabulary do you want to practise?
          </label>
          <input
            type="number"
            className="form-control col-lg-8 col-xs-12"
            id="training_options_amount"
            placeholder="Enter number"
            name="vocabNumber"
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group row">
          <label className="col-lg-4 col-xs-12 no_padding_left" htmlFor="training_options_amount">
            Train vocabulary with following progress:
          </label>
          <div className="col-lg-8 col-xs-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="1"
                id="training_options_check_1"
                name="progress1"
                onChange={this.handleChange}
              />
              <label className="form-check-label" htmlFor="training_options_check_1">
                1
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="2"
                id="training_options_check_2"
                name="progress2"
                onChange={this.handleChange}
              />
              <label className="form-check-label" htmlFor="training_options_check_2">
                2
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="3"
                id="training_options_check_2"
                name="progress3"
                onChange={this.handleChange}
              />
              <label className="form-check-label" htmlFor="training_options_check_2">
                3
              </label>
            </div>
          </div>
        </div>

        <div className="form-group row">
          <label
            className="col-lg-4 col-xs-12 no_padding_left"
            htmlFor="training_options_direction"
          >
            Direction
          </label>
          <div className="col-lg-8 col-xs-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="training_options_radios"
                id="training_options_radios_1"
                value="en_fo"
                onChange={this.handleChange}
              />
              <label className="form-check-label" htmlFor="training_options_radios_1">
                Show English, ask foreign language
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="training_options_radios"
                id="training_options_radios_2"
                value="fo_en"
                onChange={this.handleChange}
              />
              <label className="form-check-label" htmlFor="training_options_radios_2">
                Show foreign language, ask English
              </label>
            </div>
          </div>
        </div>
        {showButton ? (
          <button type="submit" className="btn btn-primary">
            Save options
          </button>
        ) : null}
      </form>
    );
  }
}

export default VocabularyTraining_Options;
