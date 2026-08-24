export function filterTasks(tasks, { category = '', priority = '' } = {}) {
  return tasks.filter((task) => {
    const matchesCategory = !category || task.category === category
    const matchesPriority = !priority || task.priority === priority
    return matchesCategory && matchesPriority
  })
}

export function getUniqueCategories(tasks) {
  return [...new Set(tasks.map((task) => task.category).filter(Boolean))].sort()
}
