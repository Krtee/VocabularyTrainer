import React from "react";

class VocabularyTraining_Options extends React.Component {
  constructor(props) {
    super(props);
    this.show = props.show;
  }

  startTraining = () => {
    console.log("startTraining-Methode wurde aufgerufen. show ist aktuell: " + this.show);
    this.show = false;
    console.log("State wurde nun verändert. show ist aktuell: " + this.show);
    this.render();
  };

  getOptions() {
    return this.show;
  }

  render() {
    return (
      <form>
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
              />
              <label className="form-check-label" htmlFor="training_options_radios_2">
                Show foreign language, ask English
              </label>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default VocabularyTraining_Options;
