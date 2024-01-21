import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

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
  
    return (
      <div>
        {/* Render tasks here */}
       <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
       {tasks.map((task) => (
          <div key={task.id} className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{task.title}</h2>
            <p>{task.description}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">{task.dueOn}</button>
            </div>
          </div>
        </div>
        ))}
       </div>
      </div>
    );
  };
  
  export default Tasks;