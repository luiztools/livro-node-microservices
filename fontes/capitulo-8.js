const tape = require("tape");

//8.1
function aplicarDescontoTest(){
    return aplicarDesconto(10,2) === 8;
 }
 
 console.log('A aplicação de desconto está funcionando? ');
 console.log(aplicarDescontoTest());

 //8.2
 function aplicarDesconto(valor, desconto){
    return valor - desconto;
 }

 //8.3
 function aplicarDescontoGrandeTest(){
    return aplicarDesconto(1,10) === 0;
 }
 
 console.log('A aplicação de desconto grande está funcionando? ');
 console.log(aplicarDescontoGrandeTest());

 //8.4
 function aplicarDesconto(valor, desconto){
    if(desconto > valor) return 0;
    return valor - desconto;
 }

 //8.5
 node index.test

 //8.6
 npm install tape

//8.7
const test = require('tape');
const index = require('./index');

//8.8
test('Aplicar desconto', (t) => {
    t.assert(index.aplicarDesconto(10,5) === 5, "Descontou corretamente");
    t.end();
})

//8.9
function aplicarDesconto(valor, desconto){
    if(desconto > valor) return 0;
    return valor - desconto;
 }
 
 module.exports = {aplicarDesconto}

 //8.10
 "test": "node index.test | tap-spec"

 //8.11
 test('Aplicar desconto grande', (t) => {
    t.assert(index.aplicarDesconto(5,10) === 0, "Descontou corretamente");
    t.end();
})

//8.12
npm install supertest express body-parser

//8.13
//app.js
const index = require('./index');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; //porta padrão

//configurando o body parser para interpretar requests mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

// GET /aplicarDesconto
router.get('/aplicarDesconto/:valor/:desconto', (req, res) => {
    const valor = parseInt(req.params.valor);
    const desconto = parseInt(req.params.desconto);
    res.json({valorDescontado: index.aplicarDesconto(valor,desconto)});
})

app.use('/', router);

if (require.main === module){
    //inicia o servidor
    app.listen(port);
    console.log('API funcionando!');
}

module.exports = app;

//8.14
const test = require('tape');
const supertest = require('supertest');
const app = require('./app');

//8.15
test('GET /aplicarDesconto/10/5', (t) => {
    supertest(app)
      .get('/aplicarDesconto/10/5')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) =>{
        t.error(err, 'Sem erros');
        t.assert(res.body.valorDescontado === 5, "Desconto correto");
        t.end() ; 
      })
})

//8.16
"test": "tape ./tests/* | tap-spec"