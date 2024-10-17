import React from 'react'
import Select from '../ui/select/Select'
import styles from './TodoFilter.module.css'

type TodoStatus = 'pendente' | 'em_andamento' | 'concluída'

interface TodoFilterProps {
  value: TodoStatus | 'todas'
  onChange: (value: TodoStatus | 'todas') => void
}

const TodoFilter: React.FC<TodoFilterProps> = ({ value, onChange }) => {
  return (
    <div className={styles.todoFilter}>
      <Select
        value={value}
        onValueChange={(selected) => onChange(selected as TodoStatus | 'todas')}
      >
        <option value="todas">Todas</option>
        <option value="pendente">Pendente</option>
        <option value="em_andamento">Em andamento</option>
        <option value="concluída">Concluída</option>
      </Select>
    </div>
  )
}

export default TodoFilter
