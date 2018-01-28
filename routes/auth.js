const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', 
{scope: ['profile', 'email']}));

router.get('/google/callback',
passport.authenticate('google', {failureRedirect: '/'}),(req, res) => {
  //Successful authentication, redirect to dashboard
  res.redirect('/dashboard');
});

router.get('/verify', (req, res) => {
  if(req.user){
    console.log(req.user);
  }else{
    console.log('Not auth')
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
passport.authenticate('facebook', {failureRedirect: '/'}),(req, res) => {
  //Successful authentication, redirect to dashboard
  res.redirect('/dashboard');
});

module.exports = router;