const express = require("express");
const router = express.Router();
const userController = require("../controllers/allUsercontroller");
const { requireAuth } = require("../middleware/middleware");
const { checkIfUser } = require("../middleware/middleware");
const { check, validationResult } = require("express-validator");

router.get("*", checkIfUser);

router.get("/"
, userController.user_welcome_get
);

router.get("/signout"
, userController.user_signout_get
);

router.post("/login"
, userController.user_login_post
);

router.post("/signup",
  [
    // Validation middleware for email and password fields
    check("email", "Please provide a valid email").isEmail(),
    check(
      "Password",
      "Password must be at least 8 characters with 1 upper case letter and 1 number"
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
  ],
  userController.user_signup_post
);

router.get("/login"
, userController.user_login_get
);

router.get("/signup"
, userController.user_signup_get
);

router.get("/home"
    ,requireAuth,
    userController.user_index_get
);

router.get("/user/add.html"
, requireAuth, 
userController.user_add_get
);

router.get("/edit/:id"
, requireAuth, 
userController.user_edit_get
);

router.get("/user/:id"
    ,requireAuth, 
    userController.user_view_get
);

router.post("/search"
, requireAuth, 
userController.user_search_post
);

router.put("/edit/:id"
, requireAuth, 
userController.user_edit_put
);

router.delete("/delete/:id"
,requireAuth, 
userController.user_delete
);

module.exports = router;
