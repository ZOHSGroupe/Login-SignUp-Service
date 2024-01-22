const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signin = (req, res) => {
  // Check if required fields are present in the request body
  if (!req.body.idSql || !req.body.email || !req.body.username || !req.body.nationalId || !req.body.password) {
    return res.status(400).send({ message: 'Bad Request: Missing required fields in the request body.' });
  }
  // Encrypt : if i you hqve return a real idSql sended
  const cipher = crypto.createCipher('aes-256-cbc', process.env.SECRET_CRYPTO);
  let idSql = cipher.update(req.body.idSql, 'utf-8', 'hex');
  idSql += cipher.final('hex');
  const user = new User({
    idSql: idSql,
    email: req.body.email,
    username: req.body.username,
    nationalId:bcrypt.hashSync(req.body.nationalId, 8),
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).send({ message: 'Internal Server Error' });
    }
    /*
    // Decrypt
    const decipher = crypto.createDecipher('aes-256-cbc', process.env.SECRET_CRYPTO);
    let idSql = decipher.update(user.idSql, 'hex', 'utf-8');
    idSql += decipher.final('utf-8');
    const token = jwt.sign({ idSql:idSql }, process.env.SECRET_JWT, {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });
    */
    res.status(200).send({
      message: user.username+" enregsterid successsully"
    });
  });
};



exports.signup = (req, res) => {
  // Check if required fields are present in the request body
  if (!req.body.emailOrUsername|| !req.body.password) {
    return res.status(400).send({ message: 'Bad Request: Missing required fields in the request body.' });
  }
  User.findOne({
    $or:[
      {email: req.body.emailOrUsername},
      {username: req.body.emailOrUsername}
    ]
  })
    //.populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message : err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          token: null,
          message: "Invalid Password!"
        });
      }
      // Decrypt
      const decipher = crypto.createDecipher('aes-256-cbc', config.secret);
      let idSql = decipher.update(user.idSql, 'hex', 'utf-8');
      idSql += decipher.final('utf-8');
      const token = jwt.sign({ idSql:idSql },
                              process.env.SECRET_JWT,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });

      res.status(200).send({
        token: token
      });
    });
};

exports.changePassword = (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  // Check if required fields are present in the request body
  if (!email || !oldPassword || !newPassword) {
    return res.status(400).send({ message: 'Bad Request: Missing required fields in the request body.' });
  }

  // Find the user by email
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    // Check if user exists
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    // Verify the old password
    const passwordIsValid = bcrypt.compareSync(oldPassword, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Old Password!" });
    }

    // Update the password with the new one
    user.password = bcrypt.hashSync(newPassword, 8);

    // Save the user with the updated password
    user.save((err, updatedUser) => {
      if (err) {
        console.error('Error:', err);
        return res.status(500).send({ message: 'Internal Server Error' });
      }

      res.status(200).send({ message: "Password changed successfully." });
    });
  });
};