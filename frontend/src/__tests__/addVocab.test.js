import React from "react";
import {shallow} from 'enzyme';
import axios from "axios";
import AddVocabulary from "../pages/AddVocabulary";


jest.mock('axios');

const setUp = (props = {}) => {
    const component = shallow(<AddVocabulary></AddVocabulary>);
    return component;
};

describe('<AddVocabulary/>', function () {
    let component;

    beforeEach(()=>{
        component = setUp();
    })
    it('should should render the necessary', function () {
        console.log(component.debug())
        expect(component.find(AddVocabulary).length).toBe(0);
    });


});