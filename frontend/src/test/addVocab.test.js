import React from "reactn";
import {mount} from 'enzyme';
import Landing from "../pages/Landing";
import axios from "axios";
import App from "../App";
import {createMemoryHistory} from 'history'
import Languages from "../pages/Languages";


jest.mock('axios');

const setUp = (props = {}) => {
    const component = mount(<App/>);
    return component;
};