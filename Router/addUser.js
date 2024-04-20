const express = require('express')
const router = express.Router()
const userController=require("../controllers/allUsercontroller")




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
router.post("/user/add.html", requireAuth, userController.user_add_post);

module.exports = router;
