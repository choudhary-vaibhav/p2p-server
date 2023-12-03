const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

// sign in and sign up
// userRouter.post('/api/signin', userController.signin);

userRouter.post('/api/getLoanDataAll', userController.getLoanDataAll);
userRouter.post('/api/user/create', userController.createUser);

// Loan Related APIs
userRouter.post('/api/loan/create', userController.createLoan);
userRouter.post('/api/loan/approve', userController.approveLoan);

module.exports = userRouter;