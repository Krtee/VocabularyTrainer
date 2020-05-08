import React from "react";
import { Link } from "react-router-dom";

class Forms extends React.Component {


    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        if (this.props.value) {
            return (
                <fieldset className="box">
                    <form>
                        <div className="form-group row">
                            <label className="col-lg-2 col-xs-12 no-padding" htmlFor="login-username">User name</label>
                            <input type="username" className="form-control col-lg-10 col-xs-12" id="login-username" placeholder="Choose a user name" />
                        </div>
                        <div className="form-group row">
                            <label className="col-lg-2 col-xs-12 no-padding" htmlFor="login-password">Password</label>
                            <input type="password" className="form-control col-lg-10 col-xs-12" id="login-password" placeholder="Choose a password" />
                        </div>
                        <div className="form-group row">
                            <label className="col-lg-2 col-xs-12 no-padding" htmlFor="login-password">Password</label>
                            <input type="password" className="form-control col-lg-10 col-xs-12" id="login-password" placeholder="Repeat password" />
                        </div>
                        <Link to="/languages"><button type="submit" className="btn btn-primary">Sign up</button></Link>
                    </form>
                </fieldset>)
        } else {
            return (<fieldset className="box">
                <form>
                    <div className="form-group row">
                        <label className="col-lg-2 col-xs-12 no-padding" htmlFor="login-username">User name</label>
                        <input type="username" className="form-control col-lg-10 col-xs-12" id="login-username" placeholder="Enter user name" />
                    </div>
                    <div className="form-group row">
                        <label className="col-lg-2 col-xs-12 no-padding" htmlFor="login-password">Password</label>
                        <input type="password" className="form-control col-lg-10 col-xs-12" id="login-password" placeholder="Enter password" />
                    </div>
                    <Link to="/languages"><button type="submit" className="btn btn-primary">Log in</button></Link>

                </form>
            </fieldset>)
        }

    }


}

export default Forms;



