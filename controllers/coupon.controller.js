const CouponModel = require("../models/coupon.model")
// const cron = require("node-cron");


// const expireCoupon = async() => {
//     console.log("expire call")
//     try {
//         const result = await CouponModel.updateMany({
//             endDate: {
//                 $lt: new Date()
//             }
//         }, {
//             $set: {
//                 isActive: false
//             }
//         })
//     }
//     catch(err){
//         console.error(err)
//     }
// }

// cron.schedule("* * * * * *", expireCoupon);

const createCoupon = async(req , res) => {
    //Todo : Write your Validations here
    await CouponModel.create(req.body);
   res.json({
    success:true,
    message:"coupon  created api"
   })
}
const listCoupons = async(req, res) => {
    const coupons = await CouponModel.find(); // Todo: Add pagination
    res.json({
        success: true,
        message:"Coupon list",
        data: coupons
    })
}
const couponController = {
    createCoupon,
    listCoupons
}

module.exports = couponController;