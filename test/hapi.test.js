/*const Mongo = require("../db/mongodb")
const schema = require("../db/Mongodb/schema")
const context = require("../strategies/Execimplementation")
const conection = Mongo.conection()
const DB = new Mongo(conection,schema)
const contextExec = new context(DB)

const api = require("../api/hapi")

const assert = require("assert")
const ThheFault = {
    name: "Mavericks",
    age:12
}
describe("Testing API wiht Mongoose", function () {
    it("Return all users", async function () {
        const Myapi = await api
        const result = await Myapi.inject({
            method: "GET",
            url: "/"
        })

       
        const statusCode =result.statusCode
        const data =JSON.parse(result.payload)
        assert.deepEqual(statusCode, 200)


        assert.ok(typeof data === "object")
    })

    it.only("Create new user all users", async () =>{
        
        const Myapi = await api
        const result = await Myapi.inject({
            method: "POST",
            url:`/create`,
            payload: ThheFault,
        })
        console.log(result)
        const statusCode =result.statusCode
        console.log(statusCode)
        const data =JSON.parse(result.payload)
        assert.deepEqual(statusCode, 200)
        console.log(result.rawPayload.toString())

    
    })
    
})
*/