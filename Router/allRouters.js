const express = require('express')
const router = express.Router()
const userController=require("../controllers/allUsercontroller")

router.get("/user/add.html",userController.user_add_get);

router.get("/edit/:id", userController.user_edit_get);

router.get("/", userController.user_index_get);

router.get("/user/:id",userController.user_view_get);

router.post("/search",userController.user_search_post);

router.put("/edit/:id", userController.user_edit_put);

router.delete("/delete/:id", userController.user_delete);


module.exports = router