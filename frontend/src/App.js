import React, {useEffect} from "react";
import Router from "./Router"
import {BrowserRouter} from "react-router-dom";
import Container from "react-bootstrap/Container";
import './customs.scss';
import {useGlobal} from "reactn";

const App = () => {

    return (
        <BrowserRouter>
            <Container>
                <Router/>
            </Container>
        </BrowserRouter>
    )
};

export default App;
