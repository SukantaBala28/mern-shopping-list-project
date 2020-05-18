const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config'); 
const jwt = require('jsonwebtoken'); 

//User Model
const User = require("../../model/User");

//Get All Users
router.get('/', (req, res)=>{
  res.send('register');
  // User.find()
  // .sort({date: -1})
  // .then(data => {
  //     return res.status(200).json({data: data});
  // })
})

//Create New Users
router.post('/', (req, res)=>{
  const { name, email, password } = req.body;
  if(!name || !email || !password) {
    return res.status(400).json({message: "Please fill up all fields."});
  }
  //check existing user
  User.findOne({email: email})
  .then((user) => {
    if(user) {
      return res.status(400).json({ message: "Mail Already Exixts" });
    } else {
      let hashedPassword = bcrypt.hashSync(password, 8);
      const user = User();
      user.name = name;
      user.email = email;
      user.password = hashedPassword;
      user.save().then((data) => {
        jwt.sign({ id: user._id }, config.get("jwtSecret"), {expiresIn: 3600}, (err, token)=> {
          if(err) 
            return res.status(200).json({ message: err });
          else
            return res.status(200).json({ data: data, token: token, message: "User Successfully Created" });
        });
        
      })
      .catch((err) => {
        return res.status(400).json({ data: err });
      })
    }
    
  })
  .catch((err) => {
    return res.status(400).json({ data: err });
  });
})


module.exports = router;