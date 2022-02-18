import book from "../models/book.js";

const existingBook = async (req, res, next) => {
    if(!req.body.editorial)
    return res.status(400).send({ message: "Incomplete data"});

    const existingEditorial = await book.findOne({editorial: req.body.editorial});
    if(existingEditorial)
    return res.status(400).send({message: "The book already registered"})
    next();
}

export default { existingBook }