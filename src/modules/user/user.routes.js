const {Router} = require('express')
const { index, login,register, message, user,handleRegister, handleLogin, logOut, sendMsg } = require('./user.controller.js')
const userRouter = Router()

userRouter.get('/',index)
userRouter.get('/login',login)
userRouter.get('/register',register)
userRouter.get('/message',message)
userRouter.get('/user/:id',user)
userRouter.post('/handleRegister',handleRegister)
userRouter.post('/handleLogin',handleLogin)
userRouter.get('/logOut',logOut)

userRouter.post('/sendMsg/:id',sendMsg)



module.exports = userRouter