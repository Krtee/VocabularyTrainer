import React from "react";
import {shallow} from 'enzyme';
import axios from "axios";
import VocabularyList from "../pages/VocabularyList";


jest.mock('axios');

const setUp = (props = {}) => {
    const component = shallow(<VocabularyList/>);
    return component;
};

describe('<VocabularyList/>', function () {
    let component;

    beforeEach(()=>{
        component = setUp();
    })
    it('should should render the necessary', function () {
        console.log(component.debug())
        expect(component.find(VocabularyList).length).toBe(0);
    });


});