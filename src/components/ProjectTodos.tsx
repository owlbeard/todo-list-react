import { useTodoContext } from '../context/Context';
import Delete from '../assets/trash-can-outline.svg';

export default function ProjectTodos() {
  const { todos, editTodo, deleteTodo, render } = useTodoContext();
  return (
    <div>
      {todos.map((todo) => {
        if (todo.projectName === render) {
          return (
            <div key={todo.id}>
              <h1>{todo.projectName}</h1>
              <h2>{todo.title}</h2>
              <p>{todo.description}</p>
              <p>{todo.date}</p>
              <div>
                <label htmlFor="important">Important?</label>
                <input
                  type="checkbox"
                  name="important"
                  id="important"
                  defaultChecked={todo.importance}
                  onChange={() =>
                    editTodo(
                      todo.id,
                      todo.projId,
                      todo.projectName,
                      todo.title,
                      todo.description,
                      todo.date,
                      !todo.importance,
                      todo.completion
                    )
                  }
                />
              </div>
              <div>
                <label htmlFor="complete">Completed?</label>
                <input
                  type="checkbox"
                  name="complete"
                  id="complete"
                  defaultChecked={todo.completion}
                  onChange={() =>
                    editTodo(
                      todo.id,
                      todo.projId,
                      todo.projectName,
                      todo.title,
                      todo.description,
                      todo.date,
                      todo.importance,
                      !todo.completion
                    )
                  }
                />
              </div>
              <div className="flex justify-between items-center">
                <button onClick={() => deleteTodo(todo.id)}>
                  <img className="h-8 white" src={Delete} alt="Delete" />
                </button>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
