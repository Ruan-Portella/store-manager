const connection = require('./connection');

const getAllProducts = async () => { 
    const [products] = await connection.execute('SELECT * FROM products');
    return products;
};

const findProductById = async (id) => {
    const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
    return product[0];
};

const addProduct = async (name) => {
    const [{ insertId }] = await connection
    .execute('INSERT INTO products (name) VALUES (?)', [name]);
    return insertId;
};

module.exports = { getAllProducts, findProductById, addProduct };