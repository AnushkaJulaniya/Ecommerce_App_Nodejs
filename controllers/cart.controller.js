const CartModel = require("../models/cart.model");

/**
 * {
 * _id: asdfasdfsd
 * products: [{productId:123, qty:3}, {productId: 456, qty:1}],
 * userId:asdfasdfsd
 * }
 * {
 * _id:asdfasd, products;[], userId: asdf}
 */


const addToCart = async(req , res) => {
    //Todo: Validate req.body

    /**
     * 1.Check if the user's cart already exists
     * 1.1 If yes, then append the product to products array in document
     * 1.2 If not, proceed to step 2
     * 1.3 If the product already exists in cart, then increase/decrease the qty is 1 procees to step 1.4
     * 1.4 Pull the item from the array using js or $pull
     * 2. Create a new cart document for the user
     */

   const cart = await CartModel.findOne({
        // userId:"6857636381fd72affad3f86c"
          userId : req.user._id
        
    })

// console.log("USER =>", req.user);
    if(!cart){
        // Create new cart
       
/**
 * Cart Schema => {
 * _id:asdfasdfasdf,
 * products: [ {productId: 123, qty:3}, {productId:456,qty:1}],
 * userId:asdfasdfsd
 * }
 * REQ BODY => {
 * "qty:"5",
 * "productId":"6854e32bd4b4fa845f27d8c8"
 * }
 */
   const cartData = {
       products: [
        {
            productId:req.body.productId,
            qty:req.body.qty
        }
       ],
       userId:req.user._id
   };
await CartModel.create(cartData);
    } else{
        //Update existing cart => $push the item to the products array
        //Find out if the product is already available in cart
        // const productExists = cart.products.some(product => product.productId == req.body.productId);
        const indexOfProduct = cart.products.findIndex(product => product.productId == req.body.productId);
      //  if(){} else{}
        if( indexOfProduct > -1 ){
           cart.products[indexOfProduct].qty = cart.products[indexOfProduct].qty + req.body.qty;
        }else{
          cart.products.push({
            productId: req.body.productId,
            qty:req.body.qty
          })

//         await CartModel.findByIdAndUpdate(cart._id,{
//           $push: {
//             products: {
//               productId: req.body.productId,
//               qty: req.body.qty
// ,            }
//           }
        // });
    }
           await cart.save();
  }
    console.log("CART =>",cart);

    // await CartModel.create(req.body);
  res.json({
    success:true,
    message:"Cart updated successfully"
  })
}


const getCart = async (req, res)=> {
  const cart = await CartModel.findOne({
    userId: req.user._id
  })
  .populate("userId")
  // .populate("products.productId");
  res.json({
    success:true,
    message:"User cart ApI",
    data:cart
  })
}
const cartController = {
    addToCart,
    getCart
}

module.exports = cartController;