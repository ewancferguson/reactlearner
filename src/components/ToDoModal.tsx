export function ToDoModal() {
  return (
    <div className="modal fade" id="todoModal" tabIndex={-1} aria-labelledby="todoModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="todoModalLabel">Add a New To-Do</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {/* Form to add a new to-do */}
          </div>
        </div>
      </div>
    </div>
  )
  
}