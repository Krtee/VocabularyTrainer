import React, { useGlobal } from "reactn";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import NavItem from "react-bootstrap/NavItem";
import { Redirect } from "react-router";

const ReducedNavigation = () => {
  const [, setAuth] = useGlobal("auth");
  const [, setLangID] = useGlobal("langID");

  function handleClick() {
    localStorage.setItem("isAuthorized", false);
    localStorage.setItem("userId", "");
    setLangID("");
    setAuth(false);
  }

  return (
    <Navbar id="navbar" sticky="top" className="white-background" expand={"*"}>
      {localStorage.getItem("isAuthorized") === "false" ? <Redirect to="/" /> : null}

      <Navbar.Toggle aria-controls="basic-navbar-nav" className={"ml-auto"} />
      <Navbar.Collapse id="basic-navbar-nav" className={"justify-content-end"}>
        <Nav className="ml-auto">
          <Nav.Item>
            <LinkContainer to="/Languages" className="menu_option settings">
              <NavItem className="menu_padding">Change language</NavItem>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/Settings" className="menu_option settings">
              <NavItem className="menu_padding">Account settings</NavItem>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <button type="submit" className="btn btn-primary" onClick={handleClick}>
              Logout
            </button>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ReducedNavigation;
