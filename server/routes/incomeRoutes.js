const express = require('express');
const User = require('../models/Users');
const Income = require('../models/Income');
;const { protect } = require('../middlewares/authMiddleware.js');

const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} = require('../controllers/incomeControllers');

const router = express.Router();

router.post('/add', protect,addIncome);
router.get('/get', protect,getAllIncome);
router.get('/download',protect, downloadIncomeExcel);
router.delete('/:id',protect, deleteIncome);

module.exports = router;