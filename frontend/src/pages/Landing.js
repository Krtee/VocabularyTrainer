import PromiseB from "bluebird";
import React, { useGlobal, useState, useEffect } from "reactn";
import { Redirect } from "react-router-dom";

import "../style.scss";
import LogInFormsHandler from "../components/LogInFormsHandler";
import api from "../api";
import serverIsRunning from "../helper"
import {version} from "../lib/version.json"

function Landing() {
    const [, setProgressSetting] = useGlobal("progressSetting");
    const [user, setUser] = useGlobal("user");
    const [auth, setAuth] = useGlobal("auth");
    const [serverError, setserverError] = useGlobal("serverError")

    const [passwordHelp, setPasswordHelp] = useState("");
    const [passwordRepeatHelp, setPasswordRepeatHelp] = useState("");
    const [userNameHelp, setUserNameHelp] = useState("");

    useEffect(() => {
        serverIsRunning().then((isRunning) => {
          if (isRunning) {
            setserverError(false);
          } else {
            setserverError(true);
          }
        });
        // eslint-disable-next-line
      }, []);   

    async function createUser(input) {
        const userName = input.userName ? input.userName : null;
        const password = input.password ? input.password : null;
        const passwordRepeat = input.passwordRepeat ? input.passwordRepeat : null;
        emptyHelpFields();
        usernameAlreadyTaken(userName).then((taken) => validateCreateUser(userName, taken, password, passwordRepeat));
    }

    async function validateCreateUser(userName, usernameAlreadyTaken, password, passwordRepeat) {
        try {
            if (signUpDataComplete(userName, password, passwordRepeat)) {
                if (usernameAlreadyTaken === true) {
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
                            if (res) {
                                if (res.status === 200) {
                                    setAuth(true);
                                    const userId = await getIdForUserName(userName);
                                    setLocalStorage(true, userId)
                                    setUser(userId);
                                    return resolve(res.data);
                                }
                            }
                            localStorage.setItem("isAuthorized", false)
                            localStorage.setItem("userId", "")                    
                            setAuth(false);
                            return reject("Something went wrong while trying to authenticate!");
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
    
        } catch (error) {
            setserverError(true)
        }

    }

    async function usernameAlreadyTaken(userName) {
        try {
            var allUsers = await api.user.fetchUsers();
            var { data } = allUsers.data;
            var existingUser = getUser(userName, data);
            return !(existingUser === undefined);
        } catch (error) {
            console.error(error)
            return error
        }
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
                console.log("Username already exists");
                return false;
            }
        }
        return true;
    }


    async function login(input) {
        try {
            new PromiseB(async (resolve, reject) => {
                const res = await api.user.fetchUsers();
                if(res){
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
                        if (passwordCorrect) {
                            setLocalStorage(true, userInfo._id );
                        }
                        setAuth(passwordCorrect);
                        return resolve(res.data);
                    }

                }
                setserverError(true)
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

    function setLocalStorage(isAuthorized, userId) {
        if (isAuthorized) {
            localStorage.setItem("isAuthorized", true)
            localStorage.setItem("userId", userId)
        }
    }

    return (
      <div >
        {auth ? <Redirect to="/languages" /> : null}
        <h1 className="margin_top_small">Vocabulary Trainer</h1>
        <h2>Log in or sign up!</h2>
        {serverError ? (
          <Redirect to="/Error" />
        ) : (
          <LogInFormsHandler
            createUser={createUser}
            login={login}
            emptyHelpFields={emptyHelpFields}
            userNameHelp={userNameHelp}
            passwordHelp={passwordHelp}
            passwordRepeatHelp={passwordRepeatHelp}
          />
        )}
        <div className="fixed-bottom m-5 flex-end text-right">
          <span className="text-secondary ">Version: {version}</span>
        </div>
      </div>
    );
}

export default Landing;
