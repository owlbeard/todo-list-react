import { useTodoContext } from '../context/Context';
import All from '../assets/calendar-check.svg';
import Today from '../assets/calendar-today.svg';
import Week from '../assets/calendar-week.svg';
import Important from '../assets/alert-circle-outline.svg';
import { motion as m } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Bars from '../assets/bars.png';

export default function NavBar() {
  const [nav, setNav] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { setRender } = useTodoContext();
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
    <div className="flex flex-grow container justify-end sm:min-w-full">
      {windowWidth >= 768 ? (
        <ul className="flex justify-end items-center gap-12 container sm:min-w-full">
          <li
            className="flex items-center cursor-pointer p-2 bg-slate-600 rounded-full active:translate-y-1 hover:scale-110 transition-transform"
            onClick={() => setRender('all')}
          >
            <img className="h-8 white" src={All} alt="All" />
            <h2>All</h2>
          </li>
          <li
            className="flex items-center cursor-pointer p-2 bg-slate-600 rounded-full active:translate-y-1 hover:scale-110 transition-transform"
            onClick={() => setRender('today')}
          >
            <img className="h-8 white" src={Today} alt="Today" />
            <h2>Today</h2>
          </li>
          <li
            className="flex items-center cursor-pointer p-2 bg-slate-600 rounded-full active:translate-y-1 hover:scale-110 transition-transform"
            onClick={() => setRender('week')}
          >
            <img className="h-8 white" src={Week} alt="Week" />
            <h2>Week</h2>
          </li>
          <li
            className="flex items-center cursor-pointer p-2 bg-slate-600 rounded-full active:translate-y-1 hover:scale-110 transition-transform"
            onClick={() => setRender('important')}
          >
            <img className="h-8 white" src={Important} alt="Important" />
            <h2>Important</h2>
          </li>
        </ul>
      ) : !nav ? (
        <button onClick={() => setNav(!nav)}>
          <img className="h-12" src={Bars} alt="Nav Button" />
        </button>
      ) : (
        <m.div
          ref={navRef}
          animate={{ x: 0 }}
          initial={{ x: '200%' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 justify-start items-end fixed top-0 right-0 h-screen w-52 bg-grad z-50 pr-4 pt-4 bg-slate-600"
        >
          <button onClick={() => setNav(!nav)}>
            <img className="h-12" src={Bars} alt="Nav Button" />
          </button>
          <ul className="flex flex-col justify-end items-end gap-12 container sm:min-w-full">
            <li
              className="flex items-center cursor-pointer p-2 bg-slate-600 rounded-full active:translate-y-1 hover:scale-110 transition-transform"
              onClick={() => {
                setRender('all');
                setNav(!nav);
              }}
            >
              <img className="h-8 white" src={All} alt="All" />
              <h2>All</h2>
            </li>
            <li
              className="flex items-center cursor-pointer p-2 bg-slate-600 rounded-full active:translate-y-1 hover:scale-110 transition-transform"
              onClick={() => {
                setRender('today');
                setNav(!nav);
              }}
            >
              <img className="h-8 white" src={Today} alt="Today" />
              <h2>Today</h2>
            </li>
            <li
              className="flex items-center cursor-pointer p-2 bg-slate-600 rounded-full active:translate-y-1 hover:scale-110 transition-transform"
              onClick={() => {
                setRender('week');
                setNav(!nav);
              }}
            >
              <img className="h-8 white" src={Week} alt="Week" />
              <h2>Week</h2>
            </li>
            <li
              className="flex items-center cursor-pointer p-2 bg-slate-600 rounded-full active:translate-y-1 hover:scale-110 transition-transform"
              onClick={() => {
                setRender('important');
                setNav(!nav);
              }}
            >
              <img className="h-8 white" src={Important} alt="Important" />
              <h2>Important</h2>
            </li>
          </ul>
        </m.div>
      )}
    </div>
  );
}
