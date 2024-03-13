const router = require("express").Router()
const User = require('../models/User')
const Post = require('../models/Post')
const bcrypt = require("bcrypt")


//Update

router.put("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id){

        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password,salt)
        }
        try{                                                    // "/:id"
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body } ,
                {new:true})

            res.status(200).json(updatedUser)
            }
        catch(err){
                res.status(500).json(err)
            }
        
    } else {
            console.log("you can update only your account!");
        }
    })
        

//delete
router.delete("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id){
        const user = await User.findById(req.params.id)
        if(user){
            try{         
                await Post.deleteMany({username:user.username})
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("user has been deleted successfully")                                        
               
                }
            catch(err){
                    res.status(500).json(err)
                }
            }
        else {
            res.status(404).json("user not found")
        }
    } else {
            console.log("you can update only your account!");
        }

        
    })

//get

router.get("/:id",async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const{password,...others} = user._doc
        res.status(200).json(others)
    }
    catch(err){
        res.status(404).json("no user found")
    }


})

            

        
        



module.exports = router;




