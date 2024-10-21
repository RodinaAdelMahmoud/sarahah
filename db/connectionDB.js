const { default: mongoose } = require("mongoose");

module.exports.connectionDB=()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/mvc")
    .then(()=>console.log("connected to db"))
    .catch((err)=>console.log("connection error"))
    
}