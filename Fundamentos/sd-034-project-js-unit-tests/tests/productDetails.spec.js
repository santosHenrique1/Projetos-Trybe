const productDetails = require('../src/productDetails');
/*
  A função productDetails recebe duas strings que representam nomes de produtos, e retorna um array contendo dois objetos com os detalhes dos respectivos produtos.

  Parâmetros:
  - Uma string;
  - Uma string;

  Comportamento:
  productDetails('Alcool gel', 'Máscara')

  // Retorna:
  [
    {
      name: 'Alcool gel'
      details: {
        productId: 'Alcool gel123'
      }
    },
    {
      name: 'Máscara'
      details: {
        productId: 'Máscara123'
      }
    }
  ]

  Escreva pelo menos cinco testes para essa função para garantir que a implementação de productDetails está correta.

*/

describe('6 - Implemente os casos de teste para a função `productDetails`', () => {
  it('Verifica se a função `productDetails` tem o comportamento esperado', () => {
    // fail('Teste vazio!');
    // ESCREVA SEUS TESTES ABAIXO:
    // Teste se productDetails é uma função.
    expect (typeof productDetails).toBe('function');
    // Teste se o retorno da função é um array.
    const product = productDetails();
    expect(Array.isArray(product)).toEqual(true);
    // Teste se o array retornado pela função contém dois itens dentro.
    expect(product).toHaveLength(2);
    // Teste se os dois itens dentro do array retornado pela função são objetos.
    const itemUm = product[0];
    const itemDois = product[1];
    expect(typeof itemUm).toBe('object');
    expect(typeof itemDois).toBe('object');

    // Teste se quando passado parâmetros diferentes entre si, os dois objetos também são diferentes entre si.
    const itemTres = 'tereceiro';
    const intemQuatro = 'quarto';
    const resultadoTres = productDetails(itemTres);
    const resultadoQuatro = productDetails(intemQuatro);
    expect(resultadoTres).not.toBe(resultadoQuatro);
    // Teste se os dois productIds terminam com 123.
    const pdItemUm = product[0].details.productId;
    const pdItemDois = product[1].details.productId;
    expect(pdItemUm).toMatch(/123$/);
    expect(pdItemDois).toMatch(/123$/);
  });
});
