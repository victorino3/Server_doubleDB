
const assert = require("assert")

const schemaPostgres = require("../db/Postgres/tables")
const conection = require("../db/Postgres/conn/conn")
const Postgres = require("../db/postegres")
const { before } = require("mocha")
const context = new Postgres(conection, schemaPostgres)

const Expected = {
    id: 1,
    name: 'Victorino',
    age: 21,
    password: '$2b$04$8ttURq0.iuRIxd/BqL.Zw.haF/gTmhucJJPPEzHZ/XpO.ZHr.YVim'
}
const ExpectedUpdate = {
    age: 15,
}
const NewUser = {
    id: 4,
    name: 'NewUser',
    age: 28,
    password: 'NewUserPass'
}

describe("Testing Postgres", async () => {

    it("Create new User in postgressDb", async function () {
        const result = await context.Create(NewUser)
        assert.ok(result, true)


    })

    it("should return true if the database was connected", async function () {
        const result = await context.Isconnected()
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

    it("update by id in table", async () => {
        const result = await context.update(2, ExpectedUpdate)
        assert.ok(result, 1)
    })

    it("update by id in table", async () => {
        const result = await context.delete(NewUser.id)
        assert.ok(result, 1)
    })



})

