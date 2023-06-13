import { useTodoContext } from '../context/Context';
import Delete from '../assets/trash-can-outline.svg';
import { format } from 'date-fns';

export default function ProjectTodos() {
  const { todos, editTodo, deleteTodo, render } = useTodoContext();
  return (
    <div className="flex flex-wrap gap-4">
      {todos.map((todo) => {
        const border = todo.importance ? 'border-red-700' : 'border-gray-500';
        if (todo.projectName === render) {
          return (
            <div
              key={todo.id}
              className={`p-2 flex flex-col gap-4 rounded-xl border-2 ${border}`}
            >
              <div className="flex flex-col gap-4 items-center justify-center peer-checked:line-through peer-checked:text-slate-500">
                <div className="flex flex-col gap-2">
                  <h1>Project:</h1>
                  <input
                    className="focus:slate-700 text-black rounded-xl p-2"
                    type="text"
                    onChange={(e) => {
                      let value = e.target.value;
                      editTodo(
                        todo.id,
                        todo.projId,
                        value,
                        todo.title,
                        todo.description,
                        todo.date,
                        todo.importance,
                        todo.completion
                      );
                    }}
                    defaultValue={todo.projectName}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2>Task:</h2>
                  <input
                    className="focus:slate-700 text-black rounded-xl p-2"
                    type="text"
                    onChange={(e) => {
                      let value = e.target.value;
                      editTodo(
                        todo.id,
                        todo.projId,
                        todo.projectName,
                        value,
                        todo.description,
                        todo.date,
                        todo.importance,
                        todo.completion
                      );
                    }}
                    defaultValue={todo.title}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2>Description:</h2>
                  <input
                    className="focus:slate-700 text-black rounded-xl p-2"
                    type="text"
                    onChange={(e) => {
                      let value = e.target.value;
                      editTodo(
                        todo.id,
                        todo.projId,
                        todo.projectName,
                        todo.title,
                        value,
                        todo.date,
                        todo.importance,
                        todo.completion
                      );
                    }}
                    defaultValue={todo.description}
                  />
                </div>
                <div className="flex flex-col gap-2 justify-start w-full">
                  <label htmlFor="date">Date:</label>
                  <input
                    onChange={(e) => {
                      let value = format(
                        new Date(e.target.value),
                        'MM/dd/yyyy'
                      );
                      editTodo(
                        todo.id,
                        todo.projId,
                        todo.projectName,
                        todo.title,
                        todo.description,
                        value,
                        todo.importance,
                        todo.completion
                      );
                    }}
                    className="focus:slate-700 text-black rounded-xl p-2"
                    type="date"
                    name="date"
                    id="date"
                    defaultValue={format(new Date(todo.date), 'yyyy-MM-dd')}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 peer-checked:line-through peer-checked:text-slate-500">
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

              <div className="flex justify-center items-center relative ">
                <button onClick={() => deleteTodo(todo.id)}>
                  <img className="h-8 white" src={Delete} alt="Delete" />
                </button>
              </div>
            </div>
          );
        }
        return;
      })}
    </div>
  );
}
