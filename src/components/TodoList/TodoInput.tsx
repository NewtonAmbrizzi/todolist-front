import React from 'react'
import Input from '../ui/input/Input'
import Button from '../ui/button/Button'
import styles from './TodoInput.module.css'

interface TodoInputProps {
  text: string
  description: string
  onTextChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onAdd: () => void
  onUpdate: () => void
  editingId: number | null
}

const TodoInput: React.FC<TodoInputProps> = ({
  text,
  description,
  onTextChange,
  onDescriptionChange,
  onAdd,
  onUpdate,
  editingId,
}) => {
  return (
    <div className={styles.todoInput}>
      <Input
        type="text"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Tarefa"
      />
      <Input
        type="text"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="Descrição"
      />
      <Button onClick={editingId !== null ? onUpdate : onAdd}>
        {editingId !== null ? 'Atualizar' : 'Adicionar'}
      </Button>
    </div>
  )
}

export default TodoInput
