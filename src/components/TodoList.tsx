import React from 'react';
import { Square, Trash2, Undo2, PenLine } from 'lucide-react';
import { TodoItem } from '../hooks';

interface TodoListProps {
  activeTodos: TodoItem[];
  completedTodos: TodoItem[];
  deleteTodo: (todoId: string) => void;
  editTodo: (todoId: string) => void;
  selectedTodo: TodoItem | null;
  setSelectedTodo: (todo: TodoItem | null) => void;
  separatorClass: string;
  toggleTodo: (todoId: string) => void;
  updateTodo: () => void;
}

const TodoList: React.FC<TodoListProps> = ({
  activeTodos,
  completedTodos,
  deleteTodo,
  editTodo,
  selectedTodo,
  setSelectedTodo,
  separatorClass,
  toggleTodo,
  updateTodo,
}) => {
  return (
    <>
      <ul>
        {activeTodos.map((todo, index) => (
          <li key={index} className="flex justify-between p-2 border rounded bg-white mt-2">
            <button className="p-1" onClick={() => toggleTodo(todo.id)}>
              <Square size={20} className='sm:hover:rotate-90 sm:hover:scale-125 sm:mx-1 duration-200' />
            </button>

            <div className="text-start grow p-1 text-xl sm:text-2xl break-all">
              {selectedTodo && selectedTodo.id === todo.id ? (
                <input
                  type="text"
                  value={selectedTodo.task}
                  onChange={(event) => setSelectedTodo({ ...selectedTodo, task: event.target.value })}
                  className="p-0 m-0 border-1 focus:ring-0 w-full text-xl sm:text-2xl break-all"
                  placeholder="Add a todo"
                  onBlur={() => updateTodo()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      updateTodo();
                    }
                  }}
                />
              ) : (
                <span onClick={() => editTodo(todo.id)} className="w-full">
                  {todo.task}
                </span>
              )}
            </div>

            <button type="button" onClick={() => editTodo(todo.id)} className="text-sm text-slate-500 p-1">
            <PenLine size={22} strokeWidth={3} className="sm:hover:transform sm:hover:scale-125 sm:mx-1 duration-200 mx-auto" />
            </button>
            <button type="button" onClick={() => deleteTodo(todo.id)} className="text-sm text-red-600 p-1">
              <Trash2 size={22} strokeWidth={3} className="sm:hover:transform sm:hover:scale-125 sm:mx-1 duration-200 mx-auto" />
            </button>
          </li>
        ))}
      </ul>

      <hr className={separatorClass} />

      <ul>
        {completedTodos.map((todo, index) => (
          <li key={index} className="flex justify-between p-2 border rounded bg-slate-300 mt-2">
            <button className="p-1 bg-slate-300" onClick={() => toggleTodo(todo.id)}>
              <Undo2 size={14} strokeWidth={3} className="sm:rotate-45 sm:hover:rotate-0 sm:hover:scale-125 sm:mx-1 duration-200 mx-auto" />
            </button>

            <span className="text-start grow p-1 text-slate-500 line-through text-xl sm:text-2xl break-all">{todo.task}</span>

            <button type="button" onClick={() => deleteTodo(todo.id)} className="text-sm text-red-600 p-1">
              <Trash2 size={22} strokeWidth={3} className="sm:hover:transform sm:hover:scale-125 sm:mx-1 duration-200 mx-auto" />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
