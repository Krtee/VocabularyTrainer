import React from "react";
import LogInForms from "./LogInForms";

class SignUpButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { noAccount: false, buttonText: "No account?" };
    }

    handleClick = () => {
        const { emptyHelpFields } = this.props;
        emptyHelpFields();
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
            emptyHelpFields();
        }

    };

    render() {
        const { createUser, login } = this.props;
        const { userNameHelp } = this.props;
        const { passwordHelp } = this.props;
        const { passwordRepeatHelp } = this.props;

        return (
            <div>
                <LogInForms noAccount={this.state.noAccount} createUser={createUser} login={login} userNameHelp={userNameHelp} passwordHelp={passwordHelp} passwordRepeatHelp={passwordRepeatHelp}/>
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


