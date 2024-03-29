const db = require("../models");
const bcrypt = require("bcryptjs");
const User = db.user;

const checkDuplicateEmailOrCin = (req, res, next) => {
  const { email, nationalId } = req.body;

  // Check for duplicate email
  User.findOne({ email }).exec((emailErr, emailUser) => {
    if (emailErr) {
      return res.status(500).send({ message: emailErr });
    }

    if (emailUser) {
      return res.status(400).send({token:null, message: "Failed! Email is already in use!" });
    }
    const cin=bcrypt.hashSync(nationalId, 8);
    // Check for duplicate Cin
    User.findOne({ nationalId }).exec((cinErr, cinUser) => {
      if (cinErr) {
        return res.status(500).send({ message: cinErr });
      }

      if (cinUser) {
        return res.status(400).send({message: "Failed! NationalId is already in use!" });
      }

      // Call next middleware or route handler if email and Cin are not duplicate
      next();
    });
  });
};
const verifySignUp = {
  checkDuplicateEmailOrCin
};

module.exports = verifySignUp;
