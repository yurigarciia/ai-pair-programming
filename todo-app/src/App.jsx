import { useState } from 'react'
import { useTasks } from './hooks/useTasks'
import Board from './components/Board'
import FilterBar from './components/FilterBar'
import TaskForm from './components/TaskForm'
import { filterTasks } from './utils/filters'
import './App.css'

function App() {
  const { tasks, addTask, updateTask, deleteTask, moveTask } = useTasks()
  const [filters, setFilters] = useState({ category: '', priority: '' })
  const [formState, setFormState] = useState({ open: false, task: null })

  const visibleTasks = filterTasks(tasks, filters)
  const hasActiveFilters = Boolean(filters.category || filters.priority)

  function handleOpenCreate() {
    setFormState({ open: true, task: null })
  }

  function handleOpenEdit(task) {
    setFormState({ open: true, task })
  }

  function handleCloseForm() {
    setFormState({ open: false, task: null })
  }

  function handleSubmitForm(values) {
    if (formState.task) {
      updateTask(formState.task.id, values)
    } else {
      addTask(values)
    }
    handleCloseForm()
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>To Do</h1>
        <button type="button" className="btn-primary" onClick={handleOpenCreate}>
          Nova tarefa
        </button>
      </header>

      <FilterBar tasks={tasks} filters={filters} onChange={setFilters} />

      <main className="app-main">
        <Board
          tasks={visibleTasks}
          hasActiveFilters={hasActiveFilters}
          onMoveTask={moveTask}
          onEditTask={handleOpenEdit}
          onDeleteTask={deleteTask}
        />
      </main>

      {formState.open && (
        <TaskForm
          initialTask={formState.task}
          onSubmit={handleSubmitForm}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  )
}

export default App
