import { useTodoContext } from '../context/Context';
import uniqid from 'uniqid';
import { format } from 'date-fns';
import { useRef, useState } from 'react';
import Dailies from './Dailies';
import Weeklies from './Weeklies';
import All from './All';
import ImportantTodos from './ImportantTodos';
import ProjectTodos from './ProjectTodos';
import Add from '../assets/plus-circle-outline.svg';
import { motion as m } from 'framer-motion';
import Projects from './Projects';

export default function Todos() {
  const { addTodo, addProject, render } = useTodoContext();
  const [hidden, setHidden] = useState(true);
  const projRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const importRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <div className="flex flex-grow container sm:min-w-full">
      <Projects />
      <div className="main bg-slate-400 p-2 flex-grow flex flex-col items-center justify-start relative">
        {!hidden ? (
          <div className="flex items-center justify-center fixed right-0 left-0 top-0 bottom-0 bg-black bg-opacity-40 z-20">
            <m.form
              animate={{ scale: '100%' }}
              initial={{ scale: '0%' }}
              transition={{ duration: 0.5 }}
              ref={formRef}
              className="flex flex-col justify-center items-center bg-slate-500 p-4 rounded-xl gap-4"
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
              <div className="flex w-full gap-2 justify-start text-lg">
                <label htmlFor="importance">Important:</label>
                <input
                  className="text-black rounded-xl scale-150"
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
            </m.form>
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
