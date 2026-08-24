import { useLocalStorage } from './useLocalStorage'
import { createTask } from '../models/task'

const STORAGE_KEY = 'todo-app:tasks'

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, [])

  function addTask(input) {
    const task = createTask(input)
    setTasks((prev) => [...prev, task])
    return task
  }

  function updateTask(id, updates) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, ...updates, id: task.id, updatedAt: new Date().toISOString() }
          : task
      )
    )
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  function moveTask(id, status) {
    updateTask(id, { status })
  }

  return { tasks, addTask, updateTask, deleteTask, moveTask }
}
