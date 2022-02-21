import book from "../models/book.js";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerBook = async (req, res) => {
  if (!req.body.title || !req.body.author || !req.body.category || !req.body.pages)
    return res.status(400).send({ message: "Imcomplete data" });

   const schema = new book({
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    editorial: req.body.editorial,
    pages: req.body.pages,
    user: req.body.user,
    dbStatus: true,
  });

  let result = await schema.save();
  if (!result)
    return res.status(500).send({ message: "Failed to register book" });

    try {
      return res.status(200).json({
          token: jwt.sign({
              _id: result._id,
              title: result.title,
              user: result.user,
              iat: moment().unix()
          },
          process.env.SK_JWT
          ),
      });
      } catch (e) {
          return res.status(500).send({message: "Register error"});
      }
};

const listBook = async (req, res) => {
  let books = await book.find({$and:[{title: new RegExp(req.params["title"])},{dbStatus: "true"}],})
  .populate("user")
  .exec();
  if(books.length === 0)
  return res.status(400).send({ message: "No search results"})

  return res.status(200).send({ books})
}

const deleteBook = async (req, res) => {
  if(!req.params["_id"]) 
  return res.status(400).send({ message: "Incomplete data"})

  const books = await book.findByIdAndUpdate(req.params["_id"], {dbStatus: false,})

  return !books
  ? res.status(400).send({message: "Error deleting book"})
  : res.status(200).send({ message: "Book deleted"})
};

const updateBook = async (req, res) => {
  if(!req.body._id || !req.body.title || !req.body.author || !req.body.category || !req.body.editorial || !req.body.pages || !req.body.user)
  return res.status(400).send({message: "Incomplete data"})

    const editBook = await book.findByIdAndUpdate(req.body._id, {
        title: req.body.title,
        auhtor: req.body.auhtor,
        category: req.body.category,
        editorial: req.body.editorial,
        pages: req.body.pages,
        user: req.body.user
    })
    if(!editBook) return res.status(500).send({message: "Error editing book"})
    return res.status(200).send({message: "book updated"})
}



export default { registerBook, listBook, deleteBook, updateBook};