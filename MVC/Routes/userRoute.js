const express=require("express");
const { add } = require("../controller/UserController");

const router=express.Router();

router.post("/add",add)



module.exports=router;