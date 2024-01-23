import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
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
    },[user?.email]);
    return (
      <div>
          <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {
                tasks.map(task => <div key={task.id} className="card w-96 bg-neutral text-neutral-content">
                
             <div className="card-body items-center text-center">
                      <h2 className="card-title">{task.title}</h2>
           <p>Description: {task.description}</p>
           <p>Due On: {task.dueOn}</p>
           <p>Status: {task.status}</p>
           {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById(task.id).showModal()}>Comments</button>
<dialog id={task.id} className="modal">
  <div className="modal-box">
    {/* fetched comments */}
    <div className='space-y-4'>
            {
                task.comments?.map(comment => <div key={comment}>
                    <h1 className='text-lg font-medium mt-2 text-black'>{comment}</h1>
                     </div>)
            }
        </div>
   <form onSubmit={(e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const updateTaskAssignmentRef = doc(db, "tasks", task.id);
    const handleUpdate = async () => {
        try {
            // Use updateDoc with set option to add email to array if not already present
            await updateDoc(updateTaskAssignmentRef, {
              comments: arrayUnion(comment),
            });
            alert("Comment added successfully.");
        
          } catch (error) {
            console.error("Error assigning task:", error);
            alert("Error assigning task. Please try again.");
          }
    }
    handleUpdate();
   }}>
    <input name="comment" type="text" className="border text-black w-full h-40" />
    <button className="btn btn-primary">Comment</button>
   </form>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
             </div>
                </div>)
            }
        </div>
      </div>
    );
};

export default AssignedTasks;