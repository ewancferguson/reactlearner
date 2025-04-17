import { useEffect, useState } from "react";
import { AppState } from "../AppState";
import { ToDo } from "../models/ToDo";
import { todoService } from "../services/ToDoService";
import Pop from "../utils/Pop";

export function ToDoModal() {

  const [toDos, setToDos] = useState<ToDo[] | null>(null);


   useEffect(() => {
    fetchToDos()
    setToDos(AppState.toDos)
    
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
  




  return (
    <div className="modal fade" id="todoModal" tabIndex={-1} aria-labelledby="todoModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="todoModalLabel">ToDo</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {toDos && toDos.length > 0 ? (
              <ul className="list-group list-group-flush">
                {toDos.map((todo) => (
                  <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{todo.description}</span>
                    <button className="btn btn-danger btn-sm">Delete</button> 
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