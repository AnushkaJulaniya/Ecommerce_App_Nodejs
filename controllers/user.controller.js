
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const UserModel = require("../models/user.model");

dotenv.config();

const register = async (req , res) => {
//    Todo : Write validation for req body


await UserModel.create(req.body);
 
// await UserModel.create({...req.body,password:passwordHash
// });
    res.json({
        success:true,
        message:"Dummy register API"
    })
}

const login = async (req , res) => {

    //Match the email and password stored in db
    //Todo: Wirite the validations
    const user = await UserModel.findOne({email:req.body.email});
    console.log(user);
    if(!user){
        return res
        .status(400)
        .json({
            success : false,
            message: "User registered, please create an account"
        })
   }

   const plainTextPassword = req.body.password;// User input
   const hashedpassword = user.password; //DB stored password

  const isPasswordMatched =  await bcrypt.compare(plainTextPassword, hashedpassword);
console.log(isPasswordMatched);

if(!isPasswordMatched){
    return res.status(400).json({
        success:false,
        message:"Incorrect username or password"
    })
}
//information we want to store in the token 
const jwtData = {
    id: user._id,
    email: user.email
};

const token = jwt.sign(jwtData, process.env.JWT_SECRET_KEY, {
    expiresIn: "2h"
});
res.json({
    success:true,
    message:"Logged in successfully",
    token: token //JWT( JSON web Token)
})
//     res.json({
//         success:true,
//         message:"Dummy login API"
//     })
}

const forgotPassword = async (req , res) => {
    res.json({
        success:true,
        message:"Dummy forgot password API"
    })
}
const resetPassword = async (req , res) => {
    res.json({
        success:true,
        message:"Dummy reset password API"
    })
}

const userController = {
    register,
    login,
    forgotPassword,
    resetPassword
}

module.exports = userController;