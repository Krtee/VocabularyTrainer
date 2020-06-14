import React, { useGlobal, useState } from "reactn";
import SignUpButton from "../components/SignUpButton";
import "../style.scss";
import api from "../api";
import PromiseB from "bluebird";
import { Redirect } from "react-router-dom";

function Landing() {
    const [auth, setAuth] = useGlobal("auth");
    const [, setUser] = useGlobal("user");
    const [, setProgressSetting] = useGlobal("progressSetting");
    
    const [userNameHelp, setUserNameHelp] = useState("");
    const [passwordHelp, setPasswordHelp] = useState("");
    const [passwordRepeatHelp, setPasswordRepeatHelp] = useState("");

    async function createUser(input) {
        const userName = input.userName ? input.userName : null;
        const password = input.password ? input.password : null;
        const passwordRepeat = input.passwordRepeat ? input.passwordRepeat : null;
        emptyHelpFields();
        usernameAlreadyTaken(userName).then((taken) => validateCreateUser(userName, taken, password, passwordRepeat));
    }


    async function validateCreateUser(userName, usernameAlreadyTaken, password, passwordRepeat) {
        if (signUpDataComplete(userName, password, passwordRepeat)) {
            if (usernameAlreadyTaken) {
                setUserNameHelp("Username is already taken. Please choose a different one.");
            }
            if (password !== passwordRepeat) {
                setPasswordHelp("Passwords don't match");
                setPasswordRepeatHelp("Passwords don't match");
            } else {
                const isAvailable = await checkIfUserNameAvailable(userName);
                if (isAvailable) {
                    console.info("Saving...", { userName, password, passwordRepeat });

                    const userInfo = {
                        username: userName,
                        password: password,
                    };

                    return new PromiseB(async (resolve, reject) => {
                        const res = await api.user.createUser(userInfo);
                        if (res.status === 200) {
                            setAuth(true);
                            const userId = await getIdForUserName(userName);
                            setUser(userId);
                            return resolve(res.data);
                        }
                        setAuth(false);
                        return reject("Something went wrong");
                    });
                } else {
                    setUserNameHelp("Username already exists!")
                }
            }
        } else {
            if (userName == null) {
                setUserNameHelp("Please enter a user name");
            }
            if (password == null) {
                setPasswordHelp("Please enter a password");
            }
            if (passwordRepeat == null) {
                setPasswordRepeatHelp("Please repeat the password");
            }
        }
    }

    async function usernameAlreadyTaken(userName) {
        var allUsers = await api.user.fetchUsers();
        var { data } = allUsers.data;
        var existingUser = getUser(userName, data);
        return !(existingUser === undefined);
    }

    function signUpDataComplete(userName, password, passwordRepeat) {
        if (userName != null && password != null && passwordRepeat != null) {
            return true;
        } else {
            return false;
        }
    }

    function logInDataComplete(userName, password) {
        if (userName.length > 0 && password.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    function emptyHelpFields() {
        setUserNameHelp("");
        setPasswordHelp("");
        setPasswordRepeatHelp("");
    }

    async function checkIfUserNameAvailable(userName) {
        const allUsers = await api.user.fetchUsers().then((res) => {
            return res.data.data;
        });
        for (let i = 0; i < allUsers.length; i++) {
            const element = allUsers[i];
            if (element.username === userName) {
                console.log("username already exists");
                return false;
            }
        }
        return true;
    }

    async function login(input) {
        try {
            new PromiseB(async (resolve, reject) => {
                const res = await api.user.fetchUsers();
                if (res.status === 200) {
                    const { data } = res.data;
                    const userInfo = getUser(input.userName, data);

                    var passwordCorrect = false;
                    emptyHelpFields();

                    if (logInDataComplete(input.userName, input.password)) {
                        if (userInfo != null) {
                            passwordCorrect = authenticateUser(userInfo, input.password);
                        }
                        if (!passwordCorrect) {
                            setPasswordHelp("Wrong user name or password");
                        } else {
                            setUser(userInfo._id);
                            setProgressSetting(userInfo.right_guesses_in_a_row)
                        }
                    } else {
                        if (input.userName.length === 0) {
                            setUserNameHelp("Please enter your user name");
                        }
                        if (input.password.length === 0) {
                            setPasswordHelp("Please enter your password");
                        }
                    }

                    setAuth(passwordCorrect);
                    return resolve(res.data);
                }
                setAuth(false);
                return reject("Something went wrong");
            });
        } catch (error) {
            console.error(error);
        }
    }

    function getUser(userName, data) {
        try {
            const userData = new Map();
            data.forEach((user) => {
                userData.set(user.username, user);
            });
            return userData.get(userName);
        } catch (error) {
            console.error(error);
        }
    }

    async function getIdForUserName(userName) {
        const data = {
            userName: userName
        };
        const res = await api.user.getIdForUserName(data);
        const userId = res.userId;
        return userId;
    }

    function authenticateUser(userInfo, password) {
        try {
            return userInfo.password === password;
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            {auth ? <Redirect to="/languages" /> : null}
            <h1 className="margin_top_small">Vocabulary Trainer</h1>
            <h2>Log in or sign up!</h2>
            <SignUpButton
                createUser={createUser}
                login={login}
                emptyHelpFields={emptyHelpFields}
                userNameHelp={userNameHelp}
                passwordHelp={passwordHelp}
                passwordRepeatHelp={passwordRepeatHelp}
            />
        </div>
    );
}

export default Landing;
