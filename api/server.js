const express = require("express");

const db = require("../data/dbConfig.js");
const accountRouter = require('../accounts/accounts-router')
const server = express();

server.use(express.json());

server.get('/', (req,res)=>{
    res.status(200).json({msg: "api up"})
})

server.use('/api/accounts', accountRouter);

module.exports = server;
