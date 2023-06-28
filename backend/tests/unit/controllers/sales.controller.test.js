const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const service = require('../../../src/services/sales.service');
const controllers = require('../../../src/controllers/sales.controller');
const { allSales } = require('../mocks/sales.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa a Camada Controller na Rota Sales', function () {
    beforeEach(function () {
        sinon.restore();
    });

    it('Verifica se o retorno da função getAllSales no controller são todos os produtos', async function () { 
        const req = {};
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        sinon.stub(service, 'getAllSales').resolves(allSales);

        await controllers.getAllSales(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.be.have.been.calledWith(allSales);
    });

    it('Verifica se o retorno da função findSalesById no controller é o produto correto', async function () {
        const req = {
            params: { id: 1 },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        sinon.stub(service, 'findSalesById').resolves(allSales[0]);
        await controllers.findSalesById(req, res);
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.be.have.been.calledWith(allSales[0]);
    });

    it('Verifica se o retorno da função findSalesById no controller é null quando não encontra o produto', async function () { 
        const req = {
            params: { id: 1000 },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        sinon.stub(service, 'findSalesById').resolves({ type: 404, message: 'Product not found' });
        await controllers.findSalesById(req, res);
        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.be.have.been.calledWith({ type: 404, message: 'Product not found' });
    });
});