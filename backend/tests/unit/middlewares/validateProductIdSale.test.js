const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const validateProductId = require('../../../src/middlewares/validateProductIdSale');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa a Camada Controller na Rota Product', function () {
    beforeEach(function () {
        sinon.restore();
    });

    it('Verifica se ao passar um nome correto ele chama o next', async function () {
        const req = {
            params: { productId: 1 },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const next = sinon.stub().returns();
        await validateProductId(req, res, next);

        expect(next).to.have.been.calledWith();
    });

    it('Verifica se ao passar um id que não exite retorna um erro', async function () {
        const req = {
            params: { productId: 1000 },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const next = sinon.stub().returns();
        await validateProductId(req, res, next);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.be.have.been.calledWith({ message: 'Product not found in sale' });
    });
});