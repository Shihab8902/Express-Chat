const userCollection = require("../../model/user");

const saveUser = async (req, res) => {
    try {
        const user = req.body;

        const isExist = await userCollection.findOne({ email: user.email });

        if (!isExist) {
            const newUser = userCollection(user);
            const result = await newUser.save();
            return res.status(201).send(result);
        }


        res.send(isExist)

    }
    catch (error) {
        console.log(error);
    }
}


module.exports = saveUser;