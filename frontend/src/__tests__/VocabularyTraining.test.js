import React from "react";
import {shallow} from 'enzyme';
import VocabularyTraining_Options from "../components/VocabularyTraining_Options";
import VocabularyTraining_Queries from "../components/VocabularyTraining_Queries";



describe('<VoacbularyTraining_Options/>', function () {
    it('should should render the necessary', function () {
        const component = shallow(<VocabularyTraining_Options/>);

        expect(component.find('input').length).toBe(6);
        expect(component.find('div.form-group').length).toBe(3);

    });

});

describe('<VocabularyTraining_Queries>', function () {

    it('should render word', function () {
        const component = shallow(<VocabularyTraining_Queries/>)
    });

});