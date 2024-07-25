const router = require("express").Router();
const User=require("../models/User")
const bcrypt = require("bcrypt");

router.post("/register",async(req,res)=>{
   try {
    const salt = await bcrypt.genSalt(10); //used to generate some weird symbols
    const hashedpassword = await bcrypt.hash(req.body.password,salt)//qwerty=kugf79tgkjrY9ba696b9q6 01
    const newUser=await  new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedpassword,
    }).save()
    res.send(newUser)
    
   } catch (error) {
   console.error(error);
    res.status(404).send(error)
   }
})

router.post("/login",async(req,res)=>{
try {
    const user=await User.findOne({email:req.body.email}) // {username:"shanmukh,email:"s@gmail.com,password:97397479twgf865b4""}
   !user && res.status(404).send("user not found")
   const validPassword=await bcrypt.compare(req.body.password,user.password)
   console.log(validPassword)
   !validPassword && res.status(404).send("wrong password")

   res.status(200).send("logged in")
} catch (error) {
    res.status(404).send(error.message)
    
}
})



module.exports=router