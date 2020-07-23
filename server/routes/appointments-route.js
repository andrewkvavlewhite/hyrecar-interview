const express = require('express');
const appointmentsRoutes = require('./../controllers/appointments-controller.js');

const router = express.Router();

router.get('', appointmentsRoutes.all);
router.post('/create', appointmentsRoutes.create);
router.delete('', appointmentsRoutes.delete);
router.put('/reset', appointmentsRoutes.reset);

module.exports = router;