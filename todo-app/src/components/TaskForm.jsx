import { useEffect, useState } from 'react'
import { PRIORITIES } from '../models/task'

const PRIORITY_LABEL = { alta: 'Alta', media: 'Média', baixa: 'Baixa' }
const TITLE_MAX_LENGTH = 120
const CATEGORY_MAX_LENGTH = 40

function TaskForm({ initialTask, onSubmit, onCancel }) {
  const isEditing = Boolean(initialTask)
  const [title, setTitle] = useState(initialTask?.title ?? '')
  const [category, setCategory] = useState(initialTask?.category ?? '')
  const [priority, setPriority] = useState(initialTask?.priority ?? 'media')
  const [dueDate, setDueDate] = useState(initialTask?.dueDate ?? '')
  const [error, setError] = useState('')

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onCancel])

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) {
      setError('O título é obrigatório.')
      return
    }
    onSubmit({
      title: title.trim(),
      category: category.trim(),
      priority,
      dueDate: dueDate || null,
    })
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <form className="modal-form" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h2>{isEditing ? 'Editar tarefa' : 'Nova tarefa'}</h2>

        <label className="field">
          <span>Título</span>
          <input
            type="text"
            value={title}
            maxLength={TITLE_MAX_LENGTH}
            aria-invalid={Boolean(error)}
            className={error ? 'field-invalid' : ''}
            onChange={(e) => {
              setTitle(e.target.value)
              if (error) setError('')
            }}
            autoFocus
          />
        </label>

        <label className="field">
          <span>Categoria</span>
          <input
            type="text"
            value={category}
            maxLength={CATEGORY_MAX_LENGTH}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="ex: trabalho, pessoal..."
          />
        </label>

        <label className="field">
          <span>Prioridade</span>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {PRIORITY_LABEL[p]}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Data de vencimento</span>
          <input type="date" value={dueDate ?? ''} onChange={(e) => setDueDate(e.target.value)} />
        </label>

        {error && <p className="field-error">{error}</p>}

        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className="btn-primary">
            {isEditing ? 'Salvar' : 'Criar'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm
