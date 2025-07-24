const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getDashboardData } = require('../controllers/dashboardController.js');

router.get('/', protect, getDashboardData);

module.exports = router;