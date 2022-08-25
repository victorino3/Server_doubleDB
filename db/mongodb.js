const Icrud = require("../strategies/base/Icrudcontext")
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

class MongoDb extends Icrud {
    constructor(conection, schema) {
        super();
        this.conection = conection;
        this.schema = schema;



    }
    static async conection() {
        try {
            const connection = await mongoose.connect(process.env.MONGOURL,
                { useNewUrlParser: true })
            return connection

        } catch (error) {
            return (error);
        }



    }



    async Create(item) {
        let content = this.schema.create(item)
        return content;

    };
    async read(id) {
        return await this.schema.findById(ObjectId(id));


    }
    async readAll(name, skip, limit) {
        try {
            if (name) {
                const data = await this.schema.find({ name }).skip(skip).limit(limit).exec();
                let doc = data.length == 0 ? "Nothing found"  : data;

                return doc
            }
         
            return await this.schema.find({}).skip(skip).limit(limit).exec();

        }
        catch (e) { return "Something went wrong in ReadAll", e }



    }
    async update(id, item) {
        //console.log(id);
        return await this.schema.findByIdAndUpdate(ObjectId(id), item)
        //console.log(vv);

    }
    async delete(id) {
        let vv = await this.schema.findByIdAndRemove(ObjectId(id))
        if (vv != null | vv != undefined) {
            return true;
        }

    }
};

module.exports = MongoDb;
