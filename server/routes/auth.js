const express = require('express');
const router =  express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const UserSchema = require('../models/User');
const passport = require('passport');


const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'thisiscodeformediclapplicationwhich isbuiltinreactappproject';

router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
    },
}));


router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    cb(null, id);
});

// Route 1: Registering A New User: POST: http://localhost:8181/api/auth/register. No Login Required
router.post(
    '/register',
    [
      body('email', 'Please enter a valid email').isEmail().normalizeEmail(),
      body('name', 'Username should be at least 4 characters').isLength({ min: 4 }),
      body('password', 'Password should be at least 8 characters').isLength({ min: 8 }),
      body('phone', 'Phone number must be exactly 10 digits').custom((value) => {
        if (!/^\d{10}$/.test(value)) {
          throw new Error('Phone number must be exactly 10 digits');
        }
        return true;
      }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const { email, name, password, phone } = req.body;
  
        // Check for existing user
        const existingUser = await UserSchema.findOne({ email });
        if (existingUser) {
          return res.status(403).json({ error: 'A user with this email address already exists' });
        }
  
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
  
        // Create new user
        const newUser = await UserSchema.create({
          email,
          name,
          password: hashedPassword,
          phone,
          createdAt: new Date(), // Use Date object for proper storage
        });
  
        // Generate JWT payload with user data
        const payload = {
          user: {
            id: newUser._id, // Use MongoDB _id
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
          },
        };
        const authtoken = jwt.sign(payload, JWT_SECRET);
  
        // Return token and user data
        res.json({ authtoken, name: newUser.name, email: newUser.email, phone: newUser.phone });
      } catch (error) {
        console.error('Registration error:', error.message); // Log specific error
        return res.status(500).json({ error: 'Internal server error. Please try again later.' });
      }
    }
  );

router.post('/login', [
    body('email', "Please Enter a Vaild Email").isEmail(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
      
        const theUser = await UserSchema.findOne({ email: req.body.email }); // <-- Change req.body.username to req.body.name
            // console.log('my',theUser.name);
        // req.session.name=theUser.name
        req.session.email = req.body.email; // <-- Change req.body.username to req.body.name
        console.log(req.session.email);
        // console.log(req.session.name);
        if (theUser) {
            let checkHash = await bcrypt.compare(req.body.password, theUser.password);
            if (checkHash) {
                let payload = {
                    user: {
                        id: theUser.id
                    }
                }
                const authtoken = jwt.sign(payload, JWT_SECRET);
                return res.status(200).json({ authtoken });
            } else {
                return res.status(403).json({ error: "Invalid Credentials" });
            }
        } else {
            return res.status(403).json({ error: "Invalid Credentials" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});


router.put('/update', [
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name } = req.body;

        const existingUser = await UserSchema.findOne({ username: name });
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        existingUser.name = name;
        existingUser.updatedAt = Date();

        const updatedUser = await existingUser.save();

        const payload = {
            user: {
                id: updatedUser.id,
            },
        };

        const authtoken = jwt.sign(payload, JWT_SECRET);
        res.json({ authtoken });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});

// Route 4: Fetch user data based on the email: GET: http://localhost:8181/api/auth/user
router.get('/user', async (req, res) => {
    try {
      const email = req.headers.email; // Extract the email from the request headers

        if (!email) {
            return res.status(400).json({ error: "Email not found in the request headers" });
        }
    
        const user = await UserSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
    
        // Send only the necessary user details to the client
        const userDetails = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    
        res.json(userDetails);
        } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});
router.put('/user', [
    body('name', "Username should be at least 4 characters").isLength({ min: 4 }),
    body('phone', "Phone number should be 10 digits").isLength({ min: 10 }),
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
    
        try {
        const email = req.headers.email; // Extract the email from the request headers
    
        if (!email) {
            return res.status(400).json({ error: "Email not found in the request headers" });
        }
    
        const existingUser = await UserSchema.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }
    
        existingUser.name = req.body.name;
        existingUser.phone = req.body.phone;
        existingUser.updatedAt = Date();
    
        const updatedUser = await existingUser.save();
    
        const payload = {
            user: {
            id: updatedUser.id,
            },
        };
    
        const authtoken = jwt.sign(payload, JWT_SECRET);
        res.json({ authtoken });
        } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
        }
});


module.exports = router;