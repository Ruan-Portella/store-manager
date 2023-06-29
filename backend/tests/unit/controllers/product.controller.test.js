const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const service = require('../../../src/services/products.service');
const controllers = require('../../../src/controllers/products.controller');
const { allProducts } = require('../mocks/products.mock');

const { expect } = chai;
chai.use(sinonChai);

const notFound = { message: 'Product not found' };

describe('Testa a Camada Controller na Rota Product', function () {
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
        expect(res.json).to.be.have.been.calledWith({ type: 404, ...notFound });
    });

    it('Verifica se o retorno da função addProduct no controller é o id correto', async function () {
        const req = {
            body: { name: 'Produto' },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        sinon.stub(service, 'addProduct').resolves(4);
        await controllers.addProduct(req, res);
        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.be.have.been.calledWith(4);
    });

    it('Verifica se é possível editar um produto', async function () {
        const req = {
            params: { id: 1 },
            body: { name: 'Produto' },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        sinon.stub(service, 'editProduct').resolves({ id: 1, name: 'Produto' });
        await controllers.editProduct(req, res);
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.be.have.been.calledWith({ id: 1, name: 'Produto' });
    });

    it('Verifica se não é possível editar um produto', async function () {
        const req = {
            params: { id: '10' },
            body: { name: 'Produto Teste' },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        sinon.stub(service, 'editProduct').resolves({ notFound });
        await controllers.editProduct(req, res);
        expect(res.json).to.be.have.been.calledWith({ notFound });
    });

    it('Verifica se é possível excluir um produto', async function () {
        const req = {
            params: { id: 1 },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        sinon.stub(service, 'deleteProduct').resolves({ affectedRows: 1 });
        await controllers.deleteProduct(req, res);
        expect(res.status).to.have.been.calledWith(204);
        expect(res.json).to.be.have.been.calledWith({ affectedRows: 1 });
    });

    it('Verifica se não é possivel excluir um produto inexistente', async function () {
        const req = {
            name: 'Produto Teste',
            params: { id: 100000 },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        sinon.stub(service, 'deleteProduct').resolves({ message: 'Product not found' });
        await controllers.deleteProduct(req, res);
        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.be.have.been.calledWith({ ...notFound });
    });
});