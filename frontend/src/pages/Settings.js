import "../style.css";
import React, { useEffect } from "react";
import Navigation from "../components/Navigation";


function Settings() {
    useEffect(() => {
        callBackendAPI()
            .then((res) => console.log({ data: res.express }))
            .catch((err) => console.log(err));
    });

    async function callBackendAPI() {
        const response = await fetch("/express_backend");
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    }

    return (
        <div id="content" class="settings">
            <Navigation />
            <form>
                <h1>Settings</h1>
                <div className="form-group row">
                    <label className="col-lg-10 col-xs-12 no_padding_left" htmlFor="settings">How many correct answers in a row lead to a new progress level?</label>
                    <input type="number" className="form-control col-lg-2 col-xs-12" id="settings" placeholder="" />
                </div>
                <button type="submit" className="btn btn-primary">Save settings</button>
            </form>
        </div>
    );
}

export default Settings;
