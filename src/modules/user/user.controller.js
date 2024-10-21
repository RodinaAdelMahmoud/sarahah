const messageModel = require("../../../db/models/message.model.js")
const userModel  = require("../../../db/models/user.model.js")
module.exports.index=(req,res,next)=>{
    res.render('index.ejs',{
        loggedIn: false

    })
}
module.exports.login=(req,res,next)=>{
    const {error}= req.query
    res.render('login.ejs',{error
        ,
        loggedIn: false
    })

}
module.exports.register=(req,res,next)=>{
    res.render('register.ejs',{ 
        error: req.query.error,   
             loggedIn: false

    })
   
}
module.exports.message= async(req,res,next)=>{
const messages = await messageModel.find({userId: req.session.userId})
const url = `${req.protocol}://${req.headers.host}/user/${req.session.userId}`
    if(req.session.loggedIn){
        res.render('message.ejs',{
            loggedIn: req.session.loggedIn, session: req.session, messages,url
        })
    }else{
        res.redirect("/login")
    }
}
module.exports.user=(req,res,next)=>{
    res.render('user.ejs',{loggedIn: req.session.loggedIn , session: req.session})
}

module.exports.handleRegister= async(req,res,next)=>{
const {name,email,password}=req.body
const userExists = await userModel.findOne({email})
if(userExists){
    return res.redirect("/register?error=User already exists")
}

await  userModel.create({name,email,password})
res.redirect("/login")
}

module.exports.handleLogin= async(req,res,next)=>{
const {email,password}=req.body
const userExists = await userModel.findOne({email})
if(!userExists ||password !== userExists.password){
    return res.redirect("/login?error=User not exists or invalid ")
}


req.session.userId = userExists._id
req.session.name = userExists.name
req.session.loggedIn = true

res.redirect("/message")
}
module.exports.logOut= async(req,res,next)=>{
    req.session.destroy(function (err) {
        res.redirect("/login")
    })
}
module.exports.sendMsg= async(req,res,next)=>{
  await messageModel.create({userId: req.params.id, content: req.body.msg})
  res.redirect(`/user/${req.params.id}`)
}


