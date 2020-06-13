import React, { useEffect, useState } from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavItem from "react-bootstrap/NavItem";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import plus from '../assets/icons/003-plus.svg';
import train from '../assets/icons/007-bearbeiten.svg';
import overview from '../assets/icons/005-liste.svg';
import './scss/navigation.scss';


const NavigationBottom = (props) => {
    const [active1, setActive1] = useState('');
    const [active2, setActive2] = useState('');
    const [active3, setActive3] = useState('');

    useEffect(() => {
        switch (props.page) {
            case 'VocabularyTraining':
                setActive1('active');
                break;
            case 'AddVocabulary':
                setActive2('active');
                break;
            case 'VocabularyList':
                setActive3('active');
                break;
            default: setActive3('active');
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <style>
                {`
                .navItem{
                }
                `}
            </style>
            <Navbar>
                <Nav className="fixed-bottom">
                    <Container className={"justify-content-center navcontainer"}>
                        <Row className={'navrow'} style={{backgroundColor: "white"}}>
                            <Col className={active1}>
                                <LinkContainer className={'navItem'} to="/VocabularyTraining">
                                    <NavItem>
                                        <img src={train} width="20" height="20" alt={'go to Training'} />
                                        <p>Train</p>
                                    </NavItem>
                                </LinkContainer>
                            </Col>
                            <Col className={active2}>
                                <LinkContainer className={'navItem'} to="/AddVocabulary">
                                    <NavItem>
                                        <img src={plus} width="20" height="20" alt={'add Vocabulary'} />
                                        <p>Add</p>
                                    </NavItem>
                                </LinkContainer>
                            </Col>
                            <Col className={active3}>
                                <LinkContainer className={'navItem'} to="/VocabularyList">
                                    <NavItem>
                                        <img src={overview} width="20" height="20" alt={'go to overview'} />
                                        <p>Overview</p>
                                    </NavItem>
                                </LinkContainer>
                            </Col>
                        </Row>
                    </Container>
                </Nav>
            </Navbar>
        </div>
    )
}

export default NavigationBottom;
