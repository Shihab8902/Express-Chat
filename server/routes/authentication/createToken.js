const { createToken } = require("../../controllers/authentication/createToken");


const router = require("express").Router();



router.post("/jwt", createToken);



module.exports = router;