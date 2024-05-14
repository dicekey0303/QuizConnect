const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', questionController.getQuestions);
router.get('/:id', questionController.getQuestionById);
router.post('/', questionController.createQuestion);
router.put('/:id', questionController.updateQuestion);
router.delete('/:id', questionController.deleteQuestion);
router.get('/role', authMiddleware, questionController.getQuestionsByRole);
router.get('/category/:categoryId', questionController.getQuestionsByCategoryId);

module.exports = router;