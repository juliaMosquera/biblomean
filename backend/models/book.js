import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    author: String, 
    category: String,
    title: String,
    editorial: String,
    pages: Number,
    user: {type: mongoose.Schema.ObjectId, ref:"users"},
    registerDate: {type:Date, default: Date.now},
    dbStatus: Boolean
});

const book = mongoose.model("books", bookSchema);
export default book;