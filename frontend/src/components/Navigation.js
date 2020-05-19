import React from "react";
import { /*Button, Form, FormControl, */ Navbar, Nav, NavDropdown, } from "react-bootstrap";

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 1 };
    }

    render() {

        return (
            <Navbar bg="light" expand="lg" id="navbar">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/VocabularyList" className="menu_option vocabulary_list">
                            Overview
                </Nav.Link>
                        <Nav.Link href="/AddVocabulary" className="menu_option add_vocabulary">
                            Add vocabulary
                </Nav.Link>
                        <Nav.Link href="/VocabularyTraining" className="menu_option vocabulary_training">
                            Training
                </Nav.Link>
                        <NavDropdown title="Other" id="basic-nav-dropdown" className="menu_option">
                            <NavDropdown.Item href="/Languages" className="menu_option">
                                Change language
                  </NavDropdown.Item>
                            <NavDropdown.Item
                                href="/Settings"
                                className="menu_option settings"
                            >
                                Settings
                  </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/" className="menu_option">
                                Logout
                  </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        );
    }
}

export default Navigation;
