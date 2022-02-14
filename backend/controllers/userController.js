import user from "../models/user.js";
import role from "../models/role.js";
import bcrypt from "bcrypt";  // encripta la contraseñas
import jwt from "jsonwebtoken";  //token de ingreso o logeo de usuario y encriptar
import moment from "moment"; // se encarga en temas relacionados con fechas


const registerUser = async(req, res) => {
  if(!req.body.name || !req.body.password || !req.body.email || !req.body.address || !req.body.phone)
  return res.status(400).send({ message: "Incomplete data"});

  const existingUser = await user.findOne({email: req.body.email});
  if(existingUser) return res.status(400).send({message: "The user is already registered"});

    const passHash = await bcrypt.hash(req.body.password, 10);

    const roleId = await role.findOne({name: "user1"})
    if(!roleId) return res.status(500).send({message: "No role was assigned"});
    const userSchema = new user({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      password: passHash,
      role: roleId._id,
      dbStatus: true,
  });

  const result = await userSchema.save();

  if(!result) return res.status(500).send({ message: "Failed to register use"});

  try {  //para generar  un jsonwebtoken se utiliza un try catch
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
export default { registerUser };
