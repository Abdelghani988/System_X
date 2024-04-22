const express = require("express");
const router = express.Router();
const userController = require("../controllers/allUsercontroller");
const requireAuth = require("../middleware/middleware");
const authUser = require("../models/authUserSchema");
const jwt = require("jsonwebtoken");



const checkIfUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        //login user
        jwt.verify(token, "Super", async(error,decoded) => {
            if(error){
            res.locals.user=null
            next();
            } else {
            const loginUser=  await authUser.findById(decoded.id)
            res.locals.user= loginUser
            next();
            }
        });
    } else{
        res.locals.user =null;
        next();
    }
};
router.get("*",checkIfUser)

router.get("/",    
userController.user_welcome_get
);

router.post("/login",
userController.user_login_post
);

router.post("/signup",
userController.user_signup_post
);

router.get("/login", 
userController.user_login_get
);

router.get("/signup", 
userController.user_signup_get
);

router.get("/home",
    requireAuth,
    userController.user_index_get
);

router.get("/user/add.html",
    requireAuth,
    userController.user_add_get
);

router.get("/edit/:id",
    requireAuth, 
    userController.user_edit_get
);

router.get("/user/:id",
    requireAuth,
    userController.user_view_get
);

router.post("/search",
    requireAuth,
    userController.user_search_post
);

router.put("/edit/:id", 
    requireAuth, 
    userController.user_edit_put
);

router.delete("/delete/:id",
    requireAuth,
    userController.user_delete
);

module.exports = router;
