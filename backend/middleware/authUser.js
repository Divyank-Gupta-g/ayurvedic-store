import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded.id){
        // req.body.userId = decoded.id;
        req.user = { id: decoded.id };
    } else {
        return res.status(401).json({ message: 'Not Authorized' });
    }
    // req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authUser;