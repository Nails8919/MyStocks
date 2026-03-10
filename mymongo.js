import { MongoClient, ServerApiVersion } from "mongodb";
import { MDBURI } from "./config.js";


const client = new MongoClient(MDBURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

const analyticsDB = client.db("sample_analytics")
const customerCollection = analyticsDB.collection("customers")
const transCollection = analyticsDB.collection("transactions")
const FavesCollection = analyticsDB.collection("myFaves")

export { customerCollection, transCollection, FavesCollection }