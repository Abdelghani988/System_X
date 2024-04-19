const express = require('express')
const router = express.Router()
const userController=require("../controllers/allUsercontroller")
const authUser= require("../models/authUserSchema")
const bcrypt=require('bcrypt')
const jwt = require("jsonwebtoken");

router.post("/login", async(req,res) => {
    const login_user = await authUser.findOne({email :req.body.email})
    console.log(login_user)
    if(login_user==null){
        console.log("This email not found in DATABASE")
    }else{
        const match = await bcrypt.compare(req.body.password, login_user.Password)
        if(match){
            const token = jwt.sign({ id: login_user._id }, "Super");
            res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
            res.redirect("/home")
            console.log(token)
            console.log("correct email & password")
        }else{
            console.log("wrong password")
        }
        }
});

router.post("/signup",userController.user_signup_post );

router.get("/",userController.user_welcome_get);

router.get("/login",userController.user_login_get);

router.get("/signup",userController.user_signup_get);

router.get("/home", userController.user_index_get);

router.get("/user/add.html",userController.user_add_get);

router.get("/edit/:id", userController.user_edit_get);

router.get("/user/:id",userController.user_view_get);

router.post("/search",userController.user_search_post);

router.put("/edit/:id", userController.user_edit_put);

router.delete("/delete/:id", userController.user_delete);


module.exports = router
