const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');
const models = require('../../../src/models/sales.model');
const { allSales } = require('../mocks/sales.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa a Camada Model na rota Sales', function () {
    beforeEach(function () {
        sinon.restore();
    });

    it('Verifica se o retorno da função getAllSales no model são todos os produtos', async function () { 
        sinon.stub(connection, 'execute').resolves([allSales]);
        const products = await models.getAllSales();
        expect(products).to.be.deep.equal(allSales);
    });

    it('Verifica se o retorno da função findSalesById no model é o produto correto', async function () { 
        sinon.stub(connection, 'execute').resolves([allSales[0]]);
        const product = await models.findSalesById(1);
        expect(product).to.be.deep.equal(allSales[0]);
    });

    it('Verifica se o retorno da função findSalesById no model é null quando não encontra o produto', async function () { 
        sinon.stub(connection, 'execute').resolves([null]);
        const product = await models.findSalesById(1000);
        expect(product).to.be.deep.equal(null);
    });
});