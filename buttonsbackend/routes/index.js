var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Button = mongoose.model('Button');
let User = mongoose.model('User');

let jwt = require('express-jwt');
let auth = jwt({ secret: process.env.BACKEND_SECRET, userProperty: 'payload' });

//get all public buttons 
router.get('/API/buttons/', function (req, res, next) {
  Button.find(function (err, buttons) {
    if (err) { console.log(err); return next(err); }
    let filteredButtons = buttons.filter(button => button.publicButton);
    res.json(filteredButtons);
  });
});

//parameter to find buttons of user 
router.param('userButtons', function (req, res, next, id) {
  let query = User.findById(id);
  query.exec(function (err, user) {
    if (err) { return next(err); }
    if (!user) { return next(new Error('not found ' + id)); }
    req.buttons = user.buttons;
    return next();
  });
});

//parameter to find user 
router.param('user', function (req, res, next, id) {
  let query = User.findById(id);
  query.exec(function (err, user) {
    if (err) { return next(err); }
    if (!user) { return next(new Error('not found ' + id)); }
    req.user = user;
    return next();
  });
});

//request to get userButtons 
router.get('/API/buttons/:userButtons/buttons', auth, function (req, res) {
  Button.find(function (err, buttons) {
    if (err) { console.log(err); return next(err); }
    let filteredButtons = buttons.filter(buttonObject => buttonInList(req.buttons, buttonObject.id));
    res.json(filteredButtons);
  });
});

function buttonInList(reqButtons, buttonObject) {
  for (var i = 0; i < reqButtons.length; i++) {
    if (reqButtons[i].toString() === buttonObject) {
      return true;
    }
  }
  return false;
}

//parameter to find a button 
router.param('button', function (req, res, next, id) {
  let query = Button.findById(id);
  query.exec(function (err, button) {
    if (err) { return next(err); }
    if (!button) { return next(new Error('not found ' + id)); }
    req.button = button;
    return next();
  });
});

//post request to post a button 
router.post('/API/buttons/:user',
  function (req, res, next) {
    let button = new Button(req.body);

    button.save(function (err, button) {
      if (err) return next(err);
      req.user.buttons.push(button);
      req.user.save(function (err, rec) {
        if (err) return next(err);
        res.json(button);
      })
    });
  });

//edit button 
router.put('/API/buttons/:user/:button', auth, function (req, res, next) {

  let buttonid = req.params.button;
  if (!buttonInList(req.user.buttons, buttonid)) {
    console.log("ERRRORR");
    return next(new Error("Unauthorized"));
  }

  let button = new Button(req.body);
  Button.findByIdAndUpdate(req.params.button, button, function (err, button) {
    if (err) {
      next(err);
    }
    res.send(button);
  });
});

//request to delete a button 
router.delete('/API/buttons/:user/:button', auth, function (req, res, next) {
  req.button.remove(function (err) {
    if (err) { return next(err); }
    res.json(req.button);
  });
});

router.get('/API/buttons/:user/:button', auth, function (req, res, next) {
  let buttonid = req.params.button;
  if (!buttonInList(req.user.buttons, buttonid)) {
    console.log("ERRRORR");
    return next(new Error("Unauthorized"));
  }

  res.json(req.button);
});

router.delete('/API/buttons/:user/:button', auth, function (req, res, next) {
  let buttonid = req.params.button;
  if (!buttonInList(req.user.buttons, buttonid)) {
    console.log("ERRRORR");
    return next(new Error("Unauthorized"));
  }
  
  req.button.remove(function (err) {
    if (err) { return next(err); }
    res.json(req.button);
  });
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
