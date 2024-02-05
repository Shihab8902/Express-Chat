const saveUser = require("../../controllers/user/saveUser");

const router = require("express").Router();

router.post("/user", saveUser);

module.exports = router;