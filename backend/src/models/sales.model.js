const connection = require('./connection');

const getAllSales = async () => {
    const [sales] = await connection.execute(
        `SELECT sales.id AS saleId, 
    prod.product_id AS productId, prod.quantity as quantity, sales.date as date 
    FROM StoreManager.sales AS sales JOIN StoreManager.sales_products AS prod 
    ON sales.id = prod.sale_id 
    ORDER BY sales.id, productId`,
    );
    return sales;
};

const findSalesById = async (id) => {
    const [sales] = await connection.execute(
        `SELECT sales.date AS date, prod.product_id AS productId, prod.quantity as quantity
    FROM StoreManager.sales AS sales
    JOIN StoreManager.sales_products AS prod ON sales.id = prod.sale_id
    WHERE sales.id = ?
    ORDER BY sales.id, productId`,
        [id],
    );
    return sales;
};

const addSaleTime = async () => {
    const [{ insertId }] = await connection
        .execute('INSERT INTO sales (date) VALUES (NOW())');
    return insertId;
};

const addSale = async (saleId, productId, quantity) => {
    const [{ insertId }] = await connection
        .execute(
            'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
            [saleId, productId, quantity],
        );
    return insertId;
};

const deleteSaleTime = async (id) => {
    const [result] = await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
    return result;
};

const deleteSale = async (id) => {
    const [result] = await connection.execute('DELETE FROM sales_products WHERE sale_id = ?', [id]);
    return result;
};

module.exports = { getAllSales, findSalesById, addSaleTime, addSale, deleteSaleTime, deleteSale };