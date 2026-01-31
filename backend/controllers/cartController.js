import User from "../models/User.js";


// update userCart data (/api/cart/update)
export const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;   // ✅ from token
    const { cartItems } = req.body;

    await User.findByIdAndUpdate(userId, { cartItems });

    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};
