//index.test.js
const index = require('./index')
test('Aplicar desconto', () => {
    const result = index.aplicarDesconto(10,5);
    expect(result).toEqual(5);
})

test('Aplicar desconto grande', () => {
    const result = index.aplicarDesconto(5,10);
    expect(result).toEqual(0);
})