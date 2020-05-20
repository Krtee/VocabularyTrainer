import React from "react";
import { useGlobal } from "reactn";
import SignUpButton from "../components/SignUpButton";
import "../style.css";
import api from "../api";
import PromiseB, { is } from "bluebird";

function Landing() {
  const [auth, setAuth] = useGlobal("auth");

  async function createUser(input) {
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

      const userInfo = {
        username: userName,
        password: password,
      };

      return new PromiseB(async (resolve, reject) => {
        const res = await api.user.createUser(userInfo);
        if (res.status === 200) {
          setAuth(true);
          return resolve(res.data);
        }
        setAuth(false);
        return reject("Something went wrong");
      });
    }
  }

  async function login(input) {
    console.log(input);
    new PromiseB(async (resolve, reject) => {
      const res = await api.user.fetchUsers();
      if (res.status === 200) {
        const { data } = res.data;
        const userInfo = getUser(input.userName, data);
        const isUser = authenticateUser(userInfo, input.password);
        setAuth(isUser);
        return resolve(res.data);
      }
      setAuth(false);
      return reject("Something went wrong");
    });
  }

  function getUser(userName, data) {
    const userData = new Map();
    data.forEach((user) => {
      userData.set(user.username, user);
    });
    return userData.get(userName);
  }

  function authenticateUser(userInfo, password) {
    return userInfo.password === password;
  }

  return (
    <div>
      <h1>Vocabulary Trainer</h1>
      <h2>Log in or sign up!</h2>
      <SignUpButton createUser={createUser} login={login} />
    </div>
  );
}

export default Landing;
