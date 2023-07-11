const { getAllTodos, createTodo, updateTodoById, deleteTodo } = require("../controllers/todo")

const router = require("express").Router();
const middleware = require('../helpers/middleware');

router.get('/todos', middleware.auth, getAllTodos);
router.post("/todo/new", middleware.auth, createTodo);
router.put("/todo/complete/:id", middleware.auth, updateTodoById);
router.delete('/todo/delete/:id', middleware.auth, deleteTodo);

module.exports = router