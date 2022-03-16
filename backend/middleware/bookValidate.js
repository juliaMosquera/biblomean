import book from "../models/book.js";
import user from "../models/user.js";

const existingBook = async (req, res, next) => {
    if(!req.body.editorial)
    return res.status(400).send({ message: "Incomplete data"});

    const existingEditorial = await book.findOne({editorial: req.body.editorial});
    if(existingEditorial)
    return res.status(400).send({message: "The book already registered"})
    next();
}

const idUser = async (req, res, next) =>{
    const userId = await user.findOne({_id: req.user._id})
    if(!userId) return res.status(500).send({message: "No user was assigned"})

    next();
}

export default { existingBook, idUser }