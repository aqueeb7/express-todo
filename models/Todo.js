const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: {
    type: String,
    default: 'Note'
  },
  content: {
    type: String,
    require: true,
  },
  isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() }
})

const Todo = mongoose.model("Todo", TodoSchema)

module.exports = Todo