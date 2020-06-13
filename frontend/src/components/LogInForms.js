import React from "react";

class LogInForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userName: "", password: "", passwordRepeat: "", userNameHelp: "", passwordHelp: "", passwordRepeatHelp: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { createUser, login } = this.props;

    switch (event.target.name) {
      case "noAccount":
        createUser(this.state);

        break;

      default:
        login(this.state);

        break;
    }
  }

  render() {
    const { noAccount } = this.props;
    const { userNameHelp } = this.props;
    const { passwordHelp } = this.props;
    const { passwordRepeatHelp } = this.props;

    if (noAccount) {
      return (
        <fieldset className="box">
          <form onSubmit={this.handleSubmit} name="noAccount" id="signUpForm">
            <div className="form-group row">
              <label className="col-lg-2 col-xs-12 no-padding" htmlFor="login-username">
                User name
              </label>
              <div className="col-lg-10 col-xs-12">
                <input
                  name="userName"
                  type="text"
                  className="form-control"
                  id="login-username"
                  placeholder="Choose a user name"
                  defaultValue={this.state.userName}
                  onChange={this.handleChange}
                />
                <small className="form-text text-muted">{userNameHelp}</small>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-2 col-xs-12 no-padding" htmlFor="login-password">
                Password
              </label>
              <div className="col-lg-10 col-xs-12">
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  id="login-password"
                  placeholder="Choose a password"
                  onChange={this.handleChange}
                />
                <small className="form-text text-muted">{passwordHelp}</small>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-2 col-xs-12 no-padding" htmlFor="login-password">
                Repeat password
              </label>
              <div className="col-lg-10 col-xs-12">
                <input
                  name="passwordRepeat"
                  type="password"
                  className="form-control"
                  id="login-password"
                  placeholder="Repeat password"
                  onChange={this.handleChange}
                />
                <small className="form-text text-muted">{passwordRepeatHelp}</small>
              </div>
            </div>
            <input type="submit" value="Sign Up" className="btn btn-primary" />
          </form>
        </fieldset>
      );
    } else {
      return (
        <fieldset className="box">
          <form onSubmit={this.handleSubmit} name="hasAccount" id="logInForm">
            <div className="form-group row">
              <label className="col-lg-2 col-xs-12 no-padding" htmlFor="login-username">
                User name
              </label>
              <div className="col-lg-10 col-xs-12">
                <input
                  type="username"
                  className="form-control"
                  id="login-username"
                  placeholder="Enter user name"
                  name="userName"
                  onChange={this.handleChange}
                />
                <small className="form-text text-muted">{userNameHelp}</small>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-2 col-xs-12 no-padding" htmlFor="login-password">
                Password
              </label>
              <div className="col-lg-10 col-xs-12">
                <input
                  type="password"
                  className="form-control"
                  id="login-password"
                  placeholder="Enter password"
                  name="password"
                  onChange={this.handleChange}
                />
                <small className="form-text text-muted">{passwordHelp}</small>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Log in
            </button>
          </form>
        </fieldset>
      );
    }
  }
}

export default LogInForms;
