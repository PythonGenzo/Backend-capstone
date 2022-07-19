import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";




const app = express();


app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT;


const classData =[
    {
      "id":"1",
      "class":"1",
      "class-title":"Javascript-Day-1:Introduction to Browser and web",
      "date&time":"15/02/2022 - Tuesday-10.30AM:1.00PM",
      "contents":"intro to web , browser wars, v8 engine",
      "pre-read":"np pre-read available",
      "activities":"www.google.com"
    },
    {
      "id":"2",
      "class":"2",
      "class-title":"Javascript-Day-1:Introduction to Browser and web",
      "date&time":"16/02/2022 - wednesday-10.30AM:1.00PM",
      "contents":"intro to web , browser wars, v8 engine",
      "pre-read":"np pre-read available",
      "activities":"www.google.com"
    }

  ];

const MONGO_URL =  process.env.MONGO_URL;

async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("MongoDB is Connected");
    return client;
}  

export const client = await createConnection();

app.get("/", function (req, res) {
    res.send("Hello world hai hello hai")
});

app.get("/classData", async function (req, res) {
    const classData = await client
        .db("B33WD")
        .collection("classData")
        .find({})
        .toArray();
    res.send(classData);
});

app.get("/classData/:id",  async function(req, res) {
    const { id } = req.params;
    const sessionData = await client
        .db("B33WD")
        .collection("classData")
        .findOne({id: id})

    sessionData
        ? res.send(sessionData)
        : res.status(404).send({ msg: "zNo such class data found"});
});

app.delete("/classData/:id",  async function(req, res) {
    const { id } = req.params;
    const sessionData = await client
        .db("B33WD")
        .collection("classData")
        .deleteOne({id: id})

    sessionData.deletedCount > 0
        ? res.send(sessionData)
        : res.status(404).send({ msg: "No such class data found"});
});

app.put("/classData/:id",  async function(req, res) {
    const data = req.body;
    const { id } = req.params;
    const result = await client
        .db("B33WD")
        .collection("classData")
        .updateOne({ id }, { $set: data})

         res.send(result);
});

app.post("/classData", async function (req, res) {
    const data = req.body;
    const result = await client
        .db("B33WD")
        .collection("classData")
        .insertMany(data);
    res.send(result);
});


app.listen(PORT, () => console.log(`App is started in ${PORT}`));;