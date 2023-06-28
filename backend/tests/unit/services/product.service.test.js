const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const service = require('../../../src/services/products.service');
const models = require('../../../src/models/products.model');
const { allProducts } = require('../mocks/products.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa a Camada Service', function () {
    beforeEach(function () {
        sinon.restore();
    });

    it('Verifica se o retorno da função getAllProducts no service são todos os produtos', async function () { 
        sinon.stub(models, 'getAllProducts').resolves(allProducts);
        const products = await service.getAllProducts();
        expect(products).to.be.deep.equal(allProducts);
    });

    it('Verifica se o retorno da função findProductById no service é o produto correto', async function () {
        sinon.stub(models, 'findProductById').resolves(allProducts[0]);
        const product = await service.findProductById(1);
        expect(product).to.be.deep.equal(allProducts[0]);
    });

    it('Verifica se o retorno da função findProductById no service gera uma mensagem quando não encontra o produto', async function () { 
        sinon.stub(models, 'findProductById').resolves(false);
        const product = await service.findProductById(1000);
        expect(product).to.be.deep.equal({ message: 'Product not found' });
    });
});