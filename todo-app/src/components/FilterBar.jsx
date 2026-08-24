import { PRIORITIES } from '../models/task'
import { getUniqueCategories } from '../utils/filters'

const PRIORITY_LABEL = { alta: 'Alta', media: 'Média', baixa: 'Baixa' }

function FilterBar({ tasks, filters, onChange }) {
  const categories = getUniqueCategories(tasks)

  return (
    <div className="filter-bar">
      <label className="filter-field">
        <span>Categoria</span>
        <select
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value })}
        >
          <option value="">Todas</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>

      <label className="filter-field">
        <span>Prioridade</span>
        <select
          value={filters.priority}
          onChange={(e) => onChange({ ...filters, priority: e.target.value })}
        >
          <option value="">Todas</option>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {PRIORITY_LABEL[p]}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default FilterBar
