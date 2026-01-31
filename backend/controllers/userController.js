import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// register user (api/users/register)
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
      return  res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { 
        httpOnly: true,     // prevent javascript to access cookie
        secure: process.env.NODE_ENV === 'production',  // send cookie over https only in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',    // cross-site cookie settings
        maxAge: 7 * 24 * 60 * 60 * 1000 // cookie expiration time 7 days
    });
    // const newUser = new User({ name, email, hashedPassword });
    // await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// login user (api/users/login)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'New User!! Kindly register...' });
    }
    const passwordMatch = user ? await bcrypt.compare(password, user.password) : false;
    if (!user || !passwordMatch) {
      return res.status(401).json({ message: 'Invalid Password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { 
        httpOnly: true,     // prevent javascript to access cookie
        secure: process.env.NODE_ENV === 'production',  // send cookie over https only in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',    // cross-site cookie settings
        maxAge: 7 * 24 * 60 * 60 * 1000 // cookie expiration time 7 days
    });
    res.status(200).json({ message: 'Login successful', user: {id: user._id, name: user.name, email: user.email} });
    } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// check auth (/api/users/isAuth)
export const isAuth = async (req, res) => {
  try {
    // const userId = req.body.userId;
    const userId = req.user.id; 
    if (!userId) {
      return res.status(401).json({ message: 'Not Authorized' });
    }
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({success: true, user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// logout user (api/users/logout)
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie('token', { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    res.status(200).json({success: true, message: 'Logout successful' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({success: false, message: 'Server error' });
  }
};