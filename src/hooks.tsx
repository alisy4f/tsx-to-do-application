import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const useLocalStorage = <T extends object> (key: string, initialValue: T): [T, (newValue: T) => void] => {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setItem = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setItem];
};


export interface TodoItem {
  id: string;
  task: string;
  completed: boolean;
}

const useTodoLogic = () => {
  const [todos, setTodos] = useLocalStorage<TodoItem[]>('todos', []);
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);

  const addTodo = (task: string) => {
    if (task.length > 2) {
      setTodos([...todos, { id: uuidv4(), task, completed: false }]);
      toast.success('Todo added');
    } else {
      toast.error('Task should be at least 3 characters long.');
    }
  };

  const toggleTodo = (todoId: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.completed ? toast.warning('Todo restored') : toast.success('Todo completed');
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const editTodo = (todoId: string) => {
    setSelectedTodo(todos.find((todo) => todo.id === todoId) || null);
  };

  const updateTodo = () => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === selectedTodo?.id) {
          if (todo.task !== selectedTodo.task) {
            toast.success('Todo updated');
          }
          return selectedTodo;
        }
        return todo;
      })
    );

    setSelectedTodo(null);
  };

  const deleteTodo = (todoId: string) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      setTodos(todos.filter((todo) => todo.id !== todoId));
      toast.error('Todo deleted');
    }
  };

  useEffect(() => {
    setTodos(todos);
  }, [todos, setTodos]);

  return {
    todos,
    selectedTodo,
    addTodo,
    toggleTodo,
    editTodo,
    updateTodo,
    deleteTodo,
    setSelectedTodo,
  };
};

export default useTodoLogic;

