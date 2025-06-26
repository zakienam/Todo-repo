import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { addTodo } from "../store/tasks/tasksSlice";
import { useDispatch } from "react-redux";



export default function AddNewTaskForm({ show, handleClose, setFlag }) {
 const dispatch = useDispatch();
  const [input , setInput] = useState('');
  const [newDate, setNewdate] = useState(''); 
   const [status , setStatus] = useState('Pending');
  
  const handleSubmit = async()=>{
    try {  
      console.log(`Status: ${status}`);
      dispatch(addTodo({
        task:input,   
        date:newDate, 
        status:status 
      }))
      await addDoc(collection(db,"todo"),{
        task:input,
        date:newDate, 
        status:status
      }); 
      alert("Data saved in firebase ✅"); 
      setInput('') 
      setNewdate('') 
      setStatus('')
      setFlag(true);
    
    } catch (error) {
      console.error("Error adding document: ", error); 
    }
    handleClose(); 
  } 

  useEffect(() => {
    console.log(status)
  }, [status])
 
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>  
        <label>Task</label>
        <br /> 
          <input 
            className="todo-input"
            type="text"
            placeholder="Add Your Todo" 
            value={input} 
            onChange={(e)=> setInput(e.target.value)}    
          />  
          <div className=" d-flex mt-3 gap-5 ">
            <div>
               <label className="">Date</label>
            <br /> 
            <input className="p-2 " type="date" onChange={(e)=> setNewdate(e.target.value)} value={newDate}/>
            </div>
            <div className="dropdown ">  
            <label>Status</label> 
            <br /> 
              <select defaultValue={status} className="p-2" onClick={(e) => setStatus(e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select> 
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */} 
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
   
    </>
  );
}
