import React, { useGlobal, useState } from "reactn";

const VocabularyTraining_Options = (props) => {
  const [language, ] = useGlobal("language");
  const [vocabNumber, setVocabNumber] = useState(0);
  const [progress1, setProgress1] = useState(true);
  const [progress2, setProgress2] = useState(true);
  const [progress3, setProgress3] = useState(true);
  const [training_options_radios, setTraining_options_radios] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { receiveInput } = props;
    receiveInput({ vocabNumber, progress1, progress2, progress3, training_options_radios });
    props.onClick();
  };

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    switch (name) {
      case "vocabNumber":
        setVocabNumber(value);
        break;
      case "progress1":
        setProgress1(!progress1);
        break;

      case "progress2":
        setProgress2(!progress2);
        break;

      case "progress3":
        setProgress3(!progress3);
        break;
      case "training_options_radios":
        setTraining_options_radios(value);
        break;

      default:
        console.error("Oh..");
        break;
    }
  };

  const { showButton } = props;
  return (
    <form onSubmit={handleSubmit}>
      <h2>Please set your training prefrences</h2>
      <div className="form-group row">
        <label className="col-lg-4 col-xs-12 no_padding_left" htmlFor="training_options_amount">
          How many vocabulary do you want to practise?
        </label>
        <input
          type="number"
          className="form-control col-lg-8 col-xs-12"
          id="training_options_amount"
          defaultValue={25}
          name="vocabNumber"
          onChange={handleChange}
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
              value={progress1}
              id="training_options_check_1"
              name="progress1"
              checked={progress1}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="training_options_check_1">
              1
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value={progress2}
              id="training_options_check_2"
              name="progress2"
              checked={progress2}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="training_options_check_2">
              2
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value={progress3}
              id="training_options_check_2"
              name="progress3"
              checked={progress3}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="training_options_check_2">
              3
            </label>
          </div>
        </div>
      </div>

      <div className="form-group row">
        <label className="col-lg-4 col-xs-12 no_padding_left" htmlFor="training_options_direction">
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
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="training_options_radios_1">
              {`Show English, ask ${language}`}
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="training_options_radios"
              id="training_options_radios_2"
              value="fo_en"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="training_options_radios_2">
              {`Show ${language}, ask English`}
            </label>
          </div>
        </div>
      </div>
      {showButton ? (
        <button type="submit" className="btn btn-primary margin_top">
          Start training
        </button>
      ) : null}
    </form>
  );
};

export default VocabularyTraining_Options;
