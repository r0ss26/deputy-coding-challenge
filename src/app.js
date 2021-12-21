const UserHierarchy = require('./UserHierarchy');
const roles = require('./data/roles');
const users = require('./data/users');

const rl = require('readline-sync');

let useRecursiveSolution = false;
const response = rl.question('Do you want to use a non-recursive algorithm? (Y/y) ');
if (response === 'Y' || response === 'Yes' || response === 'y' || response === 'yes') {
    useRecursiveSolution = true;
}

const userHierarchy = new UserHierarchy(useRecursiveSolution);

userHierarchy.setRoles(roles);
userHierarchy.setUsers(users);

console.log(userHierarchy.getSubordinates(3).sort((firstEl, secondEl) => firstEl.id - secondEl.id));