const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
        unique: true,
        required: true,
      },
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
        require:true,
    }
  
},{
    timestamps:true
})


const User=mongoose.model("User",userSchema);
module.exports=User;