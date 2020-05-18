const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config'); 
const jwt = require('jsonwebtoken');
const auth = require("../../middleware/auth"); 

//User Model
const User = require("../../model/User");



//Create New Users
router.post('/', (req, res)=>{
  const { email, password } = req.body;
  if(!email || !password) {
    return res.status(400).json({message: "Please fill up all fields."});
  }
  //check existing user
  User.findOne({email: email})
  .then((user) => {
    if(!user) {
      return res.status(400).json({ message: "User Does Not Exixts" });
    } else {
      bcrypt.compare(password, user.password)
      .then((isMatch) => {
        if(!isMatch) 
          return res.status(400).json({ message: "Invalid Credentials" });
        else 
          jwt.sign(
            { id: user._id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) return res.status(200).json({ message: err });
              else
              return res.status(200).json({
                data: user,
                token: token,
                message: "User Successfully Created",
              });
            }
          );
      })
    }
    
  })
  .catch((err) => {
    return res.status(400).json({ data: err });
  });
})

router.get('/user', auth, (req, res)=> {
  User.findById(req.user.id)
  .select('-password')
  .then(data => {
    return res.status(200).json({data: data});
  })
});

module.exports = router;