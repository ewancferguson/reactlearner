import { useEffect, useState } from "react";
import { AppState } from "../AppState";
import { ToDo } from "../models/ToDo";
import { todoService } from "../services/ToDoService";
import Pop from "../utils/Pop";
import { observer } from "mobx-react";

const ToDoModal = observer(() => {
  const toDos = AppState.toDos;
  const [newTodo, setNewTodo] = useState('');


  const incompleteTodos = toDos?.filter(todo => !todo.completed) || [];

  useEffect(() => {
    if (AppState.account) {
      fetchToDos();
    }
  }, [AppState.account]);

  async function fetchToDos() {
    try {
      await todoService.fetchToDos();
    } catch (error: any) {
      Pop.error(error.message || "Failed to fetch todos.");
    }
  }

  async function addToDo(formData: React.FormEvent<HTMLFormElement>) {
    formData.preventDefault();
    try {
      await todoService.addToDo({ description: newTodo });
      setNewTodo('');
      fetchToDos()
      Pop.success("Added todo successfully.");
    } catch (error: any) {
      Pop.error(error.message || "Failed to add todo.");
    }
  }

  async function toggleToDoComplete(todo: ToDo) {
    try {
      await todoService.updateToDo(todo.id);
      fetchToDos();
    } catch (error: any) {
      Pop.error(error.message || "Failed to update todo.");
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
              <input
                type="text"
                className="form-control"
                placeholder="Add a new task..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
              <button type="submit" className="btn btn-success">Add</button>
            </form>

            {toDos && toDos.length > 0 ? (
              <ul className="list-group list-group-flush">
                {toDos.map((todo) => (
                  <li key={todo.id} className="list-group-item">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`todo-${todo.id}`}
                        checked={todo.completed}
                        onChange={() => toggleToDoComplete(todo)}
                      />
                      <label
                        htmlFor={`todo-${todo.id}`}
                        className={`form-check-label ms-2 ${
                          todo.completed ? "text-decoration-line-through opacity-50" : ""
                        }`}
                      >
                        {todo.description}
                      </label>
                    </div>
                  </li>
                ))}
                <p className="fw-bold mt-4">You Have {incompleteTodos.length} Left To Do!</p>
              </ul>
              
            ) : (
              <p>No ToDos available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ToDoModal;