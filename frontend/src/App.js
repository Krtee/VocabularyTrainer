import React from "react";
import Router from "./Router"
import {BrowserRouter} from "react-router-dom";
import Container from "react-bootstrap/Container";
import './customs.scss'

const App = () => (
    <BrowserRouter>
        <Container>
            <Router/>
        </Container>
    </BrowserRouter>
);

export default App;
