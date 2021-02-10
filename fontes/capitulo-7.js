//7.1
npm init

//7.2
npm i express mongodb

//7.3
const {MongoClient} = require("mongodb");
async function connect(){
  if(global.db) return global.db;
  const conn = await MongoClient.connect("mongodb://localhost:27017/", { useUnifiedTopology: true });
  if(!conn) return new Error("Can't connect");
  global.db = await conn.db("workshop");
  return global.db;
}

module.exports = { }

//7.4
const db = require('./db');
const express = require('express');
const app = express();
const port = 3000; //porta padrão

//7.5
app.use(express.json());

//7.6
//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

//7.7
//inicia o servidor
app.listen(port);
console.log('API funcionando!');

//7.8
async function findCustomers(){  
  const db = await connect();
  return db.collection("customers").find().toArray();
}
module.exports = {findCustomers}

//7.9
router.get('/clientes', async function(req, res) {
  try{
      res.json(await db.findCustomers());
  }
  catch(ex){
    console.log(ex);
    res.status(500).json({erro: `${ex}`});
  }
})

//7.10
async function findCustomer(id){ 
  const db = await connect(); 
  const objId = new ObjectId(id);
  return db.collection("customers").findOne(objId);
}

module.exports = {findCustomers, findCustomer}

//7.11
router.get('/clientes/:id?', async function(req, res) {
  try{
    if(req.params.id)
      res.json(await db.findCustomers(req.params.id));
    else
      res.json(await db.findCustomer());
  }
  catch(ex){
    console.log(ex);
    res.status(500).json({erro: `${ex}`});
  }
})

//7.12
async function insertCustomer(customer){
  const db = await connect();
  return db.collection("customers").insertOne(customer);
}

module.exports = {findCustomers, findCustomer, insertCustomer}

//7.13
router.post('/clientes', async function(req, res, next){
  try{
    const customer = req.body;
    await db.insertCustomer(customer);
    res.json({message: "cliente cadastrado com sucesso"});
  }
  catch(ex){
    console.log(ex);
    res.status(500).json({erro: `${ex}`});
  }
})

//7.14
curl -X POST -d "{'nome':'Curl', 'idade': 11, 'uf': 'RJ'}" http://localhost:3000/clientes

//7.15
async function updateCustomer(id, customer){
  const filter = {_id: new ObjectId(id)};
  const db = await connect();
  return db.collection("customers").update(filter, customer);
}

module.exports = {findCustomers, findCustomer, insertCustomer, updateCustomer}

//7.16
router.put('/clientes/:id', async function(req, res){
  try{
    const customer = req.body;
    await db.updateCustomer(req.params.id, customer);
    res.json({message: "cliente atualizado com sucesso"});
  }
  catch(ex){
    console.log(ex);
    res.status(500).json({erro: `${ex}`});
  }
})

//7.17
curl -X PUT -d "{'nome':'Postman', 'idade': 20, 'uf': 'SP'}" http://localhost:3000/clientes/sfdsfsdfdsf9

//7.18
async function patchCustomer(id, updates){
  const filter = {_id: new ObjectId(id)};
  const db = await connect();
  return db.collection("customers").updateOne(filter, {$set: updates});
}

module.exports = {findCustomers, findCustomer, insertCustomer, updateCustomer, patchCustomer}

//7.19
router.patch('/clientes/:id', async function(req, res){
  try{
    await db.patchCustomer(req.params.id, req.body);
    res.json({message: "cliente atualizado com sucesso"});
  }
  catch(ex){
    console.log(ex);
    res.status(500).json({erro: `${ex}`});
  }
})

//7.20
curl -X PATCH -d "{'idade':53}" http://localhost:3000/clientes/sfsdfdsfsdfdsf9

//7.21
async function deleteCustomer(id){
  const db = await connect(); 
  const filter = {_id: new ObjectId(id)};
  return db.collection("customers").deleteOne(filter);
}

module.exports = { findCustomers, insertCustomer, findCustomer, updateCustomer, patchCustomer, deleteCustomer }

//7.22
// DELETE /clientes/{id}
router.delete('/clientes/:id', async function(req, res){
  try{
    await db.deleteCustomer(req.params.id)
    res.json({message: "cliente excluído com sucesso"});
  }
  catch(ex){
    console.log(ex);
    res.status(500).json({erro: `${ex}`});
  }
})

//7.23
curl -X DELETE http://localhost:3000/clientes/9sdsfddsgs