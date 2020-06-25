import React, { useState } from "reactn";

const LogInForms = (props) => {
  const { noAccount, createUser, login, userNameHelp, passwordHelp, passwordRepeatHelp } = props;

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

  const loginInfo = {
    userName,
    password,
    passwordRepeat,
    userNameHelp,
    passwordHelp,
    passwordRepeatHelp,
  };

  const handleChange = (event) => {
    const value = event.target.value;

    switch (event.target.name) {
      case "userName":
        setUserName(value);
        break;
      case "password":
        setPassword(value);
         if (value !== "") {
          setShowPasswordRepeat(true);
        } else {
          setShowPasswordRepeat(false);
        } 
        break;
      case "passwordRepeat":
        setPasswordRepeat(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    switch (event.target.name) {
      case "noAccount":
        createUser(loginInfo);
        break;

      default:
        login(loginInfo);
        break;
    }
  };

  if (noAccount) {
    return (
      <fieldset className="box">
        <form onSubmit={handleSubmit} name="noAccount" id="signUpForm">
          <div className="form-group row">
            <label className="col-lg-2 col-xs-12 no-padding" htmlFor="login-username">
              User name
            </label>
            <div className="col-lg-10 col-xs-12 no-padding">
              <input
                name="userName"
                type="text"
                className="form-control"
                id="login-username"
                placeholder="Choose a user name"
                defaultValue={userName}
                onChange={handleChange}
              />
              <small className="form-text text-muted">{userNameHelp}</small>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-xs-12 no-padding" htmlFor="login-password">
              Password
            </label>
            <div className="col-lg-10 col-xs-12 no-padding">
              <input
                name="password"
                type="password"
                className="form-control"
                id="login-password"
                placeholder="Choose a password"
                onChange={handleChange}
              />
              <small className="form-text text-muted">{passwordHelp}</small>
            </div>
          </div>

          {showPasswordRepeat ?
            <div className="form-group row">
              <label className="col-lg-2 col-xs-12 no-padding" htmlFor="login-password">
                Repeat password
          </label>
              <div className="col-lg-10 col-xs-12 no-padding">
                <input
                  name="passwordRepeat"
                  type="password"
                  className="form-control"
                  id="login-password"
                  placeholder="Repeat password"
                  onChange={handleChange}
                />
                <small className="form-text text-muted">{passwordRepeatHelp}</small>
              </div>
            </div>
          : ""}

          <input type="submit" value="Sign Up" className="blue-button" />
        </form>
      </fieldset>
    );
  } else {
    return (
      <fieldset className="box">
        <form onSubmit={handleSubmit} name="hasAccount" id="logInForm">
          <div className="form-group row">
            <label className="col-lg-2 col-xs-12 no-padding" htmlFor="login-username">
              User name
            </label>
            <div className="col-lg-10 col-xs-12 no-padding">
              <input
                type="username"
                className="form-control"
                id="login-username"
                placeholder="Enter user name"
                name="userName"
                onChange={handleChange}
              />
              <small className="form-text text-muted">{userNameHelp}</small>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-xs-12 no-padding" htmlFor="login-password">
              Password
            </label>
            <div className="col-lg-10 col-xs-12 no-padding">
              <input
                type="password"
                className="form-control"
                id="login-password"
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
              />
              <small className="form-text text-muted">{passwordHelp}</small>
            </div>
          </div>
          <button type="submit" className="blue-button">
            Log in
          </button>
        </form>
      </fieldset>
    );
  }
};

export default LogInForms;
