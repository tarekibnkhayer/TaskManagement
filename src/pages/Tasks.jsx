/* eslint-disable react/no-unescaped-entities */
import { arrayUnion, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import { CiFilter } from "react-icons/ci";

const Tasks = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const q = query(collection(db, "tasks"), where("email", "==", user?.email || ""));
          const querySnapshot = await getDocs(q);
          const tasksData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setTasks(tasksData);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      };
  
      fetchData();
    }, [user]);

    const handleDeleteTask = async id => {
      await deleteDoc(doc(db, "tasks", id));
      alert("Task has been deleted");
    };

    const handleCompletion = async id => {
      const updateRef = doc(db, "tasks", id);
      await updateDoc(updateRef, {
        status: "completed"
      })
    };
    
    const handleStatusChange = (e) => {
      e.preventDefault();
      const selectedStatus = e.target.value;
      const fetchData = async () => {
        if(selectedStatus == 'all'){
          const q = query(collection(db, "tasks"), where("email", "==", user?.email || ""));
          const querySnapshot = await getDocs(q);
          const tasksData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
           return setTasks(tasksData);
        }
        const q = query(collection(db, "tasks"), where("status", "==", selectedStatus));
        const querySnapshot = await getDocs(q);
          const tasksData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setTasks(tasksData);
      }
      fetchData()
    };
    
  
    return (
      <div>
        {/* filtering */}
        <div className="mb-8">
        <details className="dropdown">
  <summary className="m-1 btn">Status <CiFilter></CiFilter></summary>
  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
    <select onChange={handleStatusChange}>
      <option value="all">All</option>
      <option value="incomplete">Incomplete</option>
      <option value="completed">Completed</option>
    </select>
  </ul>
</details>
        </div>
       <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
       {tasks.map((task) => (
         <div key={task.id} className="card w-96 bg-neutral text-neutral-content">
         <div className="card-body items-center text-center">
           <h2 className="card-title">{task.title}</h2>
           <p>Description: {task.description}</p>
           <p>Due On: {task.dueOn}</p>
           <p>Status: {task.status}</p>
           <button onClick={() => handleCompletion(task.id)} disabled={task.status === "completed"} className="btn btn-primary">Complete</button>
           <div className="card-actions justify-end">
             <Link to={`/updateTask/${task.id}`}><button className="btn btn-primary">Update</button></Link>
             <button onClick={() => handleDeleteTask(task.id)} className="btn btn-primary">Delete</button>
             {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById(task.id).showModal()}>open modal</button>
<dialog id={task.id} className="modal">
  <div className="modal-box">
            <div className="hero ">
  <div className="hero-content flex-col ">
    <p className="text-xl text-blue-400">Please provide the user email to assign the task</p>
    <form onSubmit={async (e) =>{
      e.preventDefault();
      const email =  e.target.email.value;
      if (!email) {
        alert("Please provide a valid email address.");
        return;
      }
    
      const updateTaskAssignmentRef = doc(db, "tasks", task.id);
    
      try {
        // Use updateDoc with set option to add email to array if not already present
        await updateDoc(updateTaskAssignmentRef, {
          taskAssignment: arrayUnion(email),
        });
    
        alert("Task assigned successfully.");
      } catch (error) {
        console.error("Error assigning task:", error);
        alert("Error assigning task. Please try again.");
      }
    }}>
    <div className="card flex-shrink-0 w-full max-w-sm  bg-base-100 ">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input name="email" placeholder="email" className="input input-bordered text-black"  required />
        </div>
        <div className="form-control">
          <button className="btn btn-primary" type="submit">Assign</button>
        </div>
    </div>
    </form>
  </div>
</div>
        </div>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
</dialog>
           </div>

         </div>
       </div>
        ))}
       </div>
      </div>
    );
  };
  
  export default Tasks;