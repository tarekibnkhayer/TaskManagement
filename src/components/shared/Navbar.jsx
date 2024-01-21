import { NavLink, useNavigate } from "react-router-dom";
import './Navbar.css'
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import defaultUserImg from "../../assets/user.png"

const Navbar = () => {
  const navigate = useNavigate();
  const {user, signOutUser} = useContext(AuthContext);
  const handleLogOut = () => {
    signOutUser();
  }
  const handleLogIn = () => {
    navigate('/login')
  }
    const navLinks = <>
    <NavLink  to="/">Home</NavLink>
    <NavLink  to="/features">Features</NavLink>
    <NavLink  to="/blogs">Blogs</NavLink>
    <NavLink  to="/register">Register</NavLink>
    <NavLink  to="/login">Login</NavLink>
    </>
    return (
        <div className="navbar mt-4">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {navLinks}
      </ul>
    </div>
    
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu  flex flex-row gap-16 text-lg px-6">
      {navLinks}
    </ul>
  </div>
  <div className="navbar-end">
    {
      user? <>
      
      <p className="mr-2">{user?.displayName}</p>
      <img src={user?.photoURL} className="w-12  border rounded-full"></img>
      <button className="btn btn-secondary" onClick={handleLogOut}>Logout</button>
         </>
      : 
      <>
      <img src={defaultUserImg}alt="" className="w-12 border rounded-full" />
      <button className="btn btn-primary" onClick={handleLogIn}>LogIn</button>
      </>
    }
  </div>
</div>
    );
};

export default Navbar;