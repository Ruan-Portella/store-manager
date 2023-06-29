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

const editProduct = async (name, id) => {
    const [{ insertId }] = await connection
    .execute('UPDATE products SET name = (?) WHERE id = (?)', [name, id]);
    return insertId;
};

const deleteProduct = async (id) => {
    const [result] = await connection.execute('DELETE FROM products WHERE id = ?', [id]);
    return result;
};

module.exports = { getAllProducts, findProductById, addProduct, editProduct, deleteProduct };