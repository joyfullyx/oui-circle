const router = require('express').Router();
const userRoutes = require('./userRoutes');
const cardRoutes = require('./cardRoutes');
const categoryRoutes = require('./categoryRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/categories', categoryRoutes);
router.use('/comments', commentRoutes);

module.exports = router;