const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
require("dotenv").config();


const JWT_SECRET = 'SecretStr!ng'


// ROUTE 1: create a User using POST : "/api/auth/createuser", No login required  
router.post('/createuser', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be atleast of 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    let success = false;

    // If there are errors, return the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // Create a new User
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true
        res.json({ success, authToken })
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error
            return res.status(400).json({ success, error: 'Email already exists' });
        }
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }

})


// ROUTE 2: Authenticate a User using POST : "/api/auth/login", No login required 
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {

    let success = false;

    // If there are errors, return the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success, error: 'Invalid Login credentials' });
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ success, error: 'Invalid Login credentials' });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true
        res.json({ success, authToken })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }

})


// ROUTE 3: Get loggedin User Details using POST : "/api/auth/getuser", Login required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }

})



module.exports = router