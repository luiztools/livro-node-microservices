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