import { useTodoContext } from '../context/Context';
import All from '../assets/calendar-check.svg';
import Today from '../assets/calendar-today.svg';
import Week from '../assets/calendar-week.svg';
import Important from '../assets/alert-circle-outline.svg';

export default function NavBar() {
  const { setRender } = useTodoContext();
  return (
    <div className="flex-grow sm:my-0 my-12 ">
      <ul className="flex justify-end items-center gap-12">
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
    </div>
  );
}
