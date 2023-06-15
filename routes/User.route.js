const express = require('express');
const userRouter = express.Router()
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const { UserModel } = require("../model/User.model")
userRouter.post("/register", async (req, res) => {
    try {
        const { password } = req.body;
        bcrypt.hash(password, 5, async function (err, hash) {
            // Store hash in your password DB.
            const user = await new UserModel({ ...req.body, password: hash })
            user.save()
            res.status(200).send({ "msg": "Registartion successfull" })
        });
    } catch (error) {
        res.status(404).send({ "msg": error.message })
    }
})
userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {

                    var token = jwt.sign({user}, 'blog');

                    res.status(200).send({ "msg": "Login successfull", token, user })
                } else {

                    res.status(200).send({ "msg": "Wrong password" })
                }
            });
        } else {
            res.status(200).send({ "msg": "Invalid email" })
        }
    } catch (error) {
        res.status(404).send({ "msg": error.message })
    }

})
module.exports = { userRouter }