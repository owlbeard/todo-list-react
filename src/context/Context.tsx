import { ReactNode, createContext, useContext, useState } from 'react';

type TodoProviderProps = {
  children: ReactNode;
};

type TodoItem = {
  id: string;
  projId: string;
  projectName: string;
  title: string;
  description: string;
  date: string;
  importance: boolean;
  completion: boolean;
};

type Projects = {
  id: string;
  name: string;
};

type ContextProps = {
  addTodo: (
    id: string,
    projId: string,
    projectName: string,
    title: string,
    description: string,
    date: string,
    importance: boolean,
    completion: boolean
  ) => void;
  editTodo: (
    id: string,
    projId: string,
    projectName: string,
    title: string,
    description: string,
    date: string,
    importance: boolean,
    completion: boolean
  ) => void;
  deleteTodo: (id: string) => void;
  addProject: (id: string, name: string) => void;
  editProject: (id: string, name: string) => void;
  deleteProject: (id: string, name: string) => void;
  render: string;
  setRender: React.Dispatch<React.SetStateAction<string>>;
  todos: TodoItem[];
  projects: Projects[];
};

const TodoContext = createContext({} as ContextProps);

export function useTodoContext() {
  return useContext(TodoContext);
}

export function TodoProvider({ children }: TodoProviderProps) {
  const [render, setRender] = useState('all');
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [projects, setProjects] = useState<Projects[]>([]);
  function addTodo(
    id: string,
    projId: string,
    projectName: string,
    title: string,
    description: string,
    date: string,
    importance: boolean,
    completion: boolean
  ) {
    const item = {
      id: id,
      projId: projId,
      projectName: projectName,
      title: title,
      description: description,
      date: date,
      importance: importance,
      completion: completion,
    };
    setTodos((prevTodos) => [...prevTodos, item]);
  }
  function editTodo(
    id: string,
    projId: string,
    projectName: string,
    title: string,
    description: string,
    date: string,
    importance: boolean,
    completion: boolean
  ) {
    const newTodos: any = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          projectName: projectName,
          title: title,
          description: description,
          date: date,
          importance: importance,
          completion: completion,
        };
      }
      return todo;
    });
    const newProjects: any = projects.map((project) => {
      if (project.id === projId) {
        return {
          ...project,
          name: projectName,
        };
      }
    });
    setTodos(newTodos);
    setProjects(newProjects);
  }
  function deleteTodo(id: string) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  function addProject(id: string, name: string) {
    const newProject = {
      id: id,
      name: name,
    };
    setProjects([...projects, newProject]);
  }
  function editProject(id: string, name: string) {
    const newProjects = projects.map((project) => {
      if (project.id === id) return { ...project, name: name };
      return project;
    });
    const newTodos: any = todos.map((todo) => {
      if (todo.projId === id) {
        return {
          ...todo,
          projectName: name,
        };
      }
      return todo;
    });
    setProjects(newProjects);
    setTodos(newTodos);
    setRender(name);
  }
  function deleteProject(id: string) {
    const newProjects = projects.filter((project) => project.id !== id);
    const newTodos = todos.filter((todo) => todo.projId !== id);
    setProjects(newProjects);
    setTodos(newTodos);
  }

  return (
    <TodoContext.Provider
      value={{
        addTodo,
        editTodo,
        deleteTodo,
        addProject,
        editProject,
        deleteProject,
        render,
        setRender,
        todos,
        projects,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}