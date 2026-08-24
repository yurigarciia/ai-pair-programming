import { useState } from 'react'
import TaskCard from './TaskCard'

function Column({ title, status, tasks, hasActiveFilters, onDragStart, onDrop, onEditTask, onDeleteTask }) {
  const [isDragOver, setIsDragOver] = useState(false)

  function handleDragOver(e) {
    e.preventDefault()
    setIsDragOver(true)
  }

  function handleDragLeave() {
    setIsDragOver(false)
  }

  function handleDrop(e) {
    e.preventDefault()
    setIsDragOver(false)
    const taskId = e.dataTransfer.getData('text/plain')
    onDrop(taskId, status)
  }

  const emptyMessage = hasActiveFilters
    ? 'Nenhuma tarefa corresponde aos filtros.'
    : 'Nenhuma tarefa aqui.'

  return (
    <section
      className={`column${isDragOver ? ' column--drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <header className="column-header">
        <h2>{title}</h2>
        <span className="column-count">{tasks.length}</span>
      </header>
      <div className="column-body">
        {tasks.length === 0 && <p className="column-empty">{emptyMessage}</p>}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDragStart={onDragStart}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </section>
  )
}

export default Column
