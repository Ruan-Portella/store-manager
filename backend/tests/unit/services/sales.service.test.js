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

    it('Verifica se o retorno da função addProduct no service é o id correto', async function () {
        sinon.stub(models, 'addSaleTime').resolves(6);
        sinon.stub(models, 'addSale').resolves();

        const product = await service.addSale([{ productId: 2, quantity: 2 }]);
        expect(product).to.be.deep.equal({ id: 6, itemsSold: [{ productId: 2, quantity: 2 }] });
    });

    it('Verifica se é possivel deletar o tempo de um produto', async function () {
        sinon.stub(models, 'deleteSaleTime').resolves({ affectedRows: 1 });
        sinon.stub(models, 'deleteSale').resolves({ affectedRows: 1 });
        sinon.stub(models, 'findSalesById').resolves(allSales[0]);
        const result = await service.deleteSale(1);
        expect(result).to.be.deep.equal({ date: '2023-06-28 18:56:05',
        productId: 1,
        quantity: 5,
        saleId: 1 });
    });

    it('Verifica se é possivel editar um produto', async function () {
        sinon.stub(models, 'findSalesById').resolves(allSales[0]);
        sinon.stub(models, 'editSale').resolves(1, 2, 2);

        const result = await service.editSale(1, [{ productId: 2, quantity: 2 }]);
        expect(result).to.be.deep.equal(
            { date: '2023-06-28 18:56:05',
         productId: 1,
         quantity: 5,
         saleId: 1 },
);
    });

    it('Verifica se é possivel editar um produto e retorna um array', async function () {
        sinon.stub(models, 'findSalesById').resolves(allSales);
        sinon.stub(models, 'editSale').resolves(1, 1, 2);

        const result = await service.editSale(1, 1, 2);
        expect(result).to.be.deep.equal(
           { saleId: undefined },
);
    });
});