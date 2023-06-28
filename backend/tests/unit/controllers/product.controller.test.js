const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const service = require('../../../src/services/products.service');
const controllers = require('../../../src/controllers/products.controller');
const { allProducts } = require('../mocks/products.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa a Camada Controller', function () {
    beforeEach(function () {
        sinon.restore();
    });

    it('Verifica se o retorno da função getAllProducts no controller são todos os produtos', async function () { 
        const req = {};
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        sinon.stub(service, 'getAllProducts').resolves(allProducts);

        await controllers.getAllProducts(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.be.have.been.calledWith(allProducts);
    });

    it('Verifica se o retorno da função findProductById no controller é o produto correto', async function () {
        const req = {
            params: { id: 1 },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        sinon.stub(service, 'findProductById').resolves(allProducts[0]);
        await controllers.findProductById(req, res);
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.be.have.been.calledWith(allProducts[0]);
    });

    it('Verifica se o retorno da função findProductById no controller é null quando não encontra o produto', async function () { 
        const req = {
            params: { id: 1000 },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        sinon.stub(service, 'findProductById').resolves({ type: 404, message: 'Product not found' });
        await controllers.findProductById(req, res);
        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.be.have.been.calledWith({ type: 404, message: 'Product not found' });
    });
});