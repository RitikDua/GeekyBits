const mongoose=require('mongoose');
const regularExpression=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const {v4}=require('uuid');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"Please provide your name"]
    },
    email:{
        type:String,
        unique:true,
        lower:true,
        required:[true,"Please provide your email"],
        validate:{
            validator:function(val){            
                return regularExpression.test(val);
            }
        }
    },
    profilePic:{
        type:String,
        default:'https://image.flaticon.com/icons/svg/145/145867.svg'
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],        
        select:false
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }],
    profileShortLink:{
        type:String,        
        default:v4
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpire:Date
});
module.exports=mongoose.model('User',userSchema);