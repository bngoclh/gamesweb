const User = require("../models/users.model");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose');



passport.use(User.createStrategy());
//User.plugin(passportLocalMongoose);





const controller = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  createUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      } else {
        User.register(new User({ username }), password, (err, user) => {
            if (err) {
              return res.status(500).json({ message: err.message });
            }
         
        });
        res.json({ message: "User created successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
/*
  createUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      } else {
        const user = new User({ username, password });
        await user.save();
        res.json({ message: "User created successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      } else {
        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = crypto.pbkdf2Sync(password, salt,  
          1000, 64, `sha512`).toString(`hex`); 
        const user = new User({ username, salt, hash: hashedPassword });
        await user.save();
        res.json({ message: "User created successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
*/
  updateUser: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, req.body);
      res.json({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  /*
    loadUser: async (req, res, next) => {
        try {
            const user = new User(req.body);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            req.user = user;
            next();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    checkUser: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username, password });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User exists' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
*/
/*
  checkUserExistence: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username, password });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User exists" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
*/

/*
verifyUser: async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const hash = crypto.pbkdf2Sync(password, user.salt,  
        1000, 64, `sha512`).toString(`hex`); 
      if (user.hash !== hash) {
        return res.status(401).json({ message: "Invalid password" });
      } else {
        res.json({ message: "User authenticated successfully" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},

verifyUser: async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      // passport-local-mongoose provides the authenticate method on the User model
      User.authenticate()(username, password, (err, result) => {
        if (err || !result) {
          return res.status(401).json({ message: "Invalid username/password" });
        } else {
          return res.json({ message: "User authenticated successfully" });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},

*/
verifyUser: async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      // passport-local-mongoose provides the authenticate method on the User model
      User.authenticate()(username, password, (err, result) => {
        if (err || !result) {
          return res.status(401).json({ message: "Invalid username/password" });
        } 
      });
      return res.json({ message: "User authenticated successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},




};

module.exports = controller;
