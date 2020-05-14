import React from "react";
import { Link } from "react-router-dom";
import ContentHandler from "./ContentHandler";
import { Button, Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap';

class MainContent extends React.Component {


    constructor(props) {
        super(props);
        this.state = { value: 1 };
    }

    openSignup = () => {
        alert('changing component')
    }

    chooseVocabularyList = () => {
        this.setState({
            value: 1
        })
    }

    chooseAddVocabulary = () => {
        this.setState({
            value: 2
        })
    }

    chooseTrainVocabulary = () => {
        this.setState({
            value: 3
        })
    }

    chooseSettings = () => {
        this.setState({
            value: 4
        })
    }

    render() {
        // The different languages have to be requested from the database.

        return (
            <div>
                <div className="row">

                    <Navbar bg="light" expand="lg" id="navbar">
                        <Navbar.Brand href="#home"><span className="bigFont">VTrainer</span></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="#link" className="menu_option" onClick={this.chooseVocabularyList}>Vocabulary overview</Nav.Link>
                                <Nav.Link href="#link" className="menu_option" onClick={this.chooseAddVocabulary}>Add vocabulary</Nav.Link>
                                <Nav.Link href="#link" className="menu_option" onClick={this.chooseTrainVocabulary}>Train vocabulary</Nav.Link>
                                <NavDropdown title="Other" id="basic-nav-dropdown" className="menu_option">
                                    <NavDropdown.Item href="/languages" className="menu_option">Change language</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2" className="menu_option" onClick={this.chooseSettings}>Settings</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/" className="menu_option">Logout</NavDropdown.Item>

                                </NavDropdown> 
                            </Nav>
{/*                             <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                <Button variant="outline-success">Search</Button>
                            </Form> */}
                        </Navbar.Collapse>
                    </Navbar>

                </div>
                <div className="row" id="content">
                    <ContentHandler value={this.state.value} />
                </div>
            </div>
        )
    }

}




export default MainContent;


