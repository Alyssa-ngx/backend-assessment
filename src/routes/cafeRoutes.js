const express = require('express');
const cafeController = require('../controllers/cafeController');

const router = express.Router();

router.get('/', cafeController.getCafes);
router.post('/', cafeController.createCafe);
router.put('/:id', cafeController.updateCafe);
router.delete('/:id', cafeController.deleteCafe);

module.exports = router;
