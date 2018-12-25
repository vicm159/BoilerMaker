const router = require('express').Router();
const { Users } = require('../db');

// matches GET requests to /auth/me/
router.get('/me', function(req, res, next) {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});

// matches POST requests to /auth/signup/
router.post('/signup', async (req, res, next) => {
  try {
    await Users.create(req.body);
    res.status(201).send('User Created');
  } catch (error) {
    next(error);
  }
});

// mathces PUT requests to /auth/login
router.put('/login', async (req, res, next) => {
  try {
    const inst = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!inst) {
      res.status(401).send('User not found');
    } else if (!inst.correctPassword(req.body.password)) {
      res.status(401).send('Incorrect Password');
    } else {
      req.login(inst, err => {
        if (err) {
          next(err);
        } else {
          res.json(inst);
        }
      });
    }
  } catch (error) {
    next(error);
  }
});

// matches DELETE requests to /auth/logout
router.delete('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(204);
});

router.use('/google', require('./google'));

module.exports = router;
