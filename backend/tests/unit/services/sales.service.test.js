const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const service = require('../../../src/services/sales.service');
const models = require('../../../src/models/sales.model');
const { allSales } = require('../mocks/sales.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa a Camada Service na Rota Sales', function () {
    beforeEach(function () {
        sinon.restore();
    });

    it('Verifica se o retorno da função getAllSales no service são todos os produtos', async function () { 
        sinon.stub(models, 'getAllSales').resolves(allSales);
        const products = await service.getAllSales();
        expect(products).to.be.deep.equal(allSales);
    });

    it('Verifica se o retorno da função findSalesById no service é o produto correto', async function () {
        sinon.stub(models, 'findSalesById').resolves(allSales[0]);
        const product = await service.findSalesById(1);
        expect(product).to.be.deep.equal(allSales[0]);
    });

    it('Verifica se o retorno da função findSalesById no service gera uma mensagem quando não encontra o produto', async function () { 
        sinon.stub(models, 'findSalesById').resolves([]);
        const product = await service.findSalesById(1000);
        expect(product).to.be.deep.equal({ message: 'Sale not found' });
    });
});