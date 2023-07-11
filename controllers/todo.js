const Todo = require('../models/Todo');

module.exports = {
  getAllTodos: async (req, res) => {
    const todos = await Todo.find()
    return res.status(200).send(todos)
  },
  createTodo: async (req, res) => {
    let newTask = req.body
    const todo = new Todo({
      title: newTask.title,
      content: newTask.content,
      isCompleted: newTask.isCompleted
    })

    todo.save();
    return res.json(todo);
  },
  updateTodoById: async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    console.log(todo);

    todo.isCompleted = !todo.isCompleted
    await todo.save();
    res
      .status(200)
      .json({
        'success': 'successfully updated task status',
        'data': todo
      })
  },
  deleteTodo: async (req, res) => {
    try {
      const idToDelete = req.params.id;
      const deletedItem = await Todo.findByIdAndDelete(idToDelete);
      if (!deletedItem) {
        // throw "No item found with that ID";
        return res.status(404).send({
          "message": `Could not find an item with the given ID ${idToDelete}`
        });
      }
      else {
        return res
          .status(200)
          .json({
            'msg': 'Successfully Deleted Item',
            'data': deletedItem
          })
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }
}