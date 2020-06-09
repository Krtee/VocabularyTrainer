import React from "react";
import {shallow} from 'enzyme';
import axios from "axios";
import Languages from "../pages/Languages";


jest.mock('axios');

const setUp = (props = {}) => {
    const component = shallow(<Languages/>);
    return component;
};

describe('<Languages/>', function () {
    let component;

    beforeEach(()=>{
        component = setUp();
    })
    it('should should render the necessary', function () {
        console.log(component.debug())
        expect(component.find(Languages).length).toBe(0);
    });


});