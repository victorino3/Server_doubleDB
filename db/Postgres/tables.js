
const Connection = require('../Postgres/conn/conn');
const Sequelize = require("sequelize");

const Main = ()=>{
    const table = Connection.define('myusers', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true,
        },
        age: {
            type: Sequelize.INTEGER,
            required: true,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
        },
       
    },
    {
        timestamps:false
    }
    
    )

    table.sync()
    //table.sync({ force: true })
    return table

    
}

//const tt = Main()
//console.log(tt)
module.exports = Main();
































/*
const myusers = conn.define("Tesk", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
    },
    age: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false,
    },

    //timestamps: false,
    createdAt:false,
}
)

let dd = myusers.findAll()
console.log(dd)

*/
















/*
const myusers = Connection.define("myusers",{

            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                required: true,
            },
            age: {
                type: DataTypes.INTEGER,
                required: true,
                allowNull: false,
            },


            timestamps: false,
        }

)
*/



/*

const Myusers =("myusers",{

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
    },
    age: {
        type: DataTypes.INTEGER,
        required: true,
        allowNull: false,
    },


    timestamps: false,
}

)
*/


