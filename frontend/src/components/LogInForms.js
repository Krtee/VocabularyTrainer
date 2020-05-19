import React from "react";
import { Link, Redirect } from "react-router-dom";

class LogInForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userName: "", password: "", passwordRepeat: "", success: false };
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

  async handleSubmit(event) {
    event.preventDefault();
    const { receiveInput } = this.props;

    try {
      const res = await receiveInput(this.state);
      if (res.success) {
        this.setState({ success: true });
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    if (this.state.success) {
      return <Redirect to="/Languages" />;
    }
    const { noAccount } = this.props;
    if (noAccount) {
      return (
        <fieldset className="box">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <label className="col-lg-2 col-xs-12 no-padding" htmlFor="login-username">
                User name
              </label>
              <input
                name="userName"
                type="text"
                className="form-control col-lg-10 col-xs-12"
                id="login-username"
                placeholder="Choose a user name"
                defaultValue={this.state.userName}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group row">
              <label className="col-lg-2 col-xs-12 no-padding" htmlFor="login-password">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="form-control col-lg-10 col-xs-12"
                id="login-password"
                placeholder="Choose a password"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group row">
              <label className="col-lg-2 col-xs-12 no-padding" htmlFor="login-password">
                Password
              </label>
              <input
                name="passwordRepeat"
                type="password"
                className="form-control col-lg-10 col-xs-12"
                id="login-password"
                placeholder="Repeat password"
                onChange={this.handleChange}
              />
            </div>
            {/* <Link to="/languages"><button type="submit" className="btn btn-primary">Sign up</button></Link> */}
            <input type="submit" value="Sign Up" className="btn btn-primary" />
          </form>
        </fieldset>
      );
    } else {
      return (
        <fieldset className="box">
          <form>
            <div className="form-group row">
              <label className="col-lg-2 col-xs-12 no-padding" htmlFor="login-username">
                User name
              </label>
              <input
                type="username"
                className="form-control col-lg-10 col-xs-12"
                id="login-username"
                placeholder="Enter user name"
              />
            </div>
            <div className="form-group row">
              <label className="col-lg-2 col-xs-12 no-padding" htmlFor="login-password">
                Password
              </label>
              <input
                type="password"
                className="form-control col-lg-10 col-xs-12"
                id="login-password"
                placeholder="Enter password"
              />
            </div>
            <Link to="/languages">
              <button type="submit" className="btn btn-primary">
                Log in
              </button>
            </Link>
          </form>
        </fieldset>
      );
    }
  }
}

export default LogInForms;
