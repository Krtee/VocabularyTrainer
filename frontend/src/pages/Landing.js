import React from "react";
import SignUpButton from "../components/SignUpButton";
import "../style.css";
import api from "../api";
import PromiseB from "bluebird"

const createUser = async (input) => {
    const userName = input.userName ? input.userName : null;
    const password = input.password ? input.password : null;
    const passwordRepeat = input.passwordRepeat ? input.passwordRepeat : null;

    if (!userName || !password || !passwordRepeat) {
        alert("Bitte alle Felder ausfüllen!");
    } else if (password !== passwordRepeat) {
        alert("Passwörter stimmen nicht überein!");
    } else {
        //TODO: Check if user already exists (here or in server.js)
        console.info("Saving...", { userName, password, passwordRepeat });

        // FIXME: id is generated automatically from mongoDB, we don't need another one I guess.
        const userInfo = {
            id: 123,
            username: userName,
            password: password,
        };

        return new PromiseB(async (resolve, reject) => {
            const res = await api.user.createUser(userInfo)
            if (res.status === 200) {
                return resolve(res.data)
            }
            return reject("Something went wrong");
        })

        api.user
            .createUser(userInfo)
            .then((res) => {
                console.log("res: ", res)
                if (res.status === 200) {
                    return true
                }
            })
            .catch((error) => console.error(error));

    }
};

const Landing = () => (
    <div>
        <h1>Vocabulary Trainer</h1>
        <h2>Log in or sign up!</h2>
        <SignUpButton receiveInput={createUser} />
    </div>
);

export default Landing;
