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

export default function fetchUsers() {
    return new Promise((resolve, reject) => {
        const userID = parseInt(url.substr('/users/'.length), 10);
        process.nextTick(() =>
            users[userID]
                ? resolve(users[userID])
                : reject({
                    error: 'User with ' + userID + ' not found.',
                }),
        );
    });
}