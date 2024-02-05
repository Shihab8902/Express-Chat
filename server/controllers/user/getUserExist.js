const userCollection = require("../../model/user");

const getUserExist = async (req, res) => {
    try {
        const email = req.query.email;
        const result = await userCollection.findOne({ email: email });

        if (result) {
            return res.status(200).send(true);
        }

        res.status(200).send(false);

    }
    catch (error) {
        console.log(error);
    }
}


module.exports = getUserExist;