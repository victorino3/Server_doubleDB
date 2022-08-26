require('dotenv').config({ path: 'src/.env.prod' })
require('dotenv').config({ encoding: 'latin1' })
const Icrud = require("../strategies/base/Icrudcontext")
const Mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

class MongoDb extends Icrud {
    constructor(conection, schema) {
        super();
        this.conection = conection;

        this.schema = schema;
    }
    static connect() {
        Mongoose.connect(process.env.MONGOURL, {
            useNewUrlParser: true
        }, function (error) {
            if (!error) return;
            console.log('Falha na conexão!', error)
        })
        const connection = Mongoose.connection

        connection.once('open', () => console.log('database rodando!!'))
        return connection;
    }



    async Create(item) {
        let content = await this.schema.create(item)
        return {
            content,
            data: true,
        };

    };
    async read(id) {
        return await this.schema.findById(ObjectId(id));


    }

    async readAll(name, skip, limit) {
        try {
            if (name) {
                const data = await this.schema.find({ name }).skip(skip).limit(limit).exec();
                let doc = data.length == 0 ? "Nothing found" : data;

                return {
                    doc,
                    data: true
                }
            }

            const allUser = await this.schema.find({}).skip(skip).limit(limit).exec();
            return {
                allUser,
                data: true
            }

        }
        catch (e) { return "Something went wrong in ReadAll", e }



    }
    async update(query, item) {
        try {
            await this.schema.findOneAndUpdate({ name: query }, item, {
                new: true
            })
            return 1
        }
        catch (e) {
            return "Something went wrong in Update", e
        }


    }
    async deleteUser(query) {
        try {
            let dellUser = await this.schema.deleteOne({ name: query })
            return dellUser


        }
        catch (err) { return err; }

    };
}


module.exports = MongoDb;
