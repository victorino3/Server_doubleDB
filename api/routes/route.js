const express = require('express');
const app = express();

const MongoD = require("../../db/mongodb")
const schema = require("../../db/Mongodb/schema")
const connection = MongoD.connect()
const Tokenizations = require("./helpers/Tokenization")
const Tokenizer = new Tokenizations()
const verify = require("./helpers/verifyToken")
const DB = new MongoD(connection, schema)

/*----------------PostgressDb Calling---------------------------*/
const schemaPostgres = require("../../db/Postgres/tables")
const conection = require("../../db/Postgres/conn/conn")
const Postgres = require("../../db/postegres")
const context = new Postgres(conection, schemaPostgres)



app.post("/singUp", async (req, res) => {
    try {
        const { name, password, age } = req.body
        const Regex = /[a-zA-Z]$/
        const Nameresult = Regex.test(name)
        const regex = /^[0-9]{1,2}$/g
        const Ageresult = regex.test(age)
        if (Nameresult === false || Ageresult === false) {
            return res.status(400).json({ message: "Invalid username or age" })
        }
        if (!password) {
            return res.status(400).json({ message: "Invalid password or username" })
        }
        const HashPassword = await Tokenizations.GenerateHash(password)
        const conn = await context.Create({ name, password: HashPassword, age })
        return res.status(200).json({ message: conn })
    }
    catch (err) { return res.status(500).json({ message: err.message }) }


})


app.post('/login', async function (req, res) {


    try {
        const name = req.body.name
        const password = req.body.password
        const UserExist = await context.read(name)
        if (UserExist === null || UserExist === undefined) { return res.status(404).json({ message: "Invalid username or password provided" }) }
        const decode = await Tokenizations.CompareHash(password,UserExist.password)
        if(decode === true){
            let data = Tokenizer.Token(UserExist)
            return res.status(200).json({ message: data })
        }
        

    }
    catch (error) { return (error) }

})
app.get('/users',verify,async function (req, res) {
    try {
        var name = req.query.name
        var skip = req.query.skip
        var limit = req.query.limit
        skip = !skip ? 0 : skip
        limit = !limit ?  0 : limit

        const Regex = /[a-zA-Z]$/
        const result = Regex.test(name) 
        const regex = /^[0-9]{1,2}$/g
        const limichec = /^[0-9]{1,2}$/g
        const ResultK = regex.test(skip)
        const resultL = limichec.test(limit)
        

        if (result === false) {
            return res.status(400).json({ message: 'Invalid name' })
        }
        if (ResultK === false) {
            return res.status(400).json({ message: 'Invalid skip' })
        }
        if (resultL === false) {
            return res.status(400).json({ message: 'Invalid limit' })
        }
        
        let info = await DB.readAll(name , skip, limit);
        return res.status(200).json({ info })
    }
    catch (err) {
        console.log("Something went wrong in /", err)
    }

})

app.get('/users/postgres',verify,async function (req, res) {
    try {
        let data= await context.readAll();
        return res.status(200).json(data)
    }
    catch (err) {
        console.log("Something went wrong in /", err)
    }

})

app.post('/create',verify, async function (req, res) {
    try {
        const name = req.body.name;
        const age = req.body.age;
        const Regex = /[a-zA-Z]$/
        const regex = /^[0-9]{1,2}$/g
        const Result = regex.test(age)
        const result = Regex.test(name)
        if (result === false || Result === false) {
            return res.status(400).json({ message: 'Invalid name or age' })
        }
        let info = await DB.Create({ name, age });
        console.log(info)
        return res.status(200).json({ info })
    }
    catch (err) {
        console.log("Something went wrong in /create", err);
    }

})

app.patch("/updateOne/:id",verify, async function (req, res) {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const age = req.body.age;
        //const age = req.body.age;
        if (!id.match(/^[0-9a-fA-F]{24}$/)){
            res.status(422).json({"message":" Invalid Id!"})
            return
        }
        const Regex = /[a-zA-Z]$/ 
        const regex = /^[0-9]{1,2}$/g
        const Result = regex.test(age)
        const result = Regex.test(name)
        if (result === false || Result === false) {
            return res.status(400).json({ message: 'Invalid name or age ' })
        }
        let info = await DB.update(id,{name, age});
        return res.status(200).json({ info })
    }
    catch (err) {
        console.log("Something went wrong in /updateone", err);
    }



})

app.delete('/delete/:id', verify, async function(req, res) {
    try {
        const id = req.params.id;
        if (!id.match(/^[0-9a-fA-F]{24}$/)){
            res.status(422).json({"message":" Invalid Id!"})
            return
        }

        let info = await DB.delete(id);
        return res.status(200).json({ info })
    }
    catch (err) {
        console.log("Something went wrong in /updateone", err);
    }

});



module.exports = app