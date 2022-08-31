const assert = require("assert")
const schemaPostgres = require("../db/Postgres/tables")
const conection = require("../db/Postgres/conn/conn")
const Postgres = require("../db/postegres")
const context = new Postgres(conection, schemaPostgres)

const Expected = {}
const ExpectedUpdate = {}
const NewUser = {}

describe("Testing Postgres", async () => {
    it("should True if is connect", async () => {
        const result = await context.Isconnected()
        assert.ok(result, true)
    })

    it("Create new User in postgressDb", async function () {
        const result = await context.Create(NewUser)
        assert.ok(result, true)


    })

    it("should return true if all user was returned", async function () {
        const result = await context.readAll()
        assert.ok(result.total, true)

    })


    it("selcet by id in table", async () => {
        const result = await context.read(Expected.id)
        assert.deepEqual(result, Expected)
    })

    it("update by id", async () => {
        const result = await context.update(2, ExpectedUpdate)
        assert.ok(result, 1)
    })

    it("Delete by id", async () => {
        const result = await context.delete(NewUser.id)
        assert.ok(result, 1)
    })



})

