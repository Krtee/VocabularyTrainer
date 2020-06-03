import React,{setGlobal,getGlobal} from "reactn";
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

describe('App function', function () {
    const data = {
        "success": true,
        "data": [
            {
                "_id": "5ec7c66844e4bd51ec69001a",
                "username": "admin",
                "password": "admin",
                "createdAt": "2020-05-22T12:32:40.697Z",
                "updatedAt": "2020-05-22T12:32:40.697Z",
                "__v": 0
            },
            {
                "_id": "5ec7c6a944e4bd51ec69001b",
                "username": "rg041",
                "password": "123",
                "createdAt": "2020-05-22T12:33:45.987Z",
                "updatedAt": "2020-05-22T12:33:45.987Z",
                "__v": 0
            }
        ]
    };

    let component;
    beforeEach(() => {
        component = setUp()
        setGlobal({
            auth: false, user: ""
        });
    });


    it('landing on a bad page shows 404 page', () => {
        const history = createMemoryHistory()
        history.push('/some/bad/route');
        console.log(component.debug());
        console.log(getGlobal())

        expect(component.find(Landing).length).toBe(1)
    })
    it('landing landingpage', () => {
        expect(component.find(Landing).length).toBe(1)

    })

    it('should not redirect when user is wrong', function () {
        component.find('[type="submit"]').simulate('click');
        axios.get.mockResolvedValue(data);
        console.log(data);
        console.log(component.debug());

        expect(component.find(Landing).length).toBe(1)

    });

    it('should redirect when user log in', function () {
            const username = {
                preventDefault() {
                },
                target: {value: 'admin'}
            };
            const password = {
                preventDefault() {
                },
                target: {value: 'admin'}
            };
            axios.get.mockResolvedValue(data);
            component.find('[type="username"]').simulate('change', username);
            component.find('[type="password"]').simulate('change', password);
            component.find('[type="submit"]').simulate('click');
            console.log(component.debug());

            expect(component.find(Languages).length).toBe(1)

        }
    );
});