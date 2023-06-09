const router = require("express").Router()
const Post = require("../model/Post")
const User = require("../model/User")

// create a post
router.post("/", async (req, res)=>{
  const newPost = new Post(req.body)
  try {
    const savedPost = await newPost.save()
    res.status(200).json(savedPost)
  } catch(err) {
    res.status(500).json(err)
    console.log(`ERR: ${err}`)
  }
})
// update a post

router.put("/:id", async (req, res)=>{
  try {

    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) 
    {
      await post.updateOne({$set: req.body})
      res.status(200).json("your post has been updated")
    } else{ 
      res.status(403).json("you can update only your post")
    }
  }
  catch(err) {
    res.status(500).json(err)
  }
})
// delete a post

router.delete("/:id", async (req, res)=>{
  try {
    post = await Post.findById(req.params.id)
    if (post.userId == req.body.userId) {
      await post.deleteOne()
      res.status(200).json("post successfully deleted!")
    }
  } catch(err) {
    res.status(500).json(err)
  }
})

// like a post

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been unliked");
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

// dislike a post

router.put("/:id/dislike", async(req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.dislikes.includes(req.body.userId)) {
      await Post.findByIdAndUpdate(req.params.id, {$push: {dislikes: req.body.userId}})
      res.status(200).json("post disliked :(")
    }
    else {
      await Post.findByIdAndUpdate(req.params.id, {$pull: {dislikes: req.body.userId}})
      res.status(200).json("post undisliked :D")
    }
  }
  catch(err){
    res.status(500).json(err)
  }
})

// get a post

router.get("/:id", async(req, res)=>{

  try {

    const post = await Post.findById(req.params.id)

    res.status(200).json(post)

  } 
  catch (err) {
    res.status(500).json(err)
  }
})

// get timeline posts

router.get("/timeline/:userId", async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts))
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

// get all posts
router.get("/allPosts/all", async (req, res) => {
  try {
    const posts = await Post.find({})
    res.status(200).json(posts)
    
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

// get user posts

router.get("/profile/:username", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const currentUser = await User.findOne({username: req.params.username});
    const userPosts = await Post.find({ userId: currentUser._id });
    res.status(200).json(userPosts);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

module.exports = router