import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    address: String,
    phone: String,
    role: {type: mongoose.Schema.ObjectId, ref: "roles"},
    registerDate: {type:Date, default: Date.now},
    dbStatus: Boolean
});

const user = mongoose.model("users", userSchema);
export default user;