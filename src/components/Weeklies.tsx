import { useTodoContext } from '../context/Context';
import { format } from 'date-fns';
import { isSameWeek } from 'date-fns';
import Delete from '../assets/trash-can-outline.svg';

const today = format(new Date(), 'dd/MM/yyyy');

export default function Weeklies() {
  const { todos, editTodo, deleteTodo } = useTodoContext();
  return (
    <div>
      {todos.map((todo) => {
        const border = todo.importance ? 'border-red-700' : 'border-gray-500';
        const checkWeek = isSameWeek(new Date(todo.date), new Date(today));
        if (checkWeek) {
          return (
            <div
              key={todo.id}
              className={`p-2 flex gap-4 rounded-xl border-2 ${border}`}
            >
              <input
                className="cursor-pointer peer"
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

              <div className="flex gap-4 items-center peer-checked:line-through peer-checked:text-slate-500">
                <div className="flex gap-2">
                  <h1>Project:</h1>
                  <input
                    className="text-black rounded-xl"
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
                <div className="flex gap-2">
                  <h2>Task:</h2>
                  <input
                    className="text-black rounded-xl"
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
                <div className="flex gap-2">
                  <h2>Description:</h2>
                  <input
                    className="text-black rounded-xl"
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
                <div className="flex gap-2">
                  <label htmlFor="date">Date:</label>
                  <input
                    onChange={(e) => {
                      let value = format(
                        new Date(e.target.value),
                        'dd/MM/yyyy'
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
                    className="text-black"
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
