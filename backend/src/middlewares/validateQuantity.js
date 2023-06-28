const validateSaleQuantity = (req, res, next) => {
    const sale = req.body;

    const validate = sale.map((prod) => prod.quantity).some((quantity) => quantity === undefined);
    const validateNumber = sale.map((prod) => prod.quantity).some((quantity) => quantity <= 0);
    if (validate) return res.status(400).json({ message: '"quantity" is required' });
    if (validateNumber) {
 return res.status(422).json(
        { message: '"quantity" must be greater than or equal to 1' },
); 
}
    next();
};

module.exports = validateSaleQuantity;