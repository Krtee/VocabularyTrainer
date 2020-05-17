import React from "react";
import LogInForms from "./LogInForms";

class SignUpButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: false };
  }

  handleClick = () => {
    this.setState({
      value: !this.state.value,
    });
  };

  render() {
    return (
      <div>
        <LogInForms value={this.state.value} />
        <button
          type="button"
          className="btn btn-primary marginleft margin_top"
          onClick={this.handleClick}
        >
          No account?
        </button>
      </div>
    );
  }
}

export default SignUpButton;
