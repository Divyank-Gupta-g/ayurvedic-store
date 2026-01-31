import jwt from 'jsonwebtoken';

// seller login (/api/seller/login)
export const sellerLogin = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL){
            const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '7d'});
            res.cookie('sellerToken', token, { 
                httpOnly: true,     // prevent javascript to access cookie
                secure: process.env.NODE_ENV === 'production',  // send cookie over https only in production
                // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',    // cross-site cookie settings
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000      // cookie expiration time 7 days
            });
            res.status(200).json({ message: 'Login successful' });
        } else{
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server error' });
    }
}

// check auth (/api/seller/isAuth)
export const isAuth = async (req, res) => {
  try {
    res.status(200).json({ message: 'Authorized Seller' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// logout seller (api/seller/logout)
export const logoutSeller = async (req, res) => {
  try {
    res.clearCookie('sellerToken', { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};