const mongoose = require("mongoose");

// product & its qty
const productShape = {
    productId: {
        type:mongoose.Types.ObjectId,// _id of products collection
        ref:"products",
        required:true 
    },
    qty: {
        type:Number,
        required:true,
        min:1
    }
}
const cartSchema = 
    mongoose.Schema({
products: {
    type: [productShape],
    required: true
    },
    userId:{
       type:mongoose.Types.ObjectId, // _id of users collection
       ref:"users",
        required:true
   }
},{
        timestamps: true
    });

    const CartModel = mongoose.model("carts",cartSchema);
    module.exports = CartModel;



