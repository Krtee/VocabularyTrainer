import React, { useGlobal } from "reactn";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavItem from "react-bootstrap/NavItem";

const NavigationTop = () => {
  const [, setAuth] = useGlobal("auth");
  function handleClick() {
    setAuth(false);
  }

  return (
    <Navbar expand="*" id="navbar">
      <Navbar.Toggle aria-controls="basic-navbar-nav" className={'ml-auto'} />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
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
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationTop;
