import React from "react";

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    openSignup = () => {
        alert('changing component')
    }

    render() {

        return (
            <form>
                <h1>Settings</h1>
                <div className="form-group row">
                    <label className="col-lg-10 col-xs-12 no_padding_left" htmlFor="settings">How many correct answers in a row lead to a new progress level?</label>
                    <input type="number" className="form-control col-lg-2 col-xs-12" id="settings" placeholder="" />
                </div>
                <button type="submit" className="btn btn-primary">Save settings</button>
            </form>

        )
    }

}




export default Settings;


