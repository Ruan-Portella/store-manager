const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const validateQuantity = require('../../../src/middlewares/validateQuantity');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa a Camada Controller na Rota Product', function () {
    beforeEach(function () {
        sinon.restore();
    });

    it('Verifica se ao passar um nome correto ele chama o next', async function () {
        const req = {
            body: [{ quantity: 10 }, { quantity: 20 }],
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const next = sinon.stub().returns();
        await validateQuantity(req, res, next);

        expect(next).to.have.been.calledWith();
    });

    it('Verifica se ao passar um nome sem nada retorna um erro', async function () {
        const req = {
            body: [{ quantity: undefined }],
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const next = sinon.stub().returns();
        await validateQuantity(req, res, next);

        expect(res.status).to.have.been.calledWith(400);
        expect(res.json).to.be.have.been.calledWith({ message: '"quantity" is required' });
    });

    it('Verifica se ao passar um nome com 4 caracteres retorna um erro', async function () {
        const req = {
            body: [{ quantity: 10 }, { quantity: 0 }],
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const next = sinon.stub().returns();
        await validateQuantity(req, res, next);

        expect(res.status).to.have.been.calledWith(422);
        expect(res.json).to.be.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });
});