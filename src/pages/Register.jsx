import { useContext } from "react";
import {NavLink} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../providers/AuthProvider";

const Register = () => {
    const {createUser, updateUserInfo} = useContext(AuthContext);
    const handleRegistrationSubmit = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        if(password.length < 6){
         return toast("password should have at least 6 characters");
        }
        if(!/[A-Z]/.test(password)){
          return toast("password should have at least one uppercase character");
        }
        if(!/[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password)){
          return toast("please add at least a special character in your password!");
        }
        createUser(email, password)
        .then(() =>  updateUserInfo(name, photo),
        toast("your account is successfully created!"))
        .catch(err =>  toast(err.message));
        e.target.reset();
    }
    return (
        <div>
        <div className="hero ">
<div className="hero-content flex-col ">
            <p className="text-2xl">Please Register here</p>
<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 ">
  <form className="card-body" onSubmit={handleRegistrationSubmit}>
    <div className="form-control">
      <label className="label">
        <span className="label-text">Name</span>
      </label>
      <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
    </div>
    <div className="form-control">
      <label className="label">
        <span className="label-text">Photo URL</span>
      </label>
      <input type='url' name="photo" placeholder="Your Photo URL" className="input input-bordered"  required/>
    </div>
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
      <button className="btn btn-primary">Register</button>
    </div>
  </form>
  <p className="pb-4 px-3">Already have an Account? <NavLink to="/login" className="text-green-700 font-bold">Login</NavLink></p>
</div>
</div>
</div>
<ToastContainer/>
    </div>
    );
};

export default Register;