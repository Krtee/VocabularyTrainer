import "../style.css";
import React, { useGlobal } from "reactn";
import Navigation from "../components/Navigation";
import { Redirect } from "react-router";


function Settings() {
    const [auth, setAuth] = useGlobal("auth");
    
    if (!auth) {
        return <Redirect to="/" />;
    }  

    return (
        <div id="content" className="settings">
            <Navigation />
            <form>
                <h1>Settings</h1>
                <div className="form-group row">
                    <label className="col-lg-10 col-xs-12 no_padding_left" htmlFor="settings">How many correct answers in a row lead to a new progress level?</label>
                    <input type="number" className="form-control col-lg-2 col-xs-12" id="settings" placeholder="" />
                </div>
                <div className="form-group row">
                    <label className="col-lg-10 col-xs-12 no_padding_left" htmlFor="settings">Change Username</label>
                    <input type="text" className="form-control col-lg-2 col-xs-12" id="settings" placeholder="" />
                </div>
                <button type="submit" className="btn btn-primary">Save settings</button>
            </form>
        </div>
    );
}

export default Settings;
