import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodo,
  toggleTodo,
  editTodo,
  deleteTodo,
  Todo,
} from './features/todoSlice'; // Update Todo import with the correct path
import './TodoList.css';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: { todos: Todo[] }) => state.todos);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      dispatch(addTodo({ id: Date.now(), text: newTodo, completed: false }));
      setNewTodo('');
    }
  };

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleEditTodo = (id: number, text: string) => {
    setEditingTodoId(id);
    setNewTodo(text);
  };

  const handleUpdateTodo = () => {
    if (newTodo.trim() !== '') {
      dispatch(editTodo({ id: editingTodoId!, text: newTodo }));
      setEditingTodoId(null);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                marginRight: '10px',
              }}
            >
              {todo.text}
            </span>
            {editingTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                />
                <button onClick={handleUpdateTodo}>Update</button>
              </>
            ) : (
              <>
                <button onClick={() => handleEditTodo(todo.id, todo.text)}>Edit</button>
                <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button onClick={editingTodoId !== null ? handleUpdateTodo : handleAddTodo}>
          {editingTodoId !== null ? 'Update Todo' : 'Add Todo'}
        </button>
      </div>
    </div>
  );
};

// export default TodoList;
