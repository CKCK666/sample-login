const express=require("express")
const path =require("path")
const hbs=require("express-handlebars")
const {connectDb}=require("./config/connection")
const app=express()
const dotenv=require("dotenv")
const  session=require('express-session')
const colors = require('colors')
const userRoutes =require("./routes/userRoutes")
const adminRoutes =require("./routes/adminRoutes")
var logger = require("morgan");
dotenv.config()
connectDb()

app.set("views",path.join(__dirname,"views"))
app.set("view engine","hbs")
app.engine(
    "hbs",
    hbs.engine({
      extname:"hbs",
      defaultLayout:"layout",
      layoutsDir:__dirname+"/views/layout/",
      partialsDir:__dirname+"/views/partials/"
    })
)
// app.use(logger("dev"));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,"public")))
app.use(session({
  secret: 'key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  }
}));



app.use("/",userRoutes)
app.use("/admin",adminRoutes)
const PORT=5000
 


app.listen(PORT,()=>{
  
    console.log("server is running.....".bgGreen)
})
