const router = require("express").Router();
const User = require("../models/User")

//profile editing
router.put("/:id",async(req,res)=>{  //localhost:8900/api/users/668feef38a3932e8ba17e942  localhost:8900/api/users/id
    try {
        if(req.body.userId==req.params.id){
           await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            });
            res.send("profile updated")
        }
        
    } catch (error) {
        res.status(500).send(error)
        
    }
})

//deleting an account

router.delete("/:id",async(req,res)=>{  //localhost:8900/api/users/668feef38a3932e8ba17e942  localhost:8900/api/users/id
    try {
        if(req.body.userId==req.params.id){
           
            await User.findByIdAndDelete(req.params.id)
           res.send("account deleted")

        }
        
    } catch (error) {
        res.status(500).send(error)
        
    }
})


//following a user
router.put("/:id/follow",async(req,res)=>{ //localhost:8900/api/users/668feef38a3932e8ba17e942/follow
    try {
        if(req.params.id !== req.body.userId){
            const usertofollow=await User.findById(req.params.id)
            const currentuser=await User.findById(req.body.userId)
            if(!usertofollow.followers.includes(req.body.userId)){
                await usertofollow.updateOne({$push:{followers:req.body.userId}})
                await currentuser.updateOne({$push:{followings:req.params.id}})
                res.send("user followed")


            }
        }
        
    } catch (error) {
        res.status(500).send(error)
        
        
    }
})


router.put("/:id/unfollow",async(req,res)=>{ //localhost:8900/api/users/668feef38a3932e8ba17e942/follow
    try {
        if(req.params.id !== req.body.userId){
            const usertounfollow=await User.findById(req.params.id)
            const currentuser=await User.findById(req.body.userId)
            if(usertounfollow.followers.includes(req.body.userId)){
                await usertounfollow.updateOne({$pull:{followers:req.body.userId}})
                await currentuser.updateOne({$pull:{followings:req.params.id}})
                res.send("user unfollowed")


            }
        }
        
    } catch (error) {
        res.status(500).send(error)
        
        
    }
})





module.exports=router