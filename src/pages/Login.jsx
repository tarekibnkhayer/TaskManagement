import { useContext } from "react";
import {NavLink, useLocation, useNavigate }from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../providers/AuthProvider";

const Login = () => {
    const {signInUser, logInPopup} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const handleLoginSubmit = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInUser(email, password)
        .then(() => toast("You are successfully logged in!"),
       navigate(location?.state? location.state: '')
        )
        .catch(err => toast(err.message));
        e.target.reset();
    }
    const handleGoogleLogin = () => {
      const googleProvider = new GoogleAuthProvider();
      logInPopup(googleProvider)
      .then(() => toast("you are successfully logged In"))
      .catch(err => toast(err.message));
    }
    return (
        <div>
          <div>
            {/* <Navbar></Navbar> */}
            <div className="hero ">
  <div className="hero-content flex-col ">
    <p className="text-2xl">Please Login here</p>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 ">
      <form className="card-body" onSubmit={handleLoginSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      <p className="pb-4 px-3">Do not have an Account? <NavLink to="/register" className="text-green-700 font-bold">Register</NavLink></p>
    </div>
  </div>
</div>
<ToastContainer/>
        </div>
       <div className="text-center">
       <p className="text-xl">Login with:</p>
        <button onClick={handleGoogleLogin}><FcGoogle className="text-2xl"></FcGoogle></button>
       </div>
        </div>
    );
};

export default Login;