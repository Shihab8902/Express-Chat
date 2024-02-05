const refreshToken = require("../../controllers/authentication/refreshToken");

const router = require("express").Router();

router.post("/refreshToken", refreshToken);


module.exports = router;