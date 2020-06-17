import React, { useState } from "reactn";
import LogInForms from "./LogInForms";


const LogInFormsHandler = (props) => {
    const { createUser, login, userNameHelp, passwordHelp, passwordRepeatHelp, emptyHelpFields } = props;

    const [noAccount, setNoAccount] = useState(false);
    const [buttonText, setButtonText] = useState("No account?");


    const handleClick = () => {
        //const { emptyHelpFields } = this.props;
        emptyHelpFields();
        if (noAccount === false) {
            setNoAccount(true);
            setButtonText("Already got an account?");
        } else {
            setNoAccount(false);
            setButtonText("No account?");
            emptyHelpFields();
        }

    };

    return (
        <div>
            <LogInForms noAccount={noAccount} createUser={createUser} login={login} userNameHelp={userNameHelp} passwordHelp={passwordHelp} passwordRepeatHelp={passwordRepeatHelp}/>
            <button
                type="button"
                className="btn btn-primary marginleft margin_top grey_button"
                onClick={handleClick}
            >
                {buttonText}
            </button>
        </div>
    );

};

export default LogInFormsHandler;

