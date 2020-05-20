import React from "react";
import LogInForms from "./LogInForms";

class SignUpButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { noAccount: false, buttonText: "No account?" };
    }

    handleClick = () => {
        if (this.state.noAccount === false) {
            this.setState({
                noAccount: true,
                buttonText: "Already got an account?"
            });
        } else {
            this.setState({
                noAccount: false,
                buttonText: "No account?"
            });
        }

    };

    render() {
        const { createUser, login } = this.props;
        return (
            <div>
                <LogInForms noAccount={this.state.noAccount} createUser={createUser}  login={login}/>
                <button
                    type="button"
                    className="btn btn-primary marginleft margin_top grey_button"
                    onClick={this.handleClick}
                >
                    {this.state.buttonText}
                </button>
            </div>
        );
    }
}

export default SignUpButton;


