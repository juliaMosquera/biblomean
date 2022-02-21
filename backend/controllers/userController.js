import user from "../models/user.js";
import bcrypt from "bcrypt";  // encripta la contraseñas
import jwt from "jsonwebtoken";  //token de ingreso o logeo de usuario y encriptar
import moment from "moment"; // se encarga en temas relacionados con fechas


const registerUser = async(req, res) => {
  if(!req.body.name || !req.body.email || !req.body.address || !req.body.phone)
  return res.status(400).send({ message: "Incomplete data"});

  const passHash = await bcrypt.hash(req.body.password, 10);

    const userSchema = new user({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      password: passHash,
      role: req.body.role,
      dbStatus: true,
  });

  const result = await userSchema.save();

  if(!result) return res.status(500).send({ message: "Failed to register use"});

  try {
    return res.status(200).json({
        token: jwt.sign({
            _id: result._id,
            name: result.name,
            role: result.role,
            iat: moment().unix()
        },
        process.env.SK_JWT
        ),
    });
  } catch (e) {
      return res.status(500).send({message: "Register error"});
  }
};

const listUser = async (req, res)=>{
  let users = await user.find({$and: [{ name: new RegExp(req.params["name"])}, {dbStatus: "true"}],})
  .populate("role")
  .exec();

  if(users.length === 0)
  return res.status(400).send({ message: "No search results"})
  return res.status(200).send({ users})

}

const listAdmin = async (req, res)=>{
  let users = await user.find({ name: new RegExp(req.params["name"])})
  .populate("role")
  .exec();

  if(users.length === 0)
  return res.status(400).send({ message: "No search results"})
  return res.status(200).send({ users})

}

const login = async (req, res) => {
  const userLogin = await user.findOne({email: req.body.email});
  if(!userLogin) return res.status(400).send({message: "Wrong email or password"})

  if(!userLogin.dbStatus) return res.status(400).send({ message: "user no found"})

const passHash = await bcrypt.compare(req.body.password, userLogin.password)
if(!passHash) return res.status(400).send({message: "Wrong email or password"})

try {
  return res.status(200).json({
      token: jwt.sign({
          _id: userLogin._id,
          name: userLogin.name,
          role: userLogin.role,
          iat: moment().unix()
      },
      process.env.SK_JWT
      ),
  });
} catch (e) {
    return res.status(500).send({message: "Login error"});
}

}

const deleteUser = async (req, res) =>{
  if(!req.params["_id"])
  return res.status(400).send({message: "Incomplete data"})

  const users = await user.findByIdAndUpdate(req.params["_id"], {dbStatus: false,})

  return !users
  ? res.status(400).send({message: "Error deleting user"})
  : res.status(200).send({message: "User deleted"})
}

const updateUserAdmin = async (req, res) => {
  if(!req.body._id || !req.body.name || !req.body.role || !req.body.email || !req.body.address || !req.body.phone)
    return res.status(400).send({message: "Incomplete data"})

  let pass = "";

  if (!req.body.password) {
    const findUser = await user.findOne({email: req.body.email})
    pass = findUser.password
  } else {
    pass = await bcrypt.hash(req.body.password, 10)
  }
  const editUser = await user.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    password: pass,
    address: req.body.address,
    phone: req.body.phone,
    role: req.body.role
  })
  if(!editUser) return res.status(500).send({message: "Error editing user"})
    return res.status(200).send({message: "user updated"})
}

export default { registerUser, listUser, login,deleteUser, listAdmin, updateUserAdmin};
