import React from "react";
import { useGlobal } from "reactn";
import SignUpButton from "../components/SignUpButton";
import "../style.css";
import api from "../api";
import PromiseB from "bluebird";

function Landing() {
  const [ auth, setAuth ] = useGlobal('auth');

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

      // FIXME: id is generated automatically from mongoDB, we don't need another one I guess.
      const userInfo = {
        id: 123,
        username: userName,
        password: password,
      };

      return new PromiseB(async (resolve, reject) => {
        const res = await api.user.createUser(userInfo);
        if (res.status === 200) {
          setAuth(true)
          return resolve(res.data);
        }
        setAuth(false)
        return reject("Something went wrong");
      });
    }
  }

  return (
    <div >
      <h1>Vocabulary Trainer</h1>
      <h2>Log in or sign up!</h2>
      <SignUpButton receiveInput={createUser} />
    </div>
  );
}

export default Landing;
