const router = require("express").Router();
const Post = require("../models/Post")
const User = require("../models/User")

router.post("/",async(req,res)=>{
    try {
        const newPost =await new Post(req.body).save();
        res.send(newPost)
        
    } catch (error) {
        res.send(error.message)
        
    }
})

router.put("/:id",async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
     if(post.userId == req.body.userId){
        await post.updateOne({$set:req.body})
        res.send("Post Updated")
     }
        
    } catch (error) {
        res.send(error.message)
    }
})

router.delete("/:id",async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        if(post.userId == req.body.userId){
         await Post.findByIdAndDelete(req.params.id)
         res.send("Deleted")
        }
    } catch (error) {
        res.send(error.message)
    }
})

//liking a post
router.put("/like/:id",async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}})
            res.send("Liked")
        }else{
         await post.updateOne({$pull:{likes:req.body.userId}})   
        }
        
    } catch (error) {
        res.send(error.message)
        
    }
})

//timeline posts

router.get("/timeline/:id",async(req,res)=>{
    try {
        const currentUser=await User.findById(req.params.id)
       const userPosts=await Post.find({userId:currentUser._id})
       const FriendsPosts= await Promise.all(
        currentUser.followings.map((frnd)=>{ //  ["66a25f89878b38c513f0c59e","66a25f89878b38c513f0c59c"]
            return Post.find({userId:frnd})
        })
       )
       res.json(userPosts.concat(...FriendsPosts))
        
    } catch (error) {
        res.send(error.message)
        
    }

})



module.exports=router