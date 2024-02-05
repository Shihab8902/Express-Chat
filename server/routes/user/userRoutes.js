const getUserExist = require("../../controllers/user/getUserExist");
const saveUser = require("../../controllers/user/saveUser");

const router = require("express").Router();

//Get user existence
router.get("/user/exist", getUserExist);

//Save a new user
router.post("/user", saveUser);



module.exports = router;