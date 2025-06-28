const express = require('express');
const router = express.Router();
const {
  createCategory,
  getCategories,
  spendFromCategory,
  undoLastTransaction,
  updateCategory,
  resetAllSpent,
  deleteCategory,
  togglePinStatus
} = require('../controllers/categoryController');

const authMiddleware = require('../middleware/authMiddleware');

// Protected Routes
router.post('/', authMiddleware, createCategory);             // Add new category
router.get('/', authMiddleware, getCategories);               // Get all categories
router.post('/:id/spend', authMiddleware, spendFromCategory); // Spend from category
router.post('/:id/undo', authMiddleware, undoLastTransaction); // Undo last transaction
router.put('/:id', authMiddleware, updateCategory); // Edit category
router.post('/reset', authMiddleware, resetAllSpent);

router.delete("/:id", authMiddleware, deleteCategory);
router.patch("/:id/pin", authMiddleware, togglePinStatus);



module.exports = router;



