const { MongoClient, ObjectId } = require("mongodb");
async function connect() {
    if (global.db) return global.db;
    const client = new MongoClient("mongodb://127.0.0.1:27017/");
    await client.connect();
    global.db = client.db("workshop");
    return global.db;
}

async function findCustomers() {
    const db = await connect();
    return db.collection("customers").find().toArray();
}

async function insertCustomer(customer) {
    const db = await connect();
    return db.collection("customers").insertOne(customer);
}

async function findCustomer(id) {
    const db = await connect();
    const objId = new ObjectId(id);
    return db.collection("customers").findOne(objId);
}

async function updateCustomer(id, customer) {
    const filter = { _id: new ObjectId(id) };
    const db = await connect();
    return db.collection("customers").replaceOne(filter, customer);
}

async function patchCustomer(id, updates) {
    const filter = { _id: new ObjectId(id) };
    const db = await connect();
    return db.collection("customers").updateOne(filter, { $set: updates });
}

async function deleteCustomer(id) {
    const db = await connect();
    const filter = { _id: new ObjectId(id) };
    return db.collection("customers").deleteOne(filter);
}

module.exports = { findCustomers, insertCustomer, findCustomer, updateCustomer, patchCustomer, deleteCustomer }