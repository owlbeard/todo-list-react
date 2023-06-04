import GitHub from '../assets/github.svg';

export default function Footer() {
  return (
    <div className="p-2 flex justify-center items-center gap-2 bg-slate-700">
      <a href="https://github.com/owlbeard">
        <img
          className="h-12 white hover:scale-110 transition-transform"
          src={GitHub}
          alt="GitHub"
        />
      </a>
      <p>Copyright © 2023 || Ömer F. Altun</p>
    </div>
  );
}
