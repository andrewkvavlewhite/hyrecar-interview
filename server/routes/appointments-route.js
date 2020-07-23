const express = require('express');
const appointmentsRoutes = require('./../controllers/appointments-controller.js');

const router = express.Router();

router.get('/', appointmentsRoutes.booksAll);
router.post('/', appointmentsRoutes.booksCreate);
router.delete('/', appointmentsRoutes.booksDelete);
router.put('/reset', appointmentsRoutes.booksReset);

module.exports = router;