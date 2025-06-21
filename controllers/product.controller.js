const listProducts = async (req,res)=>{
    res.json({
        success:true,
        message:"Dummy product list API"
    })
};

const productController = {
    listProducts
}
module.exports = productController;
