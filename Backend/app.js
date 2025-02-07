const dotenv = require("dotenv")
dotenv.config();
const express = require("express")
const app = express();
const connectDb = require("./config/dbConnecton");
connectDb();
const cookieParser = require("cookie-parser")
const userRoute = require("./routes/userRoutes")
const productRoute = require("./routes/productRoutes");
const path = require("path")
const cors = require("cors")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get("/", (req,res)=>{
    res.send("hi")
    

} )

app.use("/user", userRoute);
app.use("/products", productRoute)


app.listen(3000,()=>{
    console.log(`Server is Running on Port ${3000}`)
   

});