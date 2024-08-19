const User = require('../models/User');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'firstname', 'surname', 'email'],
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createUser = async (req, res) => {
  const { firstname, surname, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    
    const newUser = await User.create({ firstname, surname, email, password});
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Invalid request' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { firstname, surname, email } = req.body;
    await user.update({ firstname, surname, email });

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Invalid request' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'User Unauthorized' });
    }

    const verifyPass = bcrypt.compareSync(password, user.password);

    if (!verifyPass) {
      return res.status(401).json({ message: 'User Unauthorized' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY_JWT, { expiresIn: '2h' });

    return res.status(200).json({ id: user.id, name: user.firstname + ' ' + user.surname, token });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};
