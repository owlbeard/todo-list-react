// @ts-nocheck
import { useTodoContext } from '../context/Context';
import uniqid from 'uniqid';
import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import Dailies from './Dailies';
import Weeklies from './Weeklies';
import All from './All';
import ImportantTodos from './ImportantTodos';
import ProjectTodos from './ProjectTodos';
import Add from '../assets/plus-circle-outline.svg';
import Confirm from '../assets/check.svg';
import Cancel from '../assets/close.svg';
import Delete from '../assets/trash-can-outline.svg';
import Edit from '../assets/file-edit-outline.svg';

export default function Todos() {
  const {
    addTodo,
    addProject,
    todos,
    projects,
    render,
    setRender,
    editProject,
    deleteProject,
  } = useTodoContext();
  const [hidden, setHidden] = useState(true);
  const projRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const importRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    console.log(todos);
    console.log(projects);
  }, [todos]);
  return (
    <div className="flex flex-grow flex-wrap">
      <div className="flex flex-col bg-slate-700">
        {projects.length > 0 ? <h2 className="p-4">Projects:</h2> : null}
        <ul>
          {projects.map((project) => {
            return (
              <div
                key={uniqid()}
                onClick={() => setRender(project.name)}
                className="flex justify-between items-center gap-4 rounded-xl border-2 border-green-600 cursor-pointer m-6 hover:scale-110 transition-transform active:scale-95"
              >
                <li key={project.id} className="flex-grow">
                  <div>
                    <form
                      className="flex items-center gap-2 relative"
                      onSubmit={(e) => {
                        const value = e.target.firstChild.value;
                        e.preventDefault();
                        editProject(project.id, value);
                      }}
                    >
                      <input
                        className="rounded-xl bg-transparent cursor-pointer p-2 mr-20"
                        type="text"
                        defaultValue={project.name}
                        required
                      />
                      <button
                        type="submit"
                        className="p2 bg-yellow-500 z-10 absolute right-10 rounded-l-xl"
                      >
                        <img className="h-10 white" src={Edit} alt="Edit" />
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="p2 bg-red-500 z-10 absolute right-0 rounded-r-xl"
                      >
                        <img className="h-10 white" src={Delete} alt="Delete" />
                      </button>
                    </form>
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="p-2 flex-grow flex flex-col items-center justify-start relative">
        {!hidden ? (
          <div className="flex items-center justify-center fixed right-0 left-0 top-0 bottom-0 bg-black bg-opacity-40 z-50">
            <form
              ref={formRef}
              className="flex flex-col justify-center items-center bg-slate-500 p-4 rounded-xl"
              onSubmit={(e) => {
                e.preventDefault();
                const id = uniqid();
                const projId = uniqid();
                let proj = '';
                if (projRef.current !== null) {
                  proj = projRef.current!.value;
                  addProject(projId, proj);
                }
                const title = titleRef.current!.value;
                const desc = descRef.current!.value;
                const date = format(
                  new Date(dateRef.current!.value),
                  'MM/dd/yyyy'
                );
                const importance = importRef.current!.checked;
                addTodo(id, projId, proj, title, desc, date, importance, false);
                setHidden(!hidden);
              }}
            >
              {render !== 'today' &&
              render !== 'week' &&
              render !== 'important' ? (
                <div className="flex flex-col text-lg">
                  <label htmlFor="project">Project Name(optional):</label>
                  <input
                    className="text-black p-2 rounded-xl"
                    ref={projRef}
                    type="text"
                    name="project"
                    id="project"
                  />
                </div>
              ) : null}
              <div className="flex flex-col text-lg">
                <label htmlFor="title">Task Name:</label>
                <input
                  className="text-black p-2 rounded-xl"
                  ref={titleRef}
                  type="text"
                  name="title"
                  id="title"
                />
              </div>
              <div className="flex flex-col text-lg">
                <label htmlFor="description">Description:</label>
                <input
                  className="text-black p-2 rounded-xl"
                  ref={descRef}
                  type="textarea"
                  name="description"
                  id="description"
                />
              </div>
              <div className="flex flex-col w-full text-lg">
                <label htmlFor="date">Date:</label>
                <input
                  className="text-black p-2 rounded-xl"
                  ref={dateRef}
                  type="date"
                  name="date"
                  id="date"
                />
              </div>
              <div className="flex gap-2 text-lg">
                <label htmlFor="importance">Important:</label>
                <input
                  className="text-black rounded-xl"
                  ref={importRef}
                  type="checkbox"
                  name="importance"
                  id="importance"
                />
              </div>
              <div className="w-full flex justify-around items-center text-lg">
                <button
                  className="p-2 rounded-full bg-red-500 hover:bg-red-600 active:scale-90"
                  onClick={() => {
                    setHidden(!hidden);
                    formRef.current?.reset();
                  }}
                >
                  Cancel
                </button>
                <button
                  className="p-2 rounded-full bg-green-500 hover:bg-green-600 active:scale-90"
                  type="submit"
                >
                  Add Todo
                </button>
              </div>
            </form>
          </div>
        ) : null}
        <button onClick={() => setHidden(!hidden)}>
          <img
            className="h-16 white hover:scale-110 active:scale-90 transition-transform"
            src={Add}
            alt="Add todo"
          />
        </button>
        <div>
          {render === 'all' ? (
            <All />
          ) : render === 'today' ? (
            <Dailies />
          ) : render === 'week' ? (
            <Weeklies />
          ) : render === 'important' ? (
            <ImportantTodos />
          ) : (
            <ProjectTodos />
          )}
        </div>
      </div>
    </div>
  );
}
