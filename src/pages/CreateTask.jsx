import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../firebase/firebase.config";


const CreateTask = () => {
    const handleCreateTask = async e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const dueOn = form.dueOn.value;
        try {
            const docRef = await  addDoc(collection(db, "tasks"), {
              title: title,
              description: description,
              dueOn: dueOn
            });
            console.log(docRef);
          } catch (e) {
            alert("something went wrong");
          }
          
    }
    return (
<div className="hero ">
  <div className="hero-content ">
    <div className="card shrink-0 w-full  shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleCreateTask}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input type="text" name="title" placeholder="Title of the task" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input type="text" name="description" placeholder="Description of the task" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Due on</span>
          </label>
          <input type="date" name="dueOn" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
    );
};

export default CreateTask;