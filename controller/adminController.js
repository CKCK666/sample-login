const db=require("../config/connection")
const bcrypt=require("bcrypt")
const { ObjectId } = require('mongodb');
//post login
const adminLogin=async(req,res)=>{
    
    try {
      let {email,password} =req.body
      
      let user= await db.get().collection("cln_admin").findOne({email})
      if(user){
        let result= await bcrypt.compare(password,user.password)
        if(result){
          req.session.loggedIn = true;
          req.session.user = user;
         
          res.json({success:true,message: 'Form submitted successfully!'})
         
        }
        else{
          res.json({success:false,message: 'Invaild email or password!'})
        }
      }
      else{
        res.json({success:false,message: 'Invaild email or password!'})
      }
    } catch (error) {
      console.log(error.message);
      res.json({success:false,message: error.message})
    }
  
    
  }

  //get admin home page
const getAdminHome=async(req,res)=>{
  try {
    let count =await db.get().collection("cln_users").count()
    if(count>0){
      let users=await db.get().collection("cln_users").find().sort({createdDate:-1}).toArray()
    
      res.render("admin/homePage",{users})
    }
    else{
      res.render("admin/homePage")
    }
  } catch (error) {
    console.log(error);
  }
   
    
  }
  
  

  //delete
  const deleteUser=async(req,res)=>{
    console.log(req.params);
    console.log("in delete route");
   try {
    const objectIdToDelete = new ObjectId(req.params.id);
    let user=await db.get().collection("cln_users").deleteOne({_id:objectIdToDelete})
    
    if (user.deletedCount>0) {
      console.log("deleted");
      res.json({success:true,message: 'successfully deleted!'})
    }
    else{
      console.log("not deleted");
      res.json({success:false,message: 'User not deleted internal error!'})
    }
    
   } catch (error) {
    console.log(error.message);
      res.json({success:false,message: error.message})
   }
  }

  const addUser=async(req,res)=>{
    try {
  
     let {username,email,password} =req.body
    
      let emailExist= await db.get().collection("cln_users").findOne({email})
    
      if(!emailExist){
        const hashedPassword= await bcrypt.hash(password, 10)
        let userData={
          username,
          email,
          password:hashedPassword,
          createdDate:new Date(),
          updatedDate:null
        }
        let result =await db.get().collection("cln_users").insertOne(userData)
       
        res.json({success:true,message: 'User added  successfully!'})
       
      }
      else{
        
        res.json({success:false,message: "Email already exists"})
      }
    } catch (error) {
      console.log(error);
      res.json({success:false,message: error.message})
    }
    
  }
  const getAddUser=(req,res)=>{
 
  res.render("admin/addUsers")
   
 }
 //get update user
 const getUpdateUser=async(req,res)=>{
 
 try {
  const objectIdToDelete = new ObjectId(req.params.id);
  let user=await db.get().collection("cln_users").find({_id:objectIdToDelete},{_id:1,username:1,email:1}).toArray()
  if(user && user.length>0){
    let result=user[0]
    res.render("admin/updateUsers",{result})
  }
  else{
    res.redirect("/")
  }
 } catch (error) {
   console.log(error);
 }
 
   
 }

 const updateUser=async(req,res)=>{
  try {
      let userData={}
      let {userId,email,username}=req.body
    
     if(req.body.password.length){
      const hashedPassword= await bcrypt.hash(password, 10)
      userData.password=hashedPassword
     }
     
      const objectIdToUpdate = new ObjectId(userId);
     let emailExist= await db.get().collection("cln_users").findOne({email})
   
     if(!emailExist){
     
        userData={
          ...userData,
         username,
         email,
         updatedDate:new Date()
       }
       let result =await db.get().collection("cln_users").updateOne({_id:objectIdToUpdate},{$set:{...userData}})

       console.log(result);
    
       res.json({success:true,message: 'successfully updated!'})
      
     }
     else{
       
       res.json({success:false,message: "Email already exists"})
     }
   } catch (error) {
     console.log(error);
     res.json({success:false,message: error.message})
   }
 }
  //logout 
const logout=(req,res)=>{
    req.session.destroy();
     res.redirect('/admin');
   }
   
  module.exports={adminLogin,getAdminHome,logout,deleteUser,addUser,getAddUser,getUpdateUser,updateUser}