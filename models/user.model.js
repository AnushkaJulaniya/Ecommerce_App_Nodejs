const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobNo:{
        type:String,
        required:true,
    },
       password:{
        type:String,
        required:true,
    },
    address:{
        addressLine1:{
        type:String,
        required:true,
        },
        addressLine2:{
            type:String,
            required:false,
            default:""
        },
    landmark:{
        type:String,
        required:false,
        default:"",
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    pincode:{
        type:String,
        required:true,
    }
    }
},
{
    timestamps:true,
})


//DB Pre save hook
userSchema.pre("save",async function(){

    // req.body / The parameter passed to create() method  == this here
    //    Convert pass into hash

// Generate salt =. To increase the complexity of the hash

    const salt = await bcrypt.genSalt(10);//10 ise range of complexity 
console.log(salt);//Random sequence of alphanumeric character

//generate hash of password
const passwordHash = await bcrypt.hash(this.password, salt);
console.log(passwordHash);//salt + hash

// pre save function(is a middleware) runs :-
//req => controller => Model(Pre save fn) => DB
this.password = passwordHash;

})


const userModel = mongoose.model("users",userSchema);

module.exports = userModel;