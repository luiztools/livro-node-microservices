//5.1
npm install -g https://github.com/luiztools/express-generator.git

//5.2
express -e --git workshop

//5.3
cd workshop
npm install

//5.4
npm start

//5.5
const app = require('../app');
const debug = require('debug')('workshop:server');
const http = require('http');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

//5.6
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const index = require('./routes/index');
const users = require('./routes/users');

//5.7
const app = express();

//5.8
// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//5.9
module.exports = app;

//5.10
// códigos…
const index = require('./routes/index');
const users = require('./routes/users');

// mais códigos...

app.use('/', index);
app.use('/users', users);

//5.11
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;

//5.12
res.render('index', { title: 'Express' });

//5.13
// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//5.14
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <p>Welcome to <%= title %></p>
  </body>
</html>

//5.15
res.render('index', { title: 'Express' });

//5.16
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('new', { title: 'Novo Cadastro' });
});

module.exports = router;

//5.17
const new = require('./routes/new);
app.use('/new', new);

//5.18
//coloque todo o conteúdo abaixo dentro de um arquivo index.js
//rode o comando "npm init" na mesma pasta do index.js e apenas aperte Enter para tudo
//rode os comandos "npm install -S express fs" para instalar as dependências
//use o comando "node index" na pasta do index.js para iniciar esse programa
const express = require('express');
const fs = require('fs');  //fs é o módulo file-system, para ler arquivos
const app = express();

app.get('/', processRequest);

function processRequest (request, response) {  
  readText(request, response);
  console.log('requisição terminou');
}

function readText (request, response) {  
  //salve um arquivo teste.txt junto a esse arquivo com qualquer coisa dentro
  fs.readFile('teste.txt', function(err, data) {
    if (err) {
        console.log('erro na leitura');
        return response.status(500).send('Erro ao ler o arquivo.');
      }
    response.write(data);
    response.end();
    console.log('leu arquivo');
  });

  console.log('Lendo o arquivo, aguarde.');
}

app.listen(3000);

//5.19
<!DOCTYPE html>
<html>
   <head>
	<title>Programação para Internet</title>
	<meta charset="utf-8" />
   </head>
<body>
	<% const teste = 0; %>
	<p>Apenas um texto</p>
	<%= teste %>
</body>
</html>

//5.20
<!DOCTYPE html>
<html>
   <head>
	<title>Programação para Internet</title>
	<meta charset="utf-8" />
   </head>
<body>
	<% if(exibirDiv) { %>
  	 <div>Apenas uma div</div>
	<% } else { %>
   	<div>Apenas outra div</div>
	<% } %>
</body>
</html>

//5.21
router.get('/', (req, res, next) => {
    res.render('index', { exibirDiv: true });//ou false, você escolhe
 })

 //5.22
 express -e --git crud

 //5.23
cd crud
npm install

//5.24
<!DOCTYPE html>
<html>
  <head>
    <title>CRUD de Clientes</title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
    <meta charset="utf-8" />
  </head>
  <body>
    <h1>Listagem de Clientes</h1>
    <p>Clientes já cadastrados no sistema.</p>
    <table style="width:50%">
      <thead>
        <tr style="background-color: #CCC">
          <td style="width:50%">Nome</td>
          <td style="width:15%">Idade</td>
          <td style="width:15%">UF</td>
          <td>Ações</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="4">Nenhum cliente cadastrado.</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4">
            <a href="/new">Cadastrar Novo</a>
          </td>
        </tr>
      </tfoot>
    </table>
  </body>
</html>

//5.25
<!DOCTYPE html>
<html>
  <head>
    <title>CRUD de Clientes</title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
    <meta charset="utf-8" />
  </head>
  <body>
    <h1><%= title %></h1>
    <p>Preencha os dados abaixo para salvar o cliente.</p>
    <form action="<%= action %>" method="POST">
        <p>
            <label>Nome: <input type="text" name="nome" /></label>
        </p>
        <p>
            <label>Idade: <input type="number" name="idade" /></label>
        </p>
        <p>
            <label>UF: <select name="uf">
                    <option>RS</option>
                    <option>SC</option>
                    <option>PR</option>
                    <!-- coloque os estados que quiser -->
                </select></label>
        </p>
        <p>
            <a href="/">Cancelar</a> | <input type="submit" value="Salvar" />
        </p>
    </form>
  </body>
</html>

//5.26
/* GET new page. */
router.get('/new', (req, res, next) => {
    res.render('new', { title: "Cadastro de Cliente", action: "/new" });
})

//5.27
/* POST new page. */
router.post('/new', (req, res, next) => {
    //futuramente vamos salvar o cliente aqui
    res.redirect('/?new=true');
})

//5.28
npm start