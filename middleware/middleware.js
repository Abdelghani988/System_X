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



module.exports = requireAuth

