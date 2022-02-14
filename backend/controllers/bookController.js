import book from "../models/book.js";

const registerBook = async (req, res) => {
  if (!req.body.author || !req.body.category || !req.body.title || !req.body.editorial || !req.body.pages)
    return res.status(400).send({ message: "Imcomplete data" });

  let schema = new book({
    author: req.body.auhtor,
    category: req.body.category,
    title: req.body.title,
    editorial: req.body.editorial,
    pages: req.body.pages,
    dbStatus: true,
  });

  let result = await schema.save();
  if (!result)
    return res.status(500).send({ message: "Failed to register book" });

  res.status(200).send({ result });
};

export default { registerBook };