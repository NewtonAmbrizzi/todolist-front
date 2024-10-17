import React from 'react'
import styles from './Checkbox.module.css'

interface CheckboxProps {
  checked: boolean
  onCheckedChange: () => void
  className?: string
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onCheckedChange, className }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onCheckedChange}
      className={`${styles.checkbox} ${className}`}
    />
  )
}

export default Checkbox
