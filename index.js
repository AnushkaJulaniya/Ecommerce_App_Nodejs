const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authMiddleware = require("./middlewares/auth");
const userRoutes = require("./routes/user.route");
const productRoutes = require("./routes/product.route");


const app = express();


dotenv.config();


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended : true }))
app.use(authMiddleware);

//DB Connection
// app.use((req,res,next) => {
    // if(req.query.token !== "asdf89a7s9dfa9sd"){
    //     res.status(400).json({
    //         success:false,
            // message:"Please pass token in the API"
        // })
        // return;
    // }
    // next();
// }
// )


mongoose
.connect(process.env.DB_URL)
.then(()=>console.log(`DB connected successfully`))
.catch(err => console.log(`DB connection Error, ${err}`))

//middleware route
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/product",productRoutes);



const portNo =  process.env.PORT_NO || 8080;

app.listen(portNo, () => console.log(`Server is up and running at port ${portNo}`));