//app.js
const db = require('./db');
const express = require('express');
const app = express();
const port = 3000; //porta padrão

app.use(express.json());

//definindo as rotas
//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

/* GET clientes */
router.get('/clientes/:id?', async function(req, res) {
    try{
      if(req.params.id)
        res.json(await db.findCustomers(req.params.id));
      else
        res.json(await db.findCustomers());
    }
    catch(ex){
      console.log(ex);
      res.status(500).json({erro: `${ex}`});
    }
})

// POST /clientes
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

// PUT /clientes/{id}
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

// PATCH /clientes/{id}
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

app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('API funcionando!');
