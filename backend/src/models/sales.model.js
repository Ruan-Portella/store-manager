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

module.exports = { getAllSales, findSalesById };