/*const Mongo = require("../db/mongodb")
const MyStratergy = require("../strategies/Execimplementation")
const shema = require("../db/Mongodb/schema");
const {ObjectId }  = require('mongodb');

const connection = Mongo.conection()
const Mymongo = new Mongo(connection, shema)
const Mypstgresdb = new MyStratergy(Mymongo)


const assert = require('assert')
const Expected = { name: 'Victorino',age:21}

const ExpectedX ={ "name" : "test","age" : 4,}
const ExpectedM ={ "name" : "ADE","age" : 22,}

const newUser = {
    name: "Mavericks",
    age:12
}
describe("Mongo Testing CRUD", async function () {
 
    it("should create a new User in Mongo", async function () {
        const result =  await Mypstgresdb.Create(newUser)
        assert.deepEqual(result, true)
    })
    it("Return User by id in Mongo", async function () {
        const {name, age} = await Mypstgresdb.read(ObjectId("62ee6f996dd0324b6f72fae4"))
        //console.log({name, age} )
        assert.deepEqual(ExpectedX,{name, age})  
        
        
    })
    it("should Return ALL DATA in Mongo", async function () {
        let name = ""
        const result = await Mypstgresdb.readAll({name},skip=0,limit=0)
        assert.deepEqual(result.doc, true)  
        
        
    })
    it("should Return Update User in Mongo", async function () {
        const {name, age} = await Mypstgresdb.update(ObjectId("62ed1d8d4f2e859728f9ef50"),Expected)
        assert.deepEqual({name, age}, Expected)
    })
    it("should Return Delete User in Mongo", async function () {
        const result = await Mypstgresdb.delete(ObjectId('62f1886598c74d70b8a657e8'))
        
        assert.deepEqual(result, true)
    })
})*/