const ProductModel = require("../models/product.model");

// const listProducts = async (req,res)=>{
//     res.json({
//         success:true,
//         message:"Dummy product list API"
//     })
// };
const listProducts = async (req, res) =>{
    
    const searchKey = req.query.searchKey || "";
     //  console.log(searchkey);
    const pageSize = req.query.pageSize || 5;
    const pageNo = req.query.pageNo || 1 ;
    const itemsToSkip = (pageNo - 1) * pageSize;
    
    const findQuery =  {
        
    $or: [
            {
                title: {
                  $regex: searchKey, 
                  $options: "i"
                 }
              },
            {
             description:{
                 $regex: searchKey, 
                 $options: "i"
            }
        }

     ] 
 }
   

const totalItems = await ProductModel.find(findQuery).countDocuments();
const products = await ProductModel
 .find(findQuery)
 .skip(itemsToSkip)//No. of items to skip
 .limit(pageSize); // No. of items to show

        res.json({
            success: true,
            message: "Products List API",
            totalItems: totalItems,
            results: products
        })
    }


    const createProducts = async (req, res) => {
        //Todo: validate all fields
       const product = await ProductModel.create(req.body);
       console.log(product)
        res.json({
            success:true,
            message:"Create product API",
            productId:product._id
        })
    }
const productController = {
    listProducts,
    createProducts
}
module.exports = productController;
