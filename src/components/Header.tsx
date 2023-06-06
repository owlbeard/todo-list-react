import NavBar from './NavBar';

export default function Header() {
  return (
    <div className="p-4 min-h-header flex justify-between relative bg-slate-700 container sm:min-w-full">
      <h1 className="absolute left-2 top-4 text-4xl">TodoApp</h1>
      <NavBar />
    </div>
  );
}
