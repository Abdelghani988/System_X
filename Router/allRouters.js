const express = require('express')
const router = express.Router()
const userController=require("../controllers/allUsercontroller")
const authUser= require("../models/authUserSchema")
const bcrypt=require('bcrypt')
const jwt = require("jsonwebtoken");


const requireAuth=(req,res,next) => {
    console.log("before run the function")
    token = req.cookies.jwt
    if (token) {
        jwt.verify(token, "Super",(error) => {
            if(error){
                res.redirect("/login")
            }else{
                next()
            }
        });
    } else {
        res.redirect("/login")
    }
};
router.post("/login", userController.user_login_post);

router.post("/signup", userController.user_signup_post );

router.get("/", userController.user_welcome_get);

router.get("/login",userController.user_login_get);

router.get("/signup",userController.user_signup_get);

router.get("/home", requireAuth,userController.user_index_get);

router.get("/user/add.html", requireAuth,userController.user_add_get);

router.get("/edit/:id", requireAuth, userController.user_edit_get);

router.get("/user/:id", requireAuth,userController.user_view_get);

router.post("/search", requireAuth,userController.user_search_post);

router.put("/edit/:id", requireAuth, userController.user_edit_put);

router.delete("/delete/:id", requireAuth, userController.user_delete);


module.exports =router 
