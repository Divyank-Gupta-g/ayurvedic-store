import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import { connectDB } from './configs/db.js';
import dotenv from 'dotenv';
import connectCloudinary from './configs/cloudinary.js';
import { stripeWebhooks } from './controllers/orderController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const allowedOrigins = ['http://localhost:5173'];

await connectDB();
await connectCloudinary();

app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins, 
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.options(/.*/, cors());

app.get('/', (req, res) => {
  res.send('Hello from the Ayurvedic Store backend!');
});

// Routes
import userRouter from './routes/userRoute.js';
app.use('/api/users', userRouter);

// sellerRoutes
import sellerRouter from './routes/sellerRoute.js';
app.use('/api/seller', sellerRouter);

// productRoutes
import productRouter from './routes/productRoute.js';
app.use('/api/product', productRouter);

// cart route
import cartRouter from './routes/cartRoute.js';
app.use('/api/cart', cartRouter)

// address route
import addressRouter from './routes/addressRoute.js';
app.use('/api/address', addressRouter)

// order route
import orderRouter from './routes/orderRoute.js';
import { stripeWebhooks } from './controllers/orderController.js';
app.use('/api/order', orderRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});