const router = require('express').Router();
const userRoutes = require('./users.js');
const thoughtRoutes = require('./thoughts.js');

router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;
