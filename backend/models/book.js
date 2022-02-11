import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    author: String, 
    category: String,
    title: String,
    editorial: String,
    pages: Number,
    role:{type: mongoose.Schema.ObjectId, ref:"roles"},
    registerDate:{type: Date, default: Date.now},
    dbStatus:true
})

const book = mongoose.model("books", bookSchema);
export default book;