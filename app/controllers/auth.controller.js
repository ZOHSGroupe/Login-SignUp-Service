const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Check if required fields are present in the request body
  if (!req.body.id_sql || !req.body.email || !req.body.role || !req.body.cin || !req.body.password) {
    return res.status(400).send({ message: 'Bad Request: Missing required fields in the request body.' });
  }
  // Encrypt : if i you hqve return a real id_sql sended
  const cipher = crypto.createCipher('aes-256-cbc', process.env.SECRET_CRYPTO);
  let id_sql = cipher.update(req.body.id_sql, 'utf-8', 'hex');
  id_sql += cipher.final('hex');
  const user = new User({
    id_sql: id_sql,
    email: req.body.email,
    role: req.body.role,
    cin:bcrypt.hashSync(req.body.cin, 8),
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).send({ message: 'Internal Server Error' });
    }
    // Decrypt
    const decipher = crypto.createDecipher('aes-256-cbc', process.env.SECRET_CRYPTO);
    let id_sql = decipher.update(user.id_sql, 'hex', 'utf-8');
    id_sql += decipher.final('utf-8');
    const token = jwt.sign({ id_sql:id_sql }, process.env.SECRET_JWT, {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      token: token
    });
  });
};



exports.signin = (req, res) => {
  // Check if required fields are present in the request body
  if (!req.body.email|| !req.body.password) {
    return res.status(400).send({ message: 'Bad Request: Missing required fields in the request body.' });
  }
  User.findOne({
    email: req.body.email
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
      let id_sql = decipher.update(user.id_sql, 'hex', 'utf-8');
      id_sql += decipher.final('utf-8');
      const token = jwt.sign({ id_sql:id_sql },
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
