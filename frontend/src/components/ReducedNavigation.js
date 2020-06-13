import React, {useGlobal} from "reactn";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import NavItem from "react-bootstrap/NavItem";

const ReducedNavigation = () => {
    const [, setAuth] = useGlobal("auth");

    function handleClick() {
        setAuth(false);
    }

    return (
        <Navbar id="navbar">
            <Nav className="ml-auto">
                <NavDropdown title="Account" id="basic-nav-dropdown" >
                    <NavDropdown.Item>
                        <LinkContainer to="/Settings" className="menu_option settings">
                            <NavItem className="menu_padding">
                                Settings
                            </NavItem>
                        </LinkContainer>
                    </NavDropdown.Item>
                    <NavDropdown.Item className="menu_option">
                        <button type="submit" className="btn btn-primary" onClick={handleClick}>
                            Logout
                        </button>
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar>
    );
};

export default ReducedNavigation;
