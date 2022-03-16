import book from "../models/book.js";

const registerBook = async (req, res) => {
  if (!req.body.title || !req.body.author || !req.body.category || !req.body.editorial || !req.body.bookStatus)
    return res.status(400).send({ message: "Imcomplete data" });

   const schema = new book({
    user: req.user._id,
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    editorial: req.body.editorial,
    bookStatus: "NotAvailable",
  });

  const result = await schema.save();
  return !result
    ? res.status(500).send({ message: "Failed to register book" })
    : res.status(200).send({result});
};

const listBook = async (req, res) => {
  let books = await book.find({user: req.user._id});
  return books.length === 0
    ? res.status(400).send({ message: "You have no assigned books" })
    : res.status(200).send({ books });

}

const deleteBook = async (req, res) => {
  const bookDelete = await book.findByIdAndDelete({ _id: req.params["_id"] });
  if (!bookDelete) return res.status(400).send({ message: "Book not found" });

  return res.status(200).send({ message: "Book deleted" });
};

const updateBook = async (req, res) => {
  if (!req.body._id || !req.body.bookStatus)
    return res.status(400).send({ message: "Incomplete data" });

  const bookUpdate = await book.findByIdAndUpdate(req.body._id, {
    bookStatus: req.body.bookStatus,
  });

  return !bookUpdate
    ? res.status(400).send({ message: "Book not found" })
    : res.status(200).send({ message: "Book updated" });
}

export default { registerBook, listBook, deleteBook, updateBook};