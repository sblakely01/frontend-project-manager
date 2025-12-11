import { NavLink } from "react-router-dom";
function Navbar() {
    return (
    <nav className="text-black text-xl m-3 p-3 bg-emerald-300 shadow-lg shadow-emerald-300/50 flex justify-between items-center w-full h-10">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/projects">Projects</NavLink>
    </nav>
    )
}
export default Navbar
