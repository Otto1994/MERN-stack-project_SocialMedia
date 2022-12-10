import  express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv" 
import cors from "cors";
import AutoRoute from './Routes/AutoRoute.js'
import UserRoute from './Routes/UserRoute.js'
import postRoute from './Routes/postRoute.js'
import UploadRoute from './Routes/UploadRoute.js'

//routes
const app=express()
dotenv.config()

//midlewares
 app.use(bodyParser.json({limit:'30mb' ,extended:true}))
 app.use(bodyParser.urlencoded({limit:'30mb' ,extended:true}))
 app.use(cors());


 mongoose.connect(process.env.MONGO_DB,
 {
    useNewUrlParser:true,
    useUnifiedTopology:true
 }).then(()=>app.listen(process.env.PORT,()=>console.log('Connected to db'))
 ).catch((error)=>console.log(error))


//to server
app.use(express.static('public')); 
app.use('/images', express.static('images'));

 //post
 app.use('/auth',AutoRoute)
 app.use('/user',UserRoute)
 app.use('/post',postRoute)
 app.use('/upload',UploadRoute)