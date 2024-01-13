const mongoose=require("mongoose")
const userScchema=mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
},{
    timestamp:true
})

const User=mongoose.model("User",userScchema)

module.exports=User