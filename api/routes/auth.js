const router = require("express").Router()
const User = require("../model/User")
const bcrypt = require("bcrypt")
const { default: axios } = require("axios")
const identicon = import("minidenticons")


router.post("/register", async (req,res)=>{
  
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    
    const image = (await identicon).identicon(req.body.username, 100, 50)

    const username = req.body.username.toLowerCase()

    // Create new user
    const newUser = new User({
      username: username,
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPass,
      // profilePicture: image,
      coverPicture: "https://source.unsplash.com/featured/1300x700"
    })

    // save user and respond
    const user = await newUser.save()
    res.status(200).json(user)

  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.post("/login", async (req, res)=> {
  try {

    const user = await User.findOne({email: req.body.email})
    !user && res.status(404).send("user not found")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("wrong password!")

    res.status(200).json(user)
  }
  catch (err) 
  {
    res.status(500).json(err)
  }
})


module.exports = router;