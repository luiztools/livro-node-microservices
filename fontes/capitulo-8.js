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
 npm init

 //8.6
 jest

 //8.7
 {
    "name": "tdd-jest",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "jest"
    },
    "author": "LuizTools",
    "license": "ISC"
  }

  //8.8
  npm test

  //8.9
  npm install --save-dev jest

  //8.10
  jets --init

//8.11
test('Aplicar desconto', (t) => {
    t.assert(index.aplicarDesconto(10,5) === 5, "Descontou corretamente");
    t.end();
})

//8.12
function aplicarDesconto(valor, desconto){
    if(desconto > valor) return 0;
    return valor - desconto;
 }
 
 module.exports = {aplicarDesconto}

 //8.13
 test('Aplicar desconto grande', () => {
    const result = index.aplicarDesconto(5,10);
    expect(result).toEqual(0);
})

//8.14
collectCoverage: true,

//8.15
//app.js
const index = require('./index');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

// GET /aplicarDesconto
app.get('/aplicarDesconto/:valor/:desconto', (req, res) => {
    const valor = parseInt(req.params.valor);
    const desconto = parseInt(req.params.desconto);
    res.json({ valorDescontado: index.aplicarDesconto(valor, desconto) });
})

if (require.main === module) {
    //inicia o servidor
    app.listen(port)
    console.log('API funcionando!')
}

module.exports = app

//8.16
npm i express

//8.17
"scripts": {
  "test": "jest",
  "start": "node app"
},

//8.18
npm install --save-dev supertest

//8.19
const supertest = require('supertest');
const app = require('./app');

//8.20
test('GET /aplicarDesconto/10/5', async () => {
  const response = await supertest(app)
      .get('/aplicarDesconto/10/5');

  expect(response.statusCode).toEqual(200);
  expect(response.body.valorDescontado).toEqual(5);
})