const express = require('express');
const tasksController = require('./controllers/tasksController');
const tasksMiddleware = require('./middlewares/tasksMiddlewares');

const router = express.Router();

router.get('/tasks', tasksController.getAll);
router.post('/tasks', tasksMiddleware.validateFieldTitle, tasksController.createTask);
router.post('/upload', tasksMiddleware.upload.single('image'), tasksController.uploadImage);
router.delete('/tasks/:id', tasksController.deleteTask);
router.put('/tasks/:id', 
tasksMiddleware.validateFieldStatus, 
tasksMiddleware.validateFieldTitle, 
tasksController.updateTask,
);

module.exports = router;