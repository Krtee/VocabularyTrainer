import React from "react";
import Forms from "./Forms";


class SignUpButton extends React.Component {

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
                <button type="button" className="btn btn-primary marginleft" onClick={this.handleClick}>No account?</button>
            </div>
        )
    }


}

export default SignUpButton;



