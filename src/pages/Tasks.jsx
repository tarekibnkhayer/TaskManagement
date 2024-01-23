import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";

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
    }

  
    return (
      <div>
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
           </div>
         </div>
       </div>
        ))}
       </div>
      </div>
    );
  };
  
  export default Tasks;