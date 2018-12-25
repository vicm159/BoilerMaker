const router = require('express').Router();
const { Users } = require('../db/');

// matches PUT requests to /api/users/:userId
router.put('/:userId', function(req, res, next) {
  /* etc */
});

module.exports = router;
