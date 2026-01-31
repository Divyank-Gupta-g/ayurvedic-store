import express from 'express';
import { isAuth, logoutSeller, sellerLogin } from '../controllers/sellerController.js';
import authSeller from '../middleware/authSeller.js';

const sellerRouter = express.Router();

sellerRouter.post('/login', sellerLogin);
sellerRouter.get('/isAuth', authSeller, isAuth);
sellerRouter.get('/logout', logoutSeller);

export default sellerRouter;
