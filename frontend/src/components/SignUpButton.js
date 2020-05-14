import React from "react";
import Forms from "./Forms";

class SignUpButton extends React.Component {
<<<<<<< HEAD

    constructor(props) {
        super(props);
        this.state = { value: false }
    }

    handleClick = () => {
        this.setState({
            value: !this.state.value
        })
    }

    render() {
        return (
            <div>
                <Forms value={this.state.value} />
                <button type="button" className="btn btn-primary marginleft margin_top" onClick={this.handleClick}>No account?</button>
            </div>
        )
    }


=======
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
        <Forms value={this.state.value} />
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
>>>>>>> 6cd0c218ada6e30bbbd06d6d37c4207bf36ab926
}

export default SignUpButton;
