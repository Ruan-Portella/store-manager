const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const validateName = require('../../../src/middlewares/validateName');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa a Camada Controller na Rota Product', function () {
    beforeEach(function () {
        sinon.restore();
    });

    it('Verifica se ao passar um nome correto ele chama o next', async function () {
        const req = {
            body: { name: 'Ruan Portella' },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const next = sinon.stub().returns();
        await validateName(req, res, next);

        expect(next).to.have.been.calledWith();
    });

    it('Verifica se ao passar um nome sem nada retorna um erro', async function () {
        const req = {
            body: { name: '' },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const next = sinon.stub().returns();
        await validateName(req, res, next);

        expect(res.status).to.have.been.calledWith(400);
        expect(res.json).to.be.have.been.calledWith({ message: '"name" is required' });
    });

    it('Verifica se ao passar um nome com 4 caracteres retorna um erro', async function () {
        const req = {
            body: { name: 'Ruan' },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const next = sinon.stub().returns();
        await validateName(req, res, next);

        expect(res.status).to.have.been.calledWith(422);
        expect(res.json).to.be.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });
});