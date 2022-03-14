import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    editorial: String,
    bookStatus: String,
    user: {type: mongoose.Schema.ObjectId, ref:"users"},
    registerDate: {type:Date, default: Date.now},
});

const book = mongoose.model("books", bookSchema);
export default book;