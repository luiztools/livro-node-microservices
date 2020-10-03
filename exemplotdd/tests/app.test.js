//app.test.js
const test = require('tape');
const supertest = require('supertest');
const app = require('../app');

test('GET /aplicarDesconto/10/5', (t) => {
    supertest(app)
      .get('/aplicarDesconto/10/5')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        t.error(err, 'Sem erros');
        t.assert(res.body.valorDescontado === 5, "Desconto correto");
        t.end() ; 
      })
})