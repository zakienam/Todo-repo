import { collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { initTodo, removeTodo, editTodo } from "../store/tasks/tasksSlice";

const TodoList = ({flag, setFlag}) => { 
  const dispatch = useDispatch();
  const todos = useSelector(state => state.tasks.tasks);

        //    for Update 
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editStatus, setEditStatus] = useState('');

  const handleEdit = (todo)=>{
    setEditId(todo.id);
    setEditTask(todo.task);
    setEditDate(todo.date);
    setEditStatus(todo.status)
  }
 
  const handleUpdate = async()=>{
    try {
      dispatch(editTodo({
        id: editId,
        task: editTask,
        date: editDate,
        status: editStatus 
      }));
      const docRef = doc(db , 'todo', editId);
      await updateDoc(docRef, {
        task: editTask,
        date: editDate,
        status: editStatus
      })   
      alert("Task Updated ✅")

      // Reset Edit Mode
      setEditId(null)
      setEditTask('')
      setEditDate('')
      setEditStatus("pending")
    } catch (error) {
      console.log('Error updating Task :', error);
    }
  }
 
  // const fetchTodos = async () => {
  //   try { 
  //     const querySnapShot = await getDocs(collection(db, "todo"));
  //     const todoData = [];
  //     querySnapShot.forEach((doc) => {
  //       todoData.push({ ...doc.data(), id: doc.id });
  //     });  
  //     console.log(todoData);
  //     setTodos(todoData);
  //   } catch (error) {
  //     console.error("Error fetching todos", error);
  //   }
  // };
           

        //       For Delete
  useEffect(()=>{
    const unsubscribe = onSnapshot(collection(db,'todo'), (snapshot)=>{
      const todoData = snapshot.docs.map((doc)=>{
        return({id: doc.id, ...doc.data()})
      }) 
      dispatch(initTodo(todoData));
    })
    return ()=> unsubscribe();
  }, [])

  useEffect(() => {
    console.log(todos);
  }, [todos]);
 
  // useEffect(() => {
  //   fetchTodos();
  // }, []);              
 
 

  // useEffect(() => { 
  //   fetchTodos();
  //   setFlag(false);
  // }, [flag])  

  const handleDelete =async(id)=>{
  try {
    dispatch(removeTodo(id))
    await deleteDoc(doc(db,'todo',id));
    alert('task Deleted ❌')
    // fetchTodos();
  } catch (error) {
    console.log('Error deleting task: ', error);
  }
  };  
  return (
    <>
      <div className="container text-center mb-5">
        <h1>Your Todos</h1>
          {/* this is edit and update UI rendering  */}
          <div className=" d-flex justify-content-center">
             {editId &&(                   
            <div className="card p-3 mb-4 bg-light w-50 ">
             <h4> Edit Task</h4>           
              <input type="text" className="form-control mb-2" value={editTask} onChange={(e)=>setEditTask(e.target.value)}/>
              <input type="text" className="form-control mb-2" value={editDate} onChange={(e)=>setEditDate(e.target.value)}/>
              <select value={editStatus} className="form-control mb-2"  onChange={(e)=>setEditStatus(e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
              </select> 
              <div className="d-flex gap-2 justify-content-center"> 
                <button className="btn btn-success " onClick={handleUpdate}>Update</button>
                <button className="btn btn-secondary" onClick={()=>setEditId(null)}>Cancel</button>
              </div>  
            </div> 
          )}
          </div>
         

      

            {/* this is normal UI todo rendering */}
        {todos.length === 0 ? (
          <p>No Task Available</p> 
        ) : (    
          <ul className="list-group"> 
            {todos.map((todo) => ( 
              <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center mt-2">
                <div>
                  <strong className=" text-capitalize">{todo.task}</strong>
                  <br /> 
                  <small className=" ">Date: {todo.date}</small> 
                </div> 
                <span className={`badge ${todo.status === "completed" ? "bg-success" : "bg-warning"}`}>{todo.status}</span>
                <div className="icons d-flex gap-3">
                  <button  className="btn border bg-info" onClick={()=>handleEdit(todo)}><FontAwesomeIcon icon={faPenToSquare} /> </button>
                  <button onClick={()=> handleDelete(todo.id)} className="btn border bg-danger"> <FontAwesomeIcon icon={faTrash} /> </button>
                </div>   
              </li>  
            ))}
          </ul>
        )}  
      </div>
    </>
  );
};

export default TodoList;
