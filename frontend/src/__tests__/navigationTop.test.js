import React from "react";
import {shallow} from 'enzyme';
import NavigationTop from "../components/NavigationTop";
import NavItem from "react-bootstrap/NavItem";


const setUp = (props = 1200) => {
    const component = shallow(<NavigationTop width={props}/>);
    return component;
};

describe('<NavigationTop/>', function () {
    it('should render the necessary', function () {
        let component = setUp(700)
        console.log(component.debug())
        expect(component.find(NavItem).length).toBe(2);
    });

    it('should render the necessary', function () {
        let component = setUp(1400)
        console.log(component.debug())
        expect(component.find(NavItem).length).toBe(5);
    });


});