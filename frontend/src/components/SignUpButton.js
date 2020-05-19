import React from "react";
import LogInForms from "./LogInForms";

class SignUpButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { noAccount: false };
  }

  handleClick = () => {
    this.setState({
      noAccount: !this.state.noAccount,
    });
  };

  render() {
    const { receiveInput } = this.props;
    return (
      <div>
        <LogInForms noAccount={this.state.noAccount} receiveInput={receiveInput}/>
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
