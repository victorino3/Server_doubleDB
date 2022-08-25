const jwt = require("jsonwebtoken")
const Tokenization = require("./Tokenization")
const Tokenizer = new Tokenization()

const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(501).json({ "message": "Access denied" })
        return
    }
    const mytoken = Tokenizer.GetToken(req)
  

    if (!mytoken) {
        res.status(401).json({ "message": "Access denied" })
        return
    }
    try {
        const veryfied = jwt.verify(mytoken, "secretkeyappearshere")
        req.user = veryfied
        next()
    }
    catch (err) {
        res.status(400).json({ "message": " Invalid token" })
        return
    }
}

module.exports = verifyToken