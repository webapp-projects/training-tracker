const router = require('express').Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const verifyToken = require('../middleware/verifyToken');

// login route
router.post('/', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send({ message: 'Invalid Email or Password' });
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send({ message: 'Invalid Email or Password' });
    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: 'logged in successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// update user info
router.put('/', verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.decoded },
      {
        $set: {
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          // Add other fields you want to update here
        },
      },
      { new: true }
    );
    res.send({ message: 'User info updated', data: updatedUser });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password'),
  });
  return schema.validate(data);
};

module.exports = router;
