const express = require('express');
const router = express.Router();
const db = require('../db');

/* GET new page. */
router.get('/new', (req, res, next) => {
  res.render('new', { title: "Cadastro de Cliente", doc: {}, action: "/new" });
})

/* POST edit page. */
router.post('/edit/:id', async (req, res) => {
  const id = req.params.id;
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf;
  await db.update(id, {nome, idade, uf});
  res.redirect('/?edit=true');
})

/* GET delete page. */
router.get('/delete/:id', async (req, res) => {
  const id = req.params.id;
  await db.deleteOne(id);
  res.redirect('/?delete=true');
})

/* GET edit page. */
router.get('/edit/:id', async (req, res, next) => {
  const id = req.params.id;
  const doc = await db.findOne(id);
  res.render('new', { title: 'Edição de Cliente', doc, action: '/edit/' + doc._id })
})

/* GET home page. */
router.get('/', async (req, res) => {
  res.render('index', {docs: await db.findAll()});
})

/* POST new page. */
router.post('/new', async (req, res) => {
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf;
  await db.insert({nome, idade, uf});
  res.redirect('/?new=true')
})

module.exports = router;
