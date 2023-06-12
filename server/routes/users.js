const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');

// register route
router.post('/', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(409).send({ message: 'User with given email already Exist!' });
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await new User({ ...req.body, password: hashPassword, trainings: [] }).save();
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

//get user info
router.get('/', verifyToken, async (req, res) => {
  try {
    const userData = await getUserData(req.decoded);
    res.json(userData);
  } catch (error) {
    console.log('Error fetching user data: ', error);
    return res.status(500).json({ message: 'Error fetching user data' });
  }
});

async function getUserData(userId) {
  try {
    const user = await User.findOne({ _id: userId });
    return user;
  } catch (error) {
    console.log('Error fetching user data: ', error);
    throw error;
  }
}

module.exports = router;
