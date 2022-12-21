const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000 ;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()


// use all the middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.nrvwj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try {
     console.log("db connected")
    } finally{

    }
}
run().catch(console.dir)


app.get('/', (req,res) => {
    res.send("Hello Server")
});

app.listen(port, () => {
  console.log(`Listening to the port ${port} successfully`)
})