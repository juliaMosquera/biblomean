import user from "../models/user.js";

const existingUser = async (req, res, next) => {
    const existingEmail = await user.findOne({email: req.body.email});
    return existingEmail
    ? res.status(400).send({message: "The user already registered"})
    : next();
}

const activeStatus = async (req, res, next) => {
    if (req.body.email) {
      const activeUser = await user.findOne({ email: req.body.email });
      return !activeUser.dbStatus
        ? res.status(400).send({ message: 'The user is not active' })
        : next();
    } else if (req.params._id) {
      const activeUser = await user.findById(req.params._id);
      return !activeUser.dbStatus
        ? res.status(400).send({ message: 'The user is not active' })
        : next();
    } else if (req.params.email) {
      const activeUser = await user.findOne({ email: req.params.email });
      return !activeUser.dbStatus
        ? res.status(400).send({ message: 'The user is not active' })
        : next();
    }
  };

export default { existingUser, activeStatus }