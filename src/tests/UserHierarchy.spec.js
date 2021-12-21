const UserHierarchy = require('../UserHierarchy.js');
const roles = require('../data/roles.js');
const users = require('../data/users.js');

describe('user hierarchy', () => {
    test('instantiates', () => {
        const userHierarchy = new UserHierarchy();
        expect(userHierarchy).toBeInstanceOf(UserHierarchy);
    })
});

describe('non recursive user hierarchy', () => {
    let userHierarchy;
    beforeAll(() => {
        userHierarchy = new UserHierarchy(false);
        userHierarchy.setUsers(users);
        userHierarchy.setRoles(roles);
    });

    test('example one', () => {

        const exampleOneResult = [
            { id: 2, name: 'Emily Employee', role: 4 }, 
            { id: 5, name: "Steve Trainer", role: 5 }
        ];
        expect(userHierarchy.getSubordinates(3).sort((firstEl, secondEl) => firstEl.id - secondEl.id))
            .toEqual(exampleOneResult);
    });

    test('example two', () => {

        const exampleTwoResult = [
            { id: 2, name: "Emily Employee", role: 4 }, 
            { id: 3, name: "Sam Supervisor", role: 3 }, 
            { id: 4, name: "Mary Manager", role: 2 }, 
            { id: 5, name: "Steve Trainer", role: 5 }
        ];

        expect(userHierarchy.getSubordinates(1).sort((firstEl, secondEl) => firstEl.id - secondEl.id))
            .toEqual(exampleTwoResult);
    });
});

describe('recursive user hierarchy', () => {

    let userHierarchy;
    beforeAll(() => {
        userHierarchy = new UserHierarchy(true);
        userHierarchy.setUsers(users);
        userHierarchy.setRoles(roles);
    });

    test('example one', () => {

        const exampleOneResult = [
            { id: 2, name: 'Emily Employee', role: 4 }, 
            { id: 5, name: "Steve Trainer", role: 5 }
        ];

        expect(userHierarchy.getSubordinates(3).sort((firstEl, secondEl) => firstEl.id - secondEl.id))
            .toEqual(exampleOneResult);
    });

    test('example two', () => {

        const exampleTwoResult = [
            { id: 2, name: "Emily Employee", role: 4 }, 
            { id: 3, name: "Sam Supervisor", role: 3 }, 
            { id: 4, name: "Mary Manager", role: 2 }, 
            { id: 5, name: "Steve Trainer", role: 5 }
        ];

        expect(userHierarchy.getSubordinates(1).sort((firstEl, secondEl) => firstEl.id - secondEl.id))
            .toEqual(exampleTwoResult);
    });
});

describe('error handling', () => {
    let userHierarchy;
    beforeAll(() => {
        userHierarchy = new UserHierarchy(false);
        userHierarchy.setUsers(users);
        userHierarchy.setRoles(roles);
    });

    test('throws an error when users is not an array', () => {
        function throwUserError() {
            userHierarchy.setUsers({});
        }
        expect(throwUserError).toThrowError('users must be an array')
    });

    test('throws an error when roles is not an array', () => {
        function throwRoleError() {
            userHierarchy.setRoles({})
        }
        expect(throwRoleError).toThrowError('roles must be an array');
    });

    test('returns an empty arry when the user doesn\'t exist', () => {
        expect(userHierarchy.getSubordinates(7)).toEqual([]);
    });
});
