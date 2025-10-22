const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

async function comparePasswords(password, hashedPassword) {
    console.log(password,hashedPassword);
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
    hashPassword,
    comparePasswords,
};
