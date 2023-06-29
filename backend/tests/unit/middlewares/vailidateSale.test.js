const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesModel = require('../../../src/models/sales.model');
const validateSale = require('../../../src/middlewares/validateSale');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa o middleware validateSale', function () {
    beforeEach(function () {
        sinon.restore();
    });

    it('Verifica se ao passar um nome correto ele chama o next', async function () {
        sinon.stub(salesModel, 'findSalesById').resolves('1');
        const req = {
            params: { saleId: 1 },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const next = sinon.stub().returns();
        await validateSale(req, res, next);

        expect(next).to.have.been.calledWith();
    });

    it('Verifica se ao passar um id que não exite retorna um erro', async function () {
        const req = {
            params: { saleId: 1000 },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const next = sinon.stub().returns();
        await validateSale(req, res, next);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.be.have.been.calledWith({ message: 'Sale not found' });
    });
});