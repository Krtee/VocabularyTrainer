import "../style.scss";
import NavigationTop from "../components/NavigationTop";
import { Redirect } from "react-router";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useGlobal, useEffect } from "reactn";
import { createRef, useState } from "react";
import "../style.scss";
import NavigationBottom from "../components/NavigationBottom";
import ReducedNavigation from "../components/ReducedNavigation";
import api from "../api";
import serverIsRunning from "../helper";
import useWindowDimensions from "../components/Windowsize";

function Settings() {
  const [, setAuth] = useGlobal("auth");
  const [user] = useGlobal("user");
  const [langID] = useGlobal("langID");
  const [, setProgessSetting] = useGlobal("progressSetting");

  let newName = createRef();
  let newProgress = createRef();
  let newpassword = createRef();
  let newpassword2 = createRef();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [changed, setChanged] = useState(false);
  const [passw, setpassw] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  let { width } = useWindowDimensions();
  const [serverError, setserverError] = useGlobal("serverError");

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

  const handleClose = (event, id) => {
    if (event) {
      event.preventDefault();
    }
    if (id === "1") {
      setShow(false);
    } else if (id === "2") {
      setShow2(false);
    }
  };

  const handleShow = (event, id) => {
    setUserInfo("");
    if (event) {
      event.preventDefault();
    }

    if (passwordsOkay()) {
      if (id === "changeButton") {
        setShow(true);
      } else if (id === "deleteButton") {
        setShow2(true);
      }
      setChanged(false);
    }
  };

  const passwordsOkay = () => {
    // Does user want to change password?
    if (newpassword.current.value !== "") {
      // When second password is not entered
      if (newpassword2.current.value === "") {
        setUserInfo("The password has to be entered twice.");
      } /* When both passwords are entered */ else {
        // If passwords match
        if (newpassword2.current.value === newpassword.current.value) {
          return true;
        } /* If passwords don't match */ else {
          setUserInfo("Passwords don't match!");
          return false;
        }
      }
    } else {
      return true;
    }
  };

  const handleOnChange = (event) => {
    if (event) {
      event.preventDefault();
    }
    if (newpassword.current.value !== "") {
      setpassw(true);
    } else {
      setpassw(false);
    }
  };

  const cleanResponse = (obj) => {
    for (let propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
        delete obj[propName];
      }
    }
  };

  const changeInformation = async (event) => {
    if (event) {
      event.preventDefault();
    }
    let toSend;
    if (newpassword.current.value !== "") {
      if (newpassword2.current.value === newpassword.current.value) {
        toSend = {
          username: newName.current.value,
          password: newpassword.current.value,
          right_guesses_in_a_row: newProgress.current.value,
        };
      }
    } else {
      toSend = {
        username: newName.current.value,
        right_guesses_in_a_row: newProgress.current.value,
      };
    }
    cleanResponse(toSend);

    const res = await api.user.editUser(user, toSend);
    if (res.data.success) {
      setChanged(true);
      if (toSend.hasOwnProperty("right_guesses_in_a_row")) {
        setProgessSetting(toSend.right_guesses_in_a_row);
      }
    }
  };

  const deleteAccount = async (event) => {
    const res = await api.user.deleteUser(user);
    if (res.data.success) {
      setChanged(true);
      localStorage.setItem("isAuthorized", false);
      localStorage.setItem("userId", "");
      await setAuth(false);
    }
  };

  return (
    <>
      {serverError ? (
        <Redirect to="/Error" />
      ) : localStorage.getItem("isAuthorized") === "false" ||
        localStorage.getItem("isAuthorized") === false ? (
        <Redirect to="/" />
      ) : (
        <div id="content" className="settings margin_top">
          {langID.length > 0 ? <NavigationTop width={width} /> : <ReducedNavigation />}

          {width < 700 && langID.length > 0 && <NavigationBottom />}
          <form>
            <h1 className="margin_top_small">Settings</h1>
            <h2 className={"lead"}>Choose the property that you want to change</h2>
            <div className="form-group row">
              <label className="col-lg-4 col-xs-12 no-padding-left" htmlFor="settings">
                How many correct answers in a row lead to a new progress level?
              </label>
              <input
                type="number"
                className="form-control col-lg-8 col-xs-12"
                placeholder=""
                ref={newProgress}
              />
            </div>
            <div className="form-group row">
              <label className="col-lg-4 col-xs-12 no-padding-left" htmlFor="settings_username">
                Change username
              </label>
              <input
                type="text"
                className="form-control col-lg-8 col-xs-12"
                placeholder=""
                id="settings_username"
                ref={newName}
              />
            </div>
            <div className="form-group row">
              <label className="col-lg-4 col-xs-12 no-padding-left" htmlFor="settings_password">
                Change password
              </label>
              <input
                type="password"
                className="form-control col-lg-8 col-xs-12"
                placeholder=""
                onChange={handleOnChange}
                id="settings_password"
                ref={newpassword}
              />
            </div>
            {passw && (
              <div className="form-group row">
                <label
                  className="col-lg-4 col-xs-12 no-padding-left"
                  htmlFor="settings_password_repeat"
                >
                  Re-enter password
                </label>
                <input
                  type="password"
                  className="form-control col-lg-8 col-xs-12"
                  id="settings_password_repeat"
                  placeholder=""
                  ref={newpassword2}
                />
              </div>
            )}
            <div className="warning">{userInfo}</div>
            <button className="btn btn-primary" onClick={(e) => handleShow(e, "changeButton")}>
              Save settings
            </button>
          </form>

          <Button
            variant={"danger"}
            style={{ marginTop: "1em" }}
            onClick={(e) => handleShow(e, "deleteButton")}
          >
            Delete Account
          </Button>

          <Modal show={show} onHide={(e) => handleClose(e, "1")}>
            <Modal.Header closeButton>
              <Modal.Title>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {changed ? "Changed." : "Are you sure that you want to save these changes?"}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={(e) => handleClose(e, "1")}>
                Close
              </Button>
              {!changed && (
                <Button variant="primary" onClick={changeInformation}>
                  Save Changes
                </Button>
              )}
            </Modal.Footer>
          </Modal>

          <Modal show={show2} onHide={(e) => handleClose(e, "2")}>
            <Modal.Header closeButton>
              <Modal.Title>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {changed ? "Account Deleted." : "Are you sure that you want to delete this account?"}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={(e) => handleClose(e, "2")}>
                Close
              </Button>
              {!changed && (
                <Button variant="danger" onClick={deleteAccount}>
                  Delete Account
                </Button>
              )}
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
}

export default Settings;
