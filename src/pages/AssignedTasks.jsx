import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase.config";


const AssignedTasks = () => {
    const {user} = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        const userEmail = user?.email;
        const fetchData = async () => {
            const assignTask = collection(db, "tasks");
        const q = query(assignTask, where("taskAssignment", "array-contains", userEmail));
        const querySnapshot = await getDocs(q);
        const tasksData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTasks(tasksData);
        }
        fetchData();
    },[user?.email])
    return (
        <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {
                tasks.map(task => <div key={task.id} className="card w-96 bg-neutral text-neutral-content">
                
             <div className="card-body items-center text-center">
                      <h2 className="card-title">{task.title}</h2>
           <p>Description: {task.description}</p>
           <p>Due On: {task.dueOn}</p>
           <p>Status: {task.status}</p>
             </div>
                </div>)
            }
        </div>
    );
};

export default AssignedTasks;