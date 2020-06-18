import React from "react";
import {shallow} from 'enzyme';
import LogInForms from "../components/LogInForms";


const setUp = (props = {}) => {
    const component = shallow(<LogInForms noAccount={props}/>);
    return component;
};

describe('<LogInForms/>', function () {

    it('should render the necessary', function () {
        let component = setUp(true)
        expect(component.find('input').length).toBe(4);
    });

    it('should render the necessary', function () {
        let component = setUp(false)
        expect(component.find('input').length).toBe(2);
    });


});