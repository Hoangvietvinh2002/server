const jwt = require('jsonwebtoken')

const generateToken = (id) =>{
    return jwt.sign({id}, 'hvv', {expiresIn : "3d"})
}

module.exports = generateToken