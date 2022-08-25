

const Icrud = require("./base/Icrudcontext");

class ExecImplematation  extends Icrud {
    constructor(table){
        super();
        this._table = table;
    };
    Create(item){
        return this._table.Create(item);
    };

    read(item){
        return this._table.read(item);
    };
    Isconnected() {
        return this._table.Isconnected();
    }
    async readAll(name,skip,limit){
        return  await this._table.readAll(name,skip,limit);
    }
    async  delete(id) {
        return  await this._table.delete(id);
    };
    async update(id, item) {
        return  await this._table.update(id, item);
    };

        
};

module.exports = ExecImplematation;
/*
const Mongo = require('../db/mongodb')
let context = new ExecImplematation(new Mongo());
//console.log(context);
context.readAll()
.then(function(result) {    console.log(result)})
.catch(function(err) { console.log(err)}); 
*/
/*
const Postgres = require("../db/postegres")
const {Connection} = require("..//db/Postgres/conn/conn")
let conn = Connection()
const table =  require("..//db/Postgres/tables")

const tables = table()
tables
.then(async function(result) {
    const Bigdb = new Postgres(conn, result)
    const context = new ExecImplematation(Bigdb)
    let bb = await context.Isconnected()
    console.log(bb)
})

.catch(function(err) { console.log(err)}); */
//console.log(tables)
/*const Bigdb = new Postgres(conn, tables)

Bigdb.readAll()
.then(function(result) {    console.log(result)})
.catch(function(err) { console.log(err)}); */


