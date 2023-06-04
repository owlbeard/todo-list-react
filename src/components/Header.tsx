import NavBar from './NavBar';

export default function Header() {
  return (
    <div className="p-4 flex justify-between relative bg-slate-700">
      <h1 className="absolute left-2 top-2 text-4xl">TodoApp</h1>
      <NavBar />
    </div>
  );
}
