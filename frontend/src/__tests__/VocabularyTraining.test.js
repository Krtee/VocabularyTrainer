import React from "react";
import {shallow} from 'enzyme';
import axios from "axios";
import VocabularyTraining from "../pages/VocabularyTraining";


jest.mock('axios');

const setUp = (props = {}) => {
    const component = shallow(<VocabularyTraining/>);
    return component;
};

describe('<VocabularyTraining/>', function () {
    let component;

    beforeEach(()=>{
        component = setUp();
    })
    it('should should render the necessary', function () {
        console.log(component.debug())
        expect(component.find(VocabularyTraining).length).toBe(0);
    });


});