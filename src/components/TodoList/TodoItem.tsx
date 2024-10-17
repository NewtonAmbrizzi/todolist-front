import React from 'react'
import { Pencil, Trash2 } from "lucide-react"
import Checkbox from '../ui/checkbox/Checkbox'
import Select from '../ui/select/Select'
import styles from './TodoItem.module.css'

type TodoStatus = 'pendente' | 'em_andamento' | 'concluída'

interface Todo {
  id: number
  text: string
  description: string
  createdAt: Date
  completed: boolean
  status: TodoStatus
}

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (id: number) => void
  onStatusChange: (id: number, status: TodoStatus) => void
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit, onStatusChange }) => {
  return (
    <li className={styles.todoItem}>
      <div className={styles.content}>
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
        />
        <div className={styles.details}>
          <span className={todo.completed ? styles.completedText : ''}>{todo.text}</span>
          <span className={styles.description}>{todo.description}</span>
          <span className={styles.createdAt}>
            Criado em: {todo.createdAt.toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className={styles.actions}>
        <Select value={todo.status} onValueChange={(status) => onStatusChange(todo.id, status as TodoStatus)}>
            <option value="todas">Todas</option>
            <option value="pendente">Pendente</option>
            <option value="em_andamento">Em andamento</option>
            <option value="concluída">Concluída</option>
        </Select>
        <button onClick={() => onEdit(todo.id)}><Pencil /></button>
        <button onClick={() => onDelete(todo.id)}><Trash2 /></button>
      </div>
    </li>
  )
}

export default TodoItem
