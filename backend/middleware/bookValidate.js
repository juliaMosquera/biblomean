import book from "../models/book.js";

const existingBook = async (req, res, next) => {
    if(!req.body.title)
    return res.status(400).send({ message: "Incomplete data"});

    const existingTitle = await book.findOne({book: req.body.title});
    if(existingTitle)
    return res.status(400).send({message: "The book already registered"})
    next();
}

export default { existingBook }