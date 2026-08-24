import Column from './Column'

const COLUMNS = [
  { status: 'todo', title: 'A Fazer' },
  { status: 'doing', title: 'Fazendo' },
  { status: 'done', title: 'Concluído' },
]

function Board({ tasks, hasActiveFilters, onMoveTask, onEditTask, onDeleteTask }) {
  function handleDragStart(e, taskId) {
    e.dataTransfer.setData('text/plain', taskId)
  }

  function handleDrop(taskId, status) {
    onMoveTask(taskId, status)
  }

  return (
    <div className="board">
      {COLUMNS.map((column) => (
        <Column
          key={column.status}
          title={column.title}
          status={column.status}
          tasks={tasks.filter((task) => task.status === column.status)}
          hasActiveFilters={hasActiveFilters}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  )
}

export default Board
