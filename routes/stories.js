const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');
const mongoose = require('mongoose');

//Story model import
const Story = mongoose.model('stories');
const User = mongoose.model('users');

//Stories index
router.get('/', (req, res) => {
  Story.find({status:'public'})
  .populate('user')
  .then(stories => {
    res.render('stories/index', {
      stories: stories
    });
  })
});

//Show single Story
router.get('/show/:id', (req, res) => {
  Story.findOne({
    _id: req.params.id
  })
  .populate('user')
  .then(story => {
    res.render('stories/show', { story: story});
  })
})

//Add story form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('stories/add');
});

//Edit story form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Story.findOne({
    _id: req.params.id
  })
  .then(story => {
    res.render('stories/edit', { story: story});
  })
});

//Process add story
router.post('/', (req, res) => {
  let allowComments;
  if(req.body.allowComments){
    allowComments = true;
  }else{
    allowComments = false;
  };

  newStory = {
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments: allowComments,
    user: req.user.id
  }

  //Create story
  new Story(newStory)
  .save()
  .then(story => {
    res.redirect(`/stories/show/${story.id}`);
  });
})

//Process edit story
router.put('/:id', (req, res) => {
  Story.findOne({
    _id: req.params.id
  })
  .then(story => {
    let allowComments;
    
    if(req.body.allowComments){
      allowComments = true;
    } else {
      allowComments = false;
    }

    // New values
    story.title = req.body.title;
    story.body = req.body.body;
    story.status = req.body.status;
    story.allowComments = allowComments;

    story.save()
      .then(story => {
        res.redirect('/dashboard');
      });
  });
});

//Delete Story
router.delete('/:id', (req, res) => {
  Story.remove({
    _id: req.params.id
  })
  .then(() => {
    console.log("Got this far");
    res.redirect('/dashboard');
  })
});

module.exports = router;