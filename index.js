const express=require("express")
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const helmet=require("helmet");
const morgan=require("morgan");
const userRoutes=require("./routes/users.js");
const authRoutes=require("./routes/auth.js");

dotenv.config();

mongoose.connect(process.env.MONGO_URL);

//middlewares
app.use(helmet());
app.use(morgan("common"));
app.use(express.json());


//routes
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);

app.listen(3000,()=>{
console.log("server is running");
});