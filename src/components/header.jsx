import logo from "../assets/logo_1.png";

export default function Header() {
  return (
    <header className="w-full h-[100px] bg-accent">
      <img src={logo} alt="Logo" className="w-[100px]" />
    </header>
  );
}
