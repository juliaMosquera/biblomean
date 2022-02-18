import book from "../models/book.js";

const registerBook = async (req, res) => {
  if (!req.body.author || !req.body.category || !req.body.editorial || !req.body.pages)
    return res.status(400).send({ message: "Imcomplete data" });

  let schema = new book({
    title: req.body.title,
    author: req.body.auhtor,
    category: req.body.category,
    editorial: req.body.editorial,
    pages: req.body.pages,
    user: req.body.user,
    dbStatus: true,
  });

  let result = await schema.save();
  if (!result)
    return res.status(500).send({ message: "Failed to register book" });

  res.status(200).send({ result });
};

const listBook = async (req, res) => {
  let books = await book.find({ title: new RegExp(req.params["title"])})
  .populate("book")
  .exec();
  if(books.length === 0)
  return res.status(400).send({ message: "No search results"})

  return res.status(200).send({ books})
}

export default { registerBook, listBook };