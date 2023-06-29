const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');
const models = require('../../../src/models/products.model');
const { allProducts } = require('../mocks/products.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa a Camada Model na Rota Product', function () {
    beforeEach(function () {
        sinon.restore();
    });

    it('Verifica se o retorno da função getAllProducts no model são todos os produtos', async function () { 
        sinon.stub(connection, 'execute').resolves([allProducts]);
        const products = await models.getAllProducts();
        expect(products).to.be.deep.equal(allProducts);
    });

    it('Verifica se o retorno da função findProductById no model é o produto correto', async function () { 
        sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);
        const product = await models.findProductById(1);
        expect(product).to.be.deep.equal(allProducts[0]);
    });

    it('Verifica se o retorno da função findProductById no model é null quando não encontra o produto', async function () { 
        sinon.stub(connection, 'execute').resolves([[null]]);
        const product = await models.findProductById(1000);
        expect(product).to.be.deep.equal(null);
    });

    it('Verifica se o retorno da função addProduct no model é o id correto', async function () {
        sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
        const product = await models.addProduct('Produto Teste');
        expect(product).to.be.deep.equal(4);
    });

    it('Verifica se é possível deletar um produto', async function () {
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
        const product = await models.deleteProduct(1);
        expect(product).to.be.deep.equal({ affectedRows: 1 });
    });
});