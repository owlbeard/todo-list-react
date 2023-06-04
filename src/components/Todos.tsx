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
  }, [todos]);
  return (
    <div className="flex flex-grow">
      <div className="flex flex-col bg-slate-700">
        {projects.length > 0 ? <h2 className="p-4">Projects:</h2> : null}
        <ul>
          {projects.map((project) => {
            return (
              <div
                key={uniqid()}
                className="flex justify-between items-center gap-4 p-4"
              >
                <li key={project.id} className="flex-grow">
                  <div onClick={() => setRender(project.name)}>
                    <form
                      className="flex items-center gap-2"
                      onSubmit={(e) => {
                        const value = e.target.firstChild.value;
                        e.preventDefault();
                        editProject(project.id, value);
                      }}
                    >
                      <input
                        className="appearance-none bg-transparent"
                        type="text"
                        defaultValue={project.name}
                      />
                      <button type="submit">
                        <img className="h-8 white" src={Edit} alt="Edit" />
                      </button>
                      <button>
                        <img className="h-8 white" src={Delete} alt="Delete" />
                      </button>
                    </form>
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="p-2 flex-grow flex flex-col items-center justify-start">
        {!hidden ? (
          <form
            ref={formRef}
            className="flex gap-4 items-center"
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
                'dd/MM/yyyy'
              );
              const importance = importRef.current!.checked;
              addTodo(id, projId, proj, title, desc, date, importance, false);
              setHidden(!hidden);
            }}
          >
            {render !== 'today' &&
            render !== 'week' &&
            render !== 'important' ? (
              <div className="flex flex-col">
                <label htmlFor="project">Project Name(optional):</label>
                <input
                  className="text-black"
                  ref={projRef}
                  type="text"
                  name="project"
                  id="project"
                />
              </div>
            ) : null}
            <div className="flex flex-col">
              <label htmlFor="title">Task Name:</label>
              <input
                className="text-black"
                ref={titleRef}
                type="text"
                name="title"
                id="title"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description">Description:</label>
              <input
                className="text-black"
                ref={descRef}
                type="textarea"
                name="description"
                id="description"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="date">Date:</label>
              <input
                className="text-black"
                ref={dateRef}
                type="date"
                name="date"
                id="date"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="importance">Important:</label>
              <input
                className="text-black"
                ref={importRef}
                type="checkbox"
                name="importance"
                id="importance"
              />
            </div>
            <div className="h-full flex flex-col items-center justify-center">
              <button
                onClick={() => {
                  setHidden(!hidden);
                  formRef.current?.reset();
                }}
              >
                <img className="h-8 white" src={Cancel} alt="Cancel" />
              </button>
              <button type="submit">
                <img className="h-8 white" src={Confirm} alt="Confirm" />
              </button>
            </div>
          </form>
        ) : (
          <button onClick={() => setHidden(!hidden)}>
            <img className="h-16 white" src={Add} alt="Add todo" />
          </button>
        )}
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
