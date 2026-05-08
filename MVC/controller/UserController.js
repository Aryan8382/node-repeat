const User = require("../model/UserModel");


const add=async(req,res)=>{
  
    const data=await User.create(req.body);
    res.json(data);
}

module.exports={add}