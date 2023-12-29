const jwt = require('jsonwebtoken')

const refeshToken = (id) =>{
    return jwt.sign({id}, 'hvv', {expiresIn : "3d"})
}

module.exports = refeshToken