const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const zod = require("zod")

require('dotenv').config()

const {authMiddleware} = require("../middelware/middleware.js")


const {User, Account} = require("../db.js")



const router = express.Router();

const signupBody = zod.object({
    username: zod.string(),
	email:zod.string().email(),
	password: zod.string()
})





router.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  router.post('/signup',  async (req, res) => {

   const  username=req.body.username
     const      email=req.body.email
     const     password=req.body.password

    const userExist =  await User.findOne({username})
  
    if(userExist){
        return  res.status(411).send({ msg: "user already exists"})
    }
    


      
    
       const dbUser = await User.create({
          username,
          email,
          password
      })

        const userId = dbUser._id
      
        await Account.create({
            userId,
            balance: Math.floor(Math.random()* 50000)
        })

      const token = jwt.sign({userId}, process.env.JWT_SECRET)
       
      return res.json({
          msg:"new user created",
          token: token
      })
  
    })




    router.post('/signin',  async (req, res) => {
        const username = req.body.username
        const password = req.body.password
    
        const userExist =  await User.findOne({username: username, password:password})
    
        if(userExist){
              
             const userId = userExist._id

            const token = jwt.sign({userId}, process.env.JWT_SECRET)
              
            res.json({ msg:`hellooo ${username}`, token:token})
              
        }

        else{
            res.json({
                msg:"wrong username or password"
            })
        }
        
        })


    router.get("/total" ,  async (req, res)=>{
          const user = await User.find({})   
          return res.json({user})
          
    })
  
  
  module.exports = router