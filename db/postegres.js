
const Icrud = require("../strategies/base/Icrudcontext");


class Postgres extends Icrud {
    constructor(conection, schema) {
        super();
        this.conection = conection
        this.tables = schema


    }
    async Isconnected() {
        try {
            await this.conection.authenticate();
            return true;
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    async Create(item) {
        
        try {
            await this.tables.create(item, { raw: true });
            return true;
        } catch (error) {
            return  error;
        }
    }

    async read(name, id = 0) {
        try {
            if (id != 0) {
                let data = await this.tables.findByPk(id, { raw: true })
                return data
            } else if (name != null) {
                let data = await this.tables.findOne({ raw: true }, { where: { name: name } })
                return data
            }
        } catch (e) { return (e); }


    }

    async readAll() {
        try {
            let data = await this.tables.findAll({ raw: true });
            if (data != null || data != undefined) {
                return {
                    data: data,
                    total: true
                };
            }
        } catch (e) { return (e); }




    }
    async update(Id, item) {
        if (!Id) {
            console.error("Please provide a unique identifier for this tables");
            return
        }
        let { id } = await this.tables.findByPk(Id, { raw: true });
        let dataX = {
            id,
            ...item,
        };
        let data = await this.tables.update(dataX, {
            where: {
                id: id
            }
        });
        return data;


    }
    async delete(Id) {
        try {
            if (Id) {
                let del = await this.tables.destroy({
                    where: { id: Id },
                });
                return del;

            }
        } catch (e) {
            return ("Please provide a unique identifier for this table");

        }


    }
};

module.exports = Postgres;