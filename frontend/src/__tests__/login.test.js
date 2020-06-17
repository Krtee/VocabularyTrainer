import * as React from 'react';
import {mount} from 'enzyme';
import Landing from "../pages/Landing";
import mockAxios from 'axios';
import App from "../App";
import {createMemoryHistory} from 'history';



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

    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    it('landing on a login on bad route', () => {
        const history = createMemoryHistory()
        history.push('/some/bad/route');

        expect(component.find(Landing).length).toBe(1)
    })
    it('landing landingpage', () => {
        expect(component.find(Landing).length).toBe(1)

    })

    it('should not redirect when user is wrong', function () {
        component.find('[type="submit"]').simulate('click');
        mockAxios.get.mockResolvedValue(data);
        component.update()

        expect(component.find(Landing).length).toBe(1)

    });

    it('should set auth token', async function () {

        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve({
                data: data
            })
        );
        //const component = mount(<MemoryRouter><Landing/></MemoryRouter>)
        component.find('[type="username"]').instance().value = 'admin';
        component.find('[type="password"]').instance().value = 'admin';
        component.find('[type="submit"]').simulate('submit')
        component.update();
        expect(mockAxios.get).not.toHaveBeenCalledTimes(0)



    });
});