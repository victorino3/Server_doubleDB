const Mongo = require("../db/mongodb")
const MyStratergy = require("../strategies/Execimplementation")
const shema = require("../db/Mongodb/schema");
const {ObjectId }  = require('mongodb');

const connection = Mongo.connect()
const Mymongo = new Mongo(connection, shema)
const Mypstgresdb = new MyStratergy(Mymongo)


const assert = require('assert')
const Expected = { name: 'Victorino',age:21}

const ExpectedX ={ "name" : "David","age" : 40}
const UserTodel ={ "name" : "ADE","age" : 22,}

const newUser = {
    name: "Clovis",
    age: 50,
}
describe("Mongo Testing CRUD", async function () {
 
    it("should create a new User in Mongo", async function () {
        const result =  await Mypstgresdb.Create(UserTodel)
        assert.deepEqual(result.data, true)
    })
    it("Return User by id in Mongo", async function () {
        const {name, age} = await Mypstgresdb.read(ObjectId("630808887431951459bc41eb"))
        assert.deepEqual({name, age},Expected)  
        
        
    })
    it("should Return ALL DATA in Mongo", async function () {
        const result = await Mypstgresdb.readAll(name=null,skip=0,limit=0)
        assert.deepEqual(result.data, true)  
        
        
    })
    it("should Return Update User in Mongo", async function () {
        const query = {age: "40" }
        const result = await Mypstgresdb.update(query,ExpectedX)
        assert.ok(result, 1)
    })
    it("should Delete one User in Mongo", async function () {
        //const result = await Mypstgresdb.delete(ObjectId('62f1886598c74d70b8a657e8')) 
        //I remove by id coz, in moongose the id is provided automatically and will give some trouble in future tests
        const name = "ADE"
        const result = await Mypstgresdb.deleteUser(name)
        assert.deepEqual(result.deletedCount, 1)
    })
})