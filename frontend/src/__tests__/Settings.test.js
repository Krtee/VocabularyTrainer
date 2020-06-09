import React from "react";
import { shallow} from 'enzyme';
import axios from "axios";
import Settings from "../pages/Settings";


jest.mock('axios');

const setUp = (props = {}) => {
    const component = shallow(<Settings/>);
    return component;
};

describe('<Settings/>', function () {
    let component;

    beforeEach(()=>{
        component = setUp();
    })
    it('should should render the necessary', function () {
        console.log(component.debug())
        expect(component.find(Settings).length).toBe(0);
    });


});