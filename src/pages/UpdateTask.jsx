import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase.config";


const UpdateTask = () => {
    const {id} = useParams();
    const [task, setTask] = useState(null);
    useEffect(() => {
        const fetchData = async() => {
            const docRef = doc(db, "tasks", id);
            const docSnap = await getDoc(docRef);
            setTask(docSnap.data());
        }
        fetchData();
    },[id])
    const handleUpdateTask = async e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const dueOn = form.dueOn.value;
        const updateRef = doc(db, "tasks", id);
        await updateDoc(updateRef, {
            title: title,
            description: description,
            dueOn: dueOn,
        });
          alert("Your task has been updated");
    }
    return (
        <div className="hero ">
  <div className="hero-content ">
    <div className="card shrink-0 w-full  shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleUpdateTask}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input type="text" defaultValue={task?.title} name="title" placeholder="Title of the task" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input type="text" defaultValue={task?.description} name="description" placeholder="Description of the task" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Due on</span>
          </label>
          <input type="date" defaultValue={task?.dueOn} name="dueOn" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Update Task</button>
        </div>
      </form>
    </div>
  </div>
</div>
    );
};

export default UpdateTask;