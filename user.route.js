const User = require("./user.model")
const express = require("express")

const routes = express.Router()

routes.post('/register', async (req, res)=>{
    try {
        
        const username = req.body.name
        const email = req.body.email
        const password = req.body.password

        const user = await User.findOne({ email: email })

        if(user){
            res.status(500).json({"message": "User already exists exists"})
            return
        }

        const newUser = new User({
            name: username,
            email:email,
            password:password
        })

        await newUser.save()

        return res.json(newUser)
    } catch (error) {
        res.status(500).json({message:"Some error occured"})
    }
})

routes.post("/login", async (req, res)=>{
    try {

        const email = req.body.email
        const password = req.body.password

        const user = await User.findOne({email:email})

        if(!user){
            res.status(500).json({"message":"User does not exists"})
            return
        }

        if( user.password !== password ){
            res.status(500).json({"message":"Username or password is wrong"})
            return
        }

        res.json(user)
    } catch (error) {
        res.status(500).json({message:"Some error occured"})
    }
})

routes.post('/comment/:id', async( req, res ) =>{
    try {

        const user = await User.findById(req.params.id);

        if( !user ){
            res.status(500).json({ message: 'User does not exits'});
            return;
        }
        
        const comment = req.body.comment;
        user.review.push(comment);

        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({message:"Some error occured"})
    }
})


module.exports = routes