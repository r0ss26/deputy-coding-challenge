/**
 * Class encapsulate the data structure and logic
 * for finding all of a users subordinates.
 */
class UserHierarchy {
    /** @member {Array} */
    #roles = [];

    /** @member {Array} */
    #users = [];

    /** @member {Object} */
    #rolesLookup = {};

    /** @member {Boolean} */
    runRecursiveSolution = false;

    /**
     * Create a UserHierarchy.
     * @param {Boolean} runRecursiveSolution - This boolean flag
     * determines which algorithm is used to return the subordinates.
     */
    constructor(runRecursiveSolution=false) {
        this.runRecursiveSolution = runRecursiveSolution;
    }

    /** 
     * @function setRoles sets the private member roles
     * @param {Array} roles An array of roles
     * @returns {undefined}   
    */
    setRoles(roles) {
        if (!Array.isArray(roles)) {
            throw new TypeError('roles must be an array');
        }

        this.#roles = [...roles];

        // we want each role to store a list of all its descendants
        // create an object that looks like {roleId: descendents: [...]}
        // the algorithm looks at each nodes parent and adds the current child node 
        // to the parents descendants array
        this.#roles.forEach(role => {
            this.#rolesLookup[role.id] = { descendants: []};
        });

        this.#roles.forEach(role => {

            let parentId = role.parent;
            while (parentId !== 0) { // while we haven't reached the root node
                // add the current node to the parents descendants
                this.#rolesLookup[parentId].descendants = [...this.#rolesLookup[parentId].descendants, role.id]
                // traverse up the tree and add the current node as a descendant of each parent node
                parentId = this.#roles.find(parent => parent.id === parentId).parent;
            }
        });
    }

    /** 
     * @function setUsers sets the private members users.
     * @param {Array} roles An array of users
     * @returns {undefined}   
    */
    setUsers(users) {
        if (!Array.isArray(users)) {
            throw new TypeError('users must be an array');
        }

        this.#users = [...users];
    } 

    /** 
     * @function findRoleId given a userId find their roleId
     * @param {BigInt} userId A users id
     * @returns {BigInt} a users id or -1 if none is found
    */
    #findRoleId(userId) {
        return this.#users.find(user => user.id === userId)?.role || -1;
    };

 
    /** 
     * @function findSubordinateRolesRecursive given a userId find their roleId
     * @param {BigInt} roleId The role for which you want to find the descendants
     * @param {Array} [roleIds] An initial array of role id's
     * @returns {Array} An array of role id's
    */
    #findSubordinateRolesRecursive(roleId, roleIds=[]) {

        for (let i = 0; i < this.#roles.length; i++) {
            // if the current node is a child of the specified role
            // store it. All children of this node are then descendants
            // of the specified node. Recursively push each descendant
            // into the array.
            if (this.#roles[i].parent === roleId) {
                roleIds.push(this.#roles[i].id);
                this.#findSubordinateRolesRecursive(this.#roles[i].id, roleIds);
            }
        }

        return roleIds;
    };

    /** 
     * @function getSubordinates given a users id find all of their subordinates
     * @param {BigInt} userId A users id
     * @returns {Array} An array of users
    */
    getSubordinates(userId) {
        const inputUserIdRole = this.#findRoleId(userId);

        if (inputUserIdRole === -1) {
            return [];
        }

        // recursive
        if (this.runRecursiveSolution) {
            const subordinateRolesOfInputUser = this.#findSubordinateRolesRecursive(inputUserIdRole);
            // Now that we have an array of roles that are subordinate to the input users role
            // we can filter the users array to include only those whose role is subordinate.
            return this.#users.filter(user => subordinateRolesOfInputUser.includes(user.role));
        } else {
            // non recursive
            return this.#users.filter(user => this.#rolesLookup[inputUserIdRole].descendants.includes(user.role));
        }
    }; 
}

module.exports = UserHierarchy;