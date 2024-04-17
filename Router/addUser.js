const express = require('express')
const router = express.Router()
const userController=require("../controllers/allUsercontroller")



router.post("/user/add.html", userController.user_add_post);

module.exports = router;
