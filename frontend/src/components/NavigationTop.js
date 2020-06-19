import React, { useGlobal } from "reactn";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import NavItem from "react-bootstrap/NavItem";
import { LinkContainer } from "react-router-bootstrap";
import { Redirect } from "react-router";
//import useWindowDimensions from "./Windowsize";

const NavigationTop = (props) => {
  const [, setAuth] = useGlobal("auth");
  const [, setLangID] = useGlobal("langID");

  function handleClick() {
    localStorage.setItem("isAuthorized", false);
    localStorage.setItem("userId", "");
    setLangID("");
    setAuth(false);
  }

  return (
    <Navbar expand="lg" id="navbar" className="white-background nav_border" sticky="top">
      {localStorage.getItem("isAuthorized") === "false" ? <Redirect to="/" /> : null}
      <Navbar.Toggle aria-controls="basic-navbar-nav" className={"ml-auto"} />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {props.width > 700 && (
            <>
              <LinkContainer to="/VocabularyList" className="menu_option vocabulary_list">
                <NavItem className="menu_padding">Overview</NavItem>
              </LinkContainer>
              <LinkContainer to="/AddVocabulary" className="menu_option add_vocabulary">
                <NavItem className="menu_padding">Add Vocabulary</NavItem>
              </LinkContainer>
              <LinkContainer to="/VocabularyTraining" className="menu_option vocabulary_training">
                <NavItem className="menu_padding">Training</NavItem>
              </LinkContainer>
            </>
          )}

          {props.width > 700 ? (
            <NavDropdown
              className={"mr-sm-2 menu_option"}
              id={"basic-nav-dropdown"}
              title={"Settings"}
            >
              <NavDropdown.Item className="menu_option">
                <LinkContainer to="/Languages" className="menu_option mr-sm-2">
                  <NavItem className="menu_padding">Change language</NavItem>
                </LinkContainer>
              </NavDropdown.Item>
              <NavDropdown.Item className="menu_option">
                <LinkContainer to="/Settings" className="menu_option settings">
                  <NavItem className="menu_padding">Account settings</NavItem>
                </LinkContainer>
              </NavDropdown.Item>
              <NavDropdown.Item className="menu_option">
                <button type="submit" className="btn btn-primary" onClick={handleClick}>
                  Logout
                </button>
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <LinkContainer to="/Languages" className="menu_option mr-sm-2">
                <NavItem className="menu_padding">Change language</NavItem>
              </LinkContainer>{" "}
              <LinkContainer to="/Settings" className="menu_option settings">
                <NavItem className="menu_padding">Account settings</NavItem>
              </LinkContainer>
              <button type="submit" className="btn btn-primary" onClick={handleClick}>
                Logout
              </button>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationTop;
