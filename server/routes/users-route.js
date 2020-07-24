const express = require('express');
const userRoutes = require('../controllers/users-controller.js');

const router = express.Router();

router.get('/auth', userRoutes.auth);
router.get('', userRoutes.get);
router.post('', userRoutes.create);
router.delete('', userRoutes.delete);
router.put('/reset', userRoutes.reset);

module.exports = router;