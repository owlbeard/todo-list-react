import { useTodoContext } from '../context/Context';
import Delete from '../assets/trash-can-outline.svg';
import Edit from '../assets/file-edit-outline.svg';
import { motion as m } from 'framer-motion';
import uniqid from 'uniqid';
import { useEffect, useRef, useState } from 'react';
import Check from '../assets/check.svg';

export default function Projects() {
  const { projects, setRender, deleteProject, editProject } = useTodoContext();
  const [nav, setNav] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  useEffect(() => {
    const main = document.querySelector('.main');
    main!.addEventListener('click', (e: any) => handleClick(e));
  }, [nav]);
  const handleClick = (e: MouseEvent) => {
    const navElement = navRef.current;
    if (nav === true && navElement) {
      const dialogDimensions = navElement.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        setNav(false);
      }
    }
  };
  return (
    <div className="flex flex-col relative">
      {windowWidth >= 768 ? (
        <m.ul
          animate={{ x: 0 }}
          initial={{ x: '-200%' }}
          transition={{ duration: 0.5 }}
        >
          {projects.length > 0 && <h2 className="p-4">Projects:</h2>}
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
                        const target = e.target as HTMLFormElement;
                        const firstChild =
                          target.firstChild as HTMLInputElement;
                        const value = firstChild.value;
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
                        className=" bg-teal-500 z-10 absolute right-10 rounded-l-xl"
                      >
                        <img className="h-10 white" src={Edit} alt="Edit" />
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className=" bg-red-500 z-10 absolute right-0 rounded-r-xl"
                      >
                        <img className="h-10 white" src={Delete} alt="Delete" />
                      </button>
                    </form>
                  </div>
                </li>
              </div>
            );
          })}
        </m.ul>
      ) : nav === false && projects.length >= 1 ? (
        <button
          className="absolute top-4 z-10 text-lg p-2 rounded-xl bg-yellow-500"
          onClick={() => setNav(!nav)}
        >
          Projects
        </button>
      ) : nav ? (
        <m.div
          ref={navRef}
          animate={{ x: 0 }}
          initial={{ x: '-200%' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 justify-start items-center fixed top-0 left-0 h-screen w-screen bg-grad z-50 pr-8 pt-4 bg-slate-600"
        >
          <m.ul
            className="flex flex-col gap-4"
            animate={{ x: 0 }}
            initial={{ x: '-200%' }}
            transition={{ duration: 0.5 }}
          >
            {projects.length > 0 && <h2 className="text-xl">Projects:</h2>}
            {projects.map((project) => {
              return (
                <div
                  key={uniqid()}
                  className="flex justify-between items-center gap-4 rounded-xl border-2 border-green-600 cursor-pointer"
                >
                  <button
                    className="hover:scale-110 transition-transform active:scale-95"
                    onClick={() => {
                      setRender(project.name);
                      setNav(!nav);
                    }}
                  >
                    <img className="h-10 white" src={Check} alt="Select" />
                  </button>
                  <li key={project.id} className="flex-grow">
                    <div>
                      <form
                        onSubmit={(e) => {
                          const target = e.target as HTMLFormElement;
                          const firstChild =
                            target.firstChild as HTMLInputElement;
                          const value = firstChild.value;
                          e.preventDefault();
                          editProject(project.id, value);
                        }}
                      >
                        <input
                          className="rounded-xl bg-transparent cursor-pointer p-2"
                          type="text"
                          defaultValue={project.name}
                          required
                        />
                        <button
                          type="submit"
                          className=" bg-teal-500 z-10 absolute right-10 rounded-l-xl"
                        >
                          <img className="h-10 white" src={Edit} alt="Edit" />
                        </button>
                        <button
                          onClick={() => {
                            deleteProject(project.id);
                            console.log(projects.length);
                            if (projects.length <= 1) setNav(false);
                          }}
                          className=" bg-red-500 z-10 absolute right-0 rounded-r-xl"
                        >
                          <img
                            className="h-10 white"
                            src={Delete}
                            alt="Delete"
                          />
                        </button>
                      </form>
                    </div>
                  </li>
                </div>
              );
            })}
          </m.ul>
        </m.div>
      ) : null}
    </div>
  );
}
