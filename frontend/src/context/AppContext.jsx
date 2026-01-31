import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import toast from "react-hot-toast";
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const currency = import.meta.env.VITE_CURRENCY || '$';
    const navigate = useNavigate();
    const [user, setUser] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});

    // fetch seller status
    const fetchSeller = async () => {
        try {
            const { data } = await axios.get('/api/seller/isAuth');
            if (data.message === "Authorized Seller") {
                setIsSeller(true);
            } else {
                setIsSeller(false);
            }
        } catch (error) {
            setIsSeller(false);
        }
    }

    // fetch user auth status, cart data, user data
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/users/isAuth');
            if (data.success) {
                setUser(data.user);
                setCartItems(data.user.cartItems);
            } else {
                setUser(false);
            }
        } catch (error) {
            setUser(false);
        }
    }

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/product/list');
            if(data.success){
                setProducts(data.products);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // const addToCart = (product) => {
    //     setCartItems((prevItems) => {
    //         const existingItem = prevItems.find((item) => item.id === product.id);  
    //         if (existingItem) {
    //             return prevItems.map((item) =>
    //                 item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    //             );
    //         } else {
    //             return [...prevItems, { ...product, quantity: 1 }];
    //         }   
    //     });
    // };

    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Item added to cart");
    };

    // const updateCartItem = (itemId, action) => {
    //     let cartData = structuredClone(cartItems);  
    //     if(action === 'add'){
    //         cartData[itemId] += 1;
    //     } else if(action === 'remove'){
    //         cartData[itemId] -= 1;  
    //         if(cartData[itemId] <= 0){
    //             delete cartData[itemId];
    //         }
    //     }
    //     setCartItems(cartData);
    // };

    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Cart updated");
    };

    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] -= cartData[itemId];
            if(cartData[itemId] <= 0){
                delete cartData[itemId];
            }
        }
        setCartItems(cartData);
        toast.success("Item removed from cart");
    };

    // cart item count
    // const cartItemCount = Object.values(cartItems).reduce((acc, curr) => acc + curr, 0);
    const cartItemCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            totalCount += cartItems[item];
        }
        return totalCount;
    }

    // total cart value
    // const totalCartValue = (products) => {
    //     let totalValue = 0;
    //     for (const item in cartItems) {
    //         const product = products.find((prod) => prod._id === item);
    //         if (product) {
    //             totalValue += product.price * cartItems[item];
    //         }
    //     }
    //     return totalValue;
    // }
    const totalCartValue = () => {
        let totalValue = 0;
        for (const item in cartItems) {
            const itemInfo = products.find((product) => product._id === item);
            if (cartItems[item] > 0) {
                totalValue += itemInfo.offerPrice * cartItems[item];
            }
        }
        return Math.floor(totalValue*100)/100;
    }

    useEffect(() => {
        fetchUser();
        fetchSeller();
        fetchProducts();
    }, []);

    // update cart items
    useEffect(() => {
        if (!user) return;
        const updateCart = async () => {
            try {
                const { data } = await axios.post('/api/cart/update', {cartItems}, { withCredentials: true });
                if(!data.success){
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }

        if(user){
            updateCart();
        }
    }, [cartItems, user])

    const value = {navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, 
        products, currency, addToCart, updateCartItem, removeFromCart, cartItems, searchQuery, 
        setSearchQuery, cartItemCount, setCartItems, totalCartValue, axios, fetchProducts};

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}; 

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
}
