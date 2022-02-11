import Mongoose  from "mongoose";

const rolesSchema = new Mongoose({
    name: String,
    description: String,
    registerDate: {type:Date, default: Date.now},
    dbStatus: true
});

const role = Mongoose.model("roles", rolesSchema);
export default role;