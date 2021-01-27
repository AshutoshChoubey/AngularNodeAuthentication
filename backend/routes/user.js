const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const generateToken = require('../JwtToken/generateToken.js')

/**
 * @route POST api/users/register
 * @desc Register the User
 * @access Public
 */
router.post('/register', (req, res) => {
    let {
        name,
        email,
        password,
        password_confirmation
    } = req.body;
    if (password !== password_confirmation) {
        return res.status(400).json({
            msg: "Password do not match."
        });
    }
    if (!email || !password) {
        return res.send('Must include email and password')
    }
    User.findOne({
        email: email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "Email is already registred. Did you forgot your password."
            });
        }
    });
    // The data is valid and new we can register the user
    let newUser = new User({
        name,
        // username,
        password,
        email
    });
    // Hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: "Hurry! User is now registered."
                });
            });
        });
    });
});

/**
 * @route POST api/users/login
 * @desc Signing in the User
 * @access Public
 */
router.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (!user) {
            return res.status(404).json({
                user: user,
                msg: "Username is not found.",
                success: false
            });
        }
        // If there is user we are now going to compare the password
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (isMatch) {
                // User's password is correct and we need to send the JSON Token for that user
                const payload = {
                    _id: user._id,
                    username: user.username,
                    name: user.name,
                    email: user.email
                }
                generateToken(payload,(err, token) => {
                    res.status(200).json({
                        success: true,
                        token: `Bearer ${token}`,
                        user: user,
                        msg: "Hurry! You are now logged in."
                    });
                })
            } else {
                return res.status(404).json({
                    msg: "Incorrect password.",
                    success: false
                });
            }
        })
    });
});

/**
 * @route POST api/users/profile
 * @desc Return the User's Data
 * @access Private
 */
router.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    return res.json({
        user: req.user
    });
});

router.get('/userlist', function (req, res) {
    User.find(function (err, User) {
        if (err) return console.error(err);
        return res.status(200).json({
            success: true,
            msg: "Listed",
            userlist: User
        });
    });
})
router.put('/update', function (req, res) {
    User.findById(req.body._id, function (err, userData) {
        bcrypt.compare(req.body.currentPassword, userData.password).then(isMatch => {
            if (isMatch) {
                if (req.body.password) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                            if (err) throw err;
                            hasedPassword = hash;
                            let condition = { _id: req.body._id };
                            let dataForUpdate = { name: req.body.name, email: req.body.email, password: hasedPassword, updatedDate: new Date() };
                            User.findOneAndUpdate(condition, dataForUpdate, { new: true }, function (err, updatedUser) {
                                if (err) {
                                    if (err.name === 'MongoError' && err.code === 11000) {
                                        res.status(409).send(new MyError('Mongo Db Error ', [err.message]));
                                    }

                                    res.status(500).send(new MyError('Unknown Server Error', ['Unknow server error when updating User']));
                                }
                                if (!updatedUser) {
                                    return res.status(404).json({
                                        msg: "User Not Found.",
                                        success: false
                                    });
                                }
                                return res.status(200).json({
                                    success: true,
                                    msg: "User Successfully Updated",
                                    updatedData: updatedUser
                                });
                            });
                        });
                    });
                }
                else {
                    let condition = { _id: req.body._id };
                    let dataForUpdate = { name: req.body.name, email: req.body.email, updatedDate: new Date() };
                    User.findOneAndUpdate(condition, dataForUpdate, { new: true }, function (err, updatedUser) {
                        if (err) {
                            if (err.name === 'MongoError' && err.code === 11000) {
                              return  res.status(409).send(new MyError('Mongo Db Error ', [err.message]));
                            }

                           return res.status(500).send(new MyError('Unknown Server Error', ['Unknow server error when updating User']));
                        }
                        if (!updatedUser) {
                            return res.status(404).json({
                                msg: "User Not Found.",
                                success: false
                            });
                        }
                        return res.status(200).json({
                            success: true,
                            msg: "User Successfully Updated",
                            updatedData: updatedUser
                        });
                    });
                }
            } else {
                return res.status(401).json({
                    msg: "Incorrect password.",
                    success: false
                });
            }
        })
    });
})

module.exports = router;