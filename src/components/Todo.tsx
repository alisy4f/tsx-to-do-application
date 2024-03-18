// Todo.tsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import useTodoLogic from '../hooks';
import TodoList from './TodoList';

const Todo: React.FC = () => {
  const {
    todos,
    selectedTodo,
    addTodo,
    toggleTodo,
    editTodo,
    updateTodo,
    deleteTodo,
    setSelectedTodo,
  } = useTodoLogic();
  const [task, setTask] = useState<string>('');

  const activeTodos = todos.filter((todo) => !todo.completed).reverse();
  const completedTodos = todos.filter((todo) => todo.completed);

  const stats = `${completedTodos.length}/${todos.length}`;
  const separatorClass = completedTodos.length > 0 ? 'my-3 border-white' : 'hidden';

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addTodo(task);
    setTask('');
  };

  return (
    <>
      <h1 className="sm:text-3xl text-2xl font-bold mb-2 uppercase text-center">to-do list application</h1>
      <div className="flex justify-between">
        <div
          className="flex w-full h-2 bg-gray-400 rounded-full overflow-hidden relative top-[5px] grow"
          role="progressbar"
        >
          <div
            className="flex flex-col justify-center overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
            style={{
              width: `${(completedTodos.length / todos.length) * 100}%`,
            }}
          ></div>
        </div>
        <div className="text-end font-semibold mb-2 text-sm ml-2">{stats}</div>
      </div>

      <form className="flex flex-col sm:justify-between sm:flex-row" onSubmit={(e) => handleAddTodo(e)}>
        <input
          type="text"
          value={task}
          onChange={(event) => setTask(event.target.value)}
          className="grow rounded border-1 focus:border-0 text-xl sm:text-2xl"
          placeholder="Add a todo"
        />
        <button
          type="submit"
          className='bg-blue-600 text-white p-2 rounded grow mt-2 sm:grow-0 sm:ml-2 sm:mt-0'
          onClick={(e) => handleAddTodo(e)}
        >
          <Plus size={24} strokeWidth={5} className='sm:hover:rotate-90 sm:hover:scale-125 sm:mx-1 duration-200 mx-auto' />
        </button>
      </form>
      

      <TodoList
        activeTodos={activeTodos}
        completedTodos={completedTodos}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
        editTodo={editTodo}
        updateTodo={updateTodo}
        selectedTodo={selectedTodo}
        setSelectedTodo={setSelectedTodo}
        separatorClass={separatorClass}
      />
    </>
  );
};

export default Todo;
