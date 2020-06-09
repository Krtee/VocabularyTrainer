import React, { useGlobal } from "reactn";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavItem from "react-bootstrap/NavItem";

const Navigation = () => {
  const [auth, setAuth] = useGlobal("auth");
  function handleClick() {
    setAuth(false);
  }

  return (
    <Navbar bg="light" expand="lg" id="navbar">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavItem className="menu_padding">
            <Link to="/VocabularyList" className="menu_option vocabulary_list">
              Overview
            </Link>
          </NavItem>
          <NavItem className="menu_padding">
            <Link to="/AddVocabulary" className="menu_option add_vocabulary">
              Add vocabulary
            </Link>{" "}
          </NavItem>

          <NavItem className="menu_padding">
            <Link to="/VocabularyTraining" className="menu_option vocabulary_training">
              Training
            </Link>{" "}
          </NavItem>

          <NavDropdown title="Account" id="basic-nav-dropdown" className="menu_option">

            <NavItem className="menu_padding">
              <Link to="/Languages" className="menu_option">
                Change language
            </Link>{" "}
            </NavItem>
            <NavItem className="menu_padding">
              <Link to="/Settings" className="menu_option">
                Settings
            </Link>{" "}
            </NavItem>
            <NavDropdown.Divider />

            <NavDropdown.Item className="menu_option">
              <button type="submit" className="btn btn-primary" onClick={handleClick}>
                Logout
              </button>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
