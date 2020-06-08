import React, { useGlobal } from "reactn";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const ReducedNavigation = () => {
  const [auth, setAuth] = useGlobal("auth");
  function handleClick() {
    setAuth(false);
  }
  return (
<Navbar expand="*" id="navbar">
      <Navbar.Toggle aria-controls="basic-navbar-nav" className={'ml-auto'}/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavDropdown title="Account" id="basic-nav-dropdown" className="menu_option">
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

export default ReducedNavigation;
