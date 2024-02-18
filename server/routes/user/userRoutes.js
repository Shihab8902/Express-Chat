const getUserExist = require("../../controllers/user/getUserExist");
const saveUser = require("../../controllers/user/saveUser");
const updateUser = require("../../controllers/user/updateUser");
const verifyToken = require('../../middlewares/verifyToken');

const router = require("express").Router();

//Get user existence
router.get("/user/exist", getUserExist);

//Save a new user
router.post("/user", saveUser);

//Update a user
router.put("/user", verifyToken, updateUser);



module.exports = router;