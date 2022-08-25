const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const bcrypt = require('bcrypt');
const CompareAsync = promisify(bcrypt.compare)
const HashAsync = promisify(bcrypt.hash)
const Salt = parseInt(process.env.SALT)
class Tokenization {

    constructor() {
    }

    Token(user, req, res) {
        try {
            const token = jwt.sign({
                name: user.name, id:user.id
            }, process.env.SECRET,
                //{ expiresIn: "1h" }
            )

            return token

        } catch (e) {
            return "ERROR in creating token: " + e;
        }
    }

    GetToken(req) {
        try {
            if (
                req.headers.authorization &&
                req.headers.authorization.split(" ")[0] === "Bearer"
            ) {
                return req.headers.authorization.split(" ")[1];
            } else if (req.query && req.query.token) {
               
                return req.query.token;
            }
        } catch (e) {
            return { message: "ERROR in getting token: ", e };;
        }
    }
    static GenerateHash(pass){
        return HashAsync(pass,Salt)
    }
    static CompareHash(pass,hash){
        return CompareAsync(pass,hash)
    }
}

module.exports = Tokenization
