const { config } = require("dotenv");
const {join } = require("path");
const { ok } = require("assert");
const env =process.env.NODE_ENV || "dev" && "prod"
ok(env === "dev" || env === "prod" , "Invalid environment specified")
const confiPath =join(__dirname, "./src", `.env.${env}`)
config({
    path: confiPath,
})
//Install PM2 global 

const express = require('express')
const port = process.env.PORT || 5000
const cors = require('cors')
const app = express()

app.use(express.json())
//swagger docs

const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('./openApiDocumentation.json');

//Set cors 
app.use(cors({credentials: true, origin: '*'}))

//Public folder
app.use('/coverage',express.static('coverage'));
//routers call
myroutesUser = require('./api/routes/route')

app.use(myroutesUser)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
//Port number
app.listen(port)