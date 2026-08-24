const PRIORITY_LABEL = { alta: 'Alta', media: 'Média', baixa: 'Baixa' }

function formatDate(iso) {
  if (!iso) return null
  const [year, month, day] = iso.split('-')
  return `${day}/${month}/${year}`
}

function TaskCard({ task, onDragStart, onEdit, onDelete }) {
  function handleDelete(e) {
    e.stopPropagation()
    if (window.confirm(`Excluir a tarefa "${task.title}"?`)) {
      onDelete(task.id)
    }
  }

  return (
    <div
      className="task-card"
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onClick={() => onEdit(task)}
    >
      <div className={`task-card-priority task-card-priority--${task.priority}`} />
      <div className="task-card-body">
        <p className="task-card-title">{task.title}</p>
        <div className="task-card-meta">
          {task.category && <span className="task-card-tag">{task.category}</span>}
          <span className="task-card-priority-label">{PRIORITY_LABEL[task.priority]}</span>
          {task.dueDate && <span className="task-card-date">{formatDate(task.dueDate)}</span>}
        </div>
      </div>
      <button type="button" className="task-card-delete" onClick={handleDelete} aria-label="Excluir tarefa">
        ×
      </button>
    </div>
  )
}

export default TaskCard
