require('node:dns/promises').setServers(["1.1.1.1", "8.8.8.8"])

require('dotenv').config()
const express = require("express");
const cors = require("cors")
const dbConfig = require("./config/dbConfig");

const app = express();
// middlewore
app.use(express.json());
app.use(cors());

// database
dbConfig();

app.get('/',(req,res)=>{
    res.send("hlw")
})

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`servar running on port ${port}`);
})