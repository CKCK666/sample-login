const express = require('express');
const { getAdminHome, adminLogin, logout, deleteUser, addUser, getAddUser, getUpdateUser, updateUser } = require('../controller/adminController');

const { isAdmin } = require('../middlewares/verification');
const router =express.Router()

//get home page
router.get("/",isAdmin,getAdminHome)

//post login
router.post("/login",adminLogin)


//post logout
router.post('/logout',logout)

//delete user
router.delete("/:id",isAdmin,deleteUser)

//get add user page
router.get("/addUsers",isAdmin,getAddUser)

//post add user 
router.post("/addUsers",isAdmin,addUser)

//get update user page

router.get("/updateUsers/:id",isAdmin,getUpdateUser)

//put update user
router.put("/updateUser",isAdmin,updateUser)


module.exports=router