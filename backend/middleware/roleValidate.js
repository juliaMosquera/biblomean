import role from "../models/role.js";

const existingRole = async (req, res, next) =>{
    const getRole = await role.findOne({name: req.body.name})
    return !getRole
     ? res.status(400).send({message: "The role already exist"})
    :next();
}
const doNotChanges = async (req, res, next) => {
    const changes = await role.findOne({
      name: req.body.name,
      description: req.body.description,
    });
    return changes
      ? res.status(400).send({ message: "No changes were made" })
      : next();
  };

const getRoleUser = async (req, res, next) =>{
    const roleId = await role.findOne({name: "user"})
    if(!roleId) return res.status(500).send({message: "error assigning role"})

    req.body.role = roleId._id;
    next();
}

export default { existingRole, getRoleUser, doNotChanges };