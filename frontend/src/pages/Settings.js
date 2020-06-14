import "../style.scss";
import React, {useGlobal} from "reactn";
import NavigationTop from "../components/NavigationTop";
import {Redirect} from "react-router";
import NavigationBottom from "../components/NavigationBottom";
import api from "../api";
import {createRef, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useWindowDimensions from "../components/Windowsize";


function Settings() {
    const [auth, setAuth] = useGlobal("auth");
    const [user, ] = useGlobal("user");
    let newName = createRef();
    let newProgress = createRef();
    let newpassword = createRef();
    let newpassword2 = createRef();
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [changed, setChanged] = useState(false);
    const [passw, setpassw] = useState(false);
    let {width} = useWindowDimensions();



    if (!auth) {
        return <Redirect to="/"/>;
    }

    const handleClose = (event,id) => {
        if(event){event.preventDefault();}
        if(id === "1"){
            setShow(false);
        }
        else if (id === "2") {
            setShow2(false);
        }
    }


    const handleShow = (event,id) => {
        if(event){event.preventDefault();}
        console.log(id)
        if (id === "changeButton"){
            setShow(true);

        }
        else if(id === "deleteButton"){
            setShow2(true);
        }
        setChanged(false);

    }

    const handleOnChange = (event) => {
        if(event){event.preventDefault();}
        if (newpassword.current.value !== ""){
            setpassw(true)
        } else {
            setpassw(false)
        }
    }

    const cleanResponse =(obj) => {
        for (let propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
                delete obj[propName];
            }
        }
    }


    const changeInformation = async (event) => {
        if(event){event.preventDefault();}
        let toSend ;
        if (newpassword.current.value !== ""){
            if(newpassword2.current.value === newpassword.current.value){
                toSend = {
                    username: newName.current.value,
                    password: newpassword.current.value,
                    right_guesses_in_a_row: newProgress.current.value
                }
                console.log(toSend)
            }
        }
        else {
            toSend = {
                username: newName.current.value,
                right_guesses_in_a_row: newProgress.current.value

            }

        }
        cleanResponse(toSend)

        const res = await api.user.editUser(user, toSend);
        if (res.data.success) {
            setChanged(true);
        }
    }

    const deleteAccount = async (event)=>{
        const res = await api.user.deleteUser(user);
        if (res.data.success) {
            setChanged(true);
            await setAuth(false);
        }
    }

    return (
        <div id="content" className="settings margin_top">
            <NavigationTop width={width}/>
            {width < 700 && <NavigationBottom/>}
            <form>
                <h1>Settings</h1>
                <p className={"lead"}>choose the property that you want to change</p>
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
                <div className="form-group row">
                    <label className="col-lg-10 col-xs-12 no_padding_left" htmlFor="settings">Change password</label>
                    <input type="password" className="form-control col-lg-2 col-xs-12" id="settings" placeholder="" onChange={handleOnChange}
                           ref={newpassword}/>
                </div>
                {passw && <div className="form-group row">
                    <label className="col-lg-10 col-xs-12 no_padding_left" htmlFor="settings">re-enter password</label>
                    <input type="password" className="form-control col-lg-2 col-xs-12" id="settings" placeholder=""
                           ref={newpassword2}/>
                </div>}
                <button className="btn btn-primary" onClick={(e) => handleShow(e,"changeButton")}>Save settings</button>
            </form>

            <Button variant={"danger"} style={{marginTop: "1em"}} onClick={(e) => handleShow(e,"deleteButton")}>Delete Account</Button>


            <Modal show={show} onHide={(e)=>handleClose(e,"1")}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>{changed ? 'changed.' : 'Are you sure,that you want to make these changes ?'}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={(e)=>handleClose(e,"1")}>
                        Close
                    </Button>
                    {!changed && <Button variant="primary" onClick={changeInformation}>
                        Save Changes
                    </Button>}
                </Modal.Footer>
            </Modal>

            <Modal show={show2} onHide={(e)=>handleClose(e,"2")}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>{changed ? 'Account Deleted.' : 'Are you sure,that you want to delete this account ?'}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={(e)=>handleClose(e,"2")}>
                        Close
                    </Button>
                    {!changed && <Button variant="danger" onClick={deleteAccount}>
                        Delete Account
                    </Button>}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Settings;
