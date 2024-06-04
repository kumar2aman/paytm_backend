
const mongoose = require('mongoose');

require('dotenv').config()




 mongoose.connect(process.env.MONGO_URL);


const userSchema =  mongoose.Schema( {
    username : "string",
    email: "string",
    password: "string"
})


const accountSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require: true
    },
   balance: {
        type: Number,
        require: true
    }
})

const Account = mongoose.model("Account", accountSchema)
const User = mongoose.model("User", userSchema)

module.exports = {User, Account};