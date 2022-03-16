import role from "../models/role.js";

const registerRole = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ message: 'Incomplete data' });

  const schema = new role({
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });

  const roles = await schema.save();
  return !roles
    ? res.status(500).send({ message: 'Failed to register role' })
    : res.status(200).send({ roles });
};

const listRole = async (req, res) => {
  const roles = await role.find({
    name: new RegExp(req.params['name']),
  });
  return roles.length == 0
    ? res.status(400).send({ message: 'Empty role list' })
    : res.status(200).send({ roles });

}

const deleteRole = async (req, res) => {
  const deletedRole = await role.findByIdAndUpdate(
    { _id: req.params['_id'] },
    { dbStatus: false }
  );
  return !deletedRole
    ? res.status(400).send({ message: 'Role no found' })
    : res.status(200).send({ message: 'Role deleted' });
};

const updateRole = async (req, res) => {
  if (!req.body.description)
  return res.status(400).send({ message: 'Incomplete data' });

const editedRole = await role.findByIdAndUpdate(req.body._id, {
  description: req.body.description,
});

return !editedRole
  ? res.status(500).send({ message: 'Failed to editing role' })
  : res.status(200).send({ message: 'Role updated' });
};

const getRoleById = async (req, res) => {
  const roleId = await role.findById({ _id: req.params['_id'] });
  return !roleId
    ? res.status(400).send({ message: 'No search results' })
    : res.status(200).send({ roleId });
};


export default { registerRole, listRole, deleteRole, updateRole, getRoleById};
