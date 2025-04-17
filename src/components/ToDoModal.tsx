import { useEffect, useState } from "react";
import { AppState } from "../AppState";
import { ToDo } from "../models/ToDo";
import { todoService } from "../services/ToDoService";
import Pop from "../utils/Pop";
import { observer } from "mobx-react";

export function ToDoModal() {

  const toDos = AppState.toDos
  const [newTodo, setNewTodo] = useState('');

   useEffect(() => {
    fetchToDos()
    
    
    }, []);


  async function fetchToDos() {
    try {
      await todoService.fetchToDos()
      Pop.success("Fetched todos successfully.");
    }
    catch (error: any) {
      Pop.error(error.message || "Failed to fetch todos.");
    }
  }
  
  async function addToDo(formData: React.FormEvent<HTMLFormElement>) {
      formData.preventDefault()
    try {
      await todoService.addToDo({description: newTodo})
      setNewTodo('')
      fetchToDos()
      Pop.success("Added todo successfully.");
    }
    catch (error: any) {
      Pop.error(error.message || "Failed to add todo.");
    }
  }



  return (
    <div className="modal fade" id="todoModal" tabIndex={-1} aria-labelledby="todoModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="todoModalLabel">ToDo</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={addToDo} className="d-flex mb-3 gap-2">
          <input onChange={(formData) => setNewTodo(formData.target.value)} type="text" className="form-control" placeholder="Add a new task..." />
          <button type="submit" className="btn btn-success">Add</button>
        </form>
        {toDos && toDos.length > 0 ? (
          <ul className="list-group list-group-flush">
            {toDos.map((todo) => (
              <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span className={todo.completed ? "text-decoration-line-through opacity-50" : ""}>
                  {todo.description}
                </span>
                <button className="btn btn-outline-success btn-sm">✓</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No ToDos available.</p>
        )}

      </div>
    </div>
  </div>
</div>

  )
  
}



export default observer(ToDoModal);