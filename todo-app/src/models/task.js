export const PRIORITIES = ['alta', 'media', 'baixa']
export const STATUSES = ['todo', 'doing', 'done']

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export function createTask({ title, category = '', priority = 'media', dueDate = null } = {}) {
  if (!title || !title.trim()) {
    throw new Error('Title is required to create a task')
  }

  const now = new Date().toISOString()

  return {
    id: generateId(),
    title: title.trim(),
    category: category.trim(),
    priority: PRIORITIES.includes(priority) ? priority : 'media',
    dueDate: dueDate || null,
    status: 'todo',
    createdAt: now,
    updatedAt: now,
  }
}
