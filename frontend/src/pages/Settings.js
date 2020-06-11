import "../style.css";
import React, {useGlobal} from "reactn";
import NavigationTop from "../components/NavigationTop";
import {Redirect} from "react-router";
import NavigationBottom from "../components/NavigationBottom";
import api from "../api";
import {createRef, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


function Settings() {
    const [auth, ] = useGlobal("auth");
    const [user, ] = useGlobal("user");
    let newName = createRef();
    let newProgress = createRef();
    const [show, setShow] = useState(false);
    const [changed, setChanged] = useState(false);

    if (!auth) {
        return <Redirect to="/"/>;
    }

    const handleClose = (event) => {
        event.preventDefault();
        setShow(false);
    }
    const handleShow = (event) => {
        event.preventDefault();
        setShow(true);
    }


    const changeInformation = async (event) => {
        event.preventDefault();
        let toSend = {
            right_guesses_in_a_row: newProgress.current.value,
            username: newName.current.value
        }
        const res = await api.user.editUser(user, toSend);
        if (res.data.success) {
            setChanged(true);
        }
    }


    return (
        <div id="content" className="settings">
            <NavigationTop/>
            <NavigationBottom/>
            <form>
                <h1>Settings</h1>
                <div className="form-group row">
                    <label className="col-lg-10 col-xs-12 no_padding_left" htmlFor="settings">How many correct answers
                        in a row lead to a new progress level?</label>
                    <input type="number" className="form-control col-lg-2 col-xs-12" id="settings" placeholder=""
                           ref={newProgress}/>
                </div>
                <div className="form-group row">
                    <label className="col-lg-10 col-xs-12 no_padding_left" htmlFor="settings">Change Username</label>
                    <input type="text" className="form-control col-lg-2 col-xs-12" id="settings" placeholder=""
                           ref={newName}/>
                </div>
                <button className="btn btn-primary" onClick={handleShow}>Save settings</button>
            </form>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>{changed ? 'changed.' : 'Are you sure,that you want to make these changes ?'}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {!changed && <Button variant="primary" onClick={changeInformation}>
                        Save Changes
                    </Button>}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Settings;
