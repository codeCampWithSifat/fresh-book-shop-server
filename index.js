const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

// use all the middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.nrvwj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    console.log("db connected");
    const booksCollection = client.db("Books_Collection");
    const books = booksCollection.collection("All_Books");
    const orders = booksCollection.collection("Order");

    // find all the books
    app.get("/allbooks", async (req, res) => {
      const query = {};
      const cursor = books.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // find a single book
    app.get("/allbooks/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await books.findOne(query);
      res.send(result);
    });

    // delete a book
    app.delete("/allbooks/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await books.deleteOne(query);
      console.log(result);
      res.send(result);
    });
    // add a singel book from the ui
    app.post("/addbook", async (req, res) => {
      const book = req.body;
      const result = await books.insertOne(book);
      res.send(result);
    });

    // add an order from the ui
    app.post("/order", async (req, res) => {
      const order = req.body;
      const result = await orders.insertOne(order);
      res.send(result);
    });

    // get all the orders
    app.get("/order", async (req, res) => {
        const email = req.query.email ;
        const query = {email: email};
        const cursor = orders.find(query);
        const result = await cursor.toArray();
        res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello Server");
});

app.listen(port, () => {
  console.log(`Listening to the port ${port} successfully`);
});
