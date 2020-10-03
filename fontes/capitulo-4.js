//4.1
const http = require('http');

//4.2
const server = http.createServer((req, res) => {
    //cada requisição recebida dispara este callback
})

//4.3
const server = http.createServer((req, res) => {
    //res é um objeto http.ServerResponse
})

//4.4
response.statusCode = 500;
response.statusMessage = 'Internal Server Error';

//4.5
const http = require('http');
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Olá Mundo!\n');
})
server.listen(port, () => {
  console.log(`Servidor iniciou em http://localhost:${port}/`);
})

//4.6
const https = require('https');
const options = {
  hostname: 'www.google.com.br',
  port: 443,
  path: '/about/',
  method: 'GET'
}
const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);
  res.on('data', (d) => {
    process.stdout.write(d);
  })
})
req.on('error', (error) => {
  console.error(error);
})
req.end();

//4.7
const https = require('https');
const data = JSON.stringify({
  exemplo: 'valor'
})
const options = {
  hostname: 'requestbin.fullcontact.com',
  port: 443,
  path: '/14dbyg71',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}
const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);
  res.on('data', (d) => {
    process.stdout.write(d);
  })
})
req.on('error', (error) => {
  console.error(error);
})
req.write(data);
req.end();

