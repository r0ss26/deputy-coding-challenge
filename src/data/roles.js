const roles = [
    {
        id: 1,
        name: 'System Administrator',
        parent: 0
    },
    {
        id: 2,
        name: 'Location Manager',
        parent: 1
    },
    {
        id: 3,
        name: 'Supervisor',
        parent: 2
    },
    {
        id: 4,
        name: 'Employee',
        parent: 3
    },
    {
        id: 5,
        name: 'Trainer',
        parent: 3
    },
];

module.exports = roles;