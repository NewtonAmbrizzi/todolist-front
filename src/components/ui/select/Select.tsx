import React from 'react'
import styles from './Select.module.css'

interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
  className?: string
}

const Select: React.FC<SelectProps> = ({ value, onValueChange, children, className }) => {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className={`${styles.select} ${className}`}
    >
      {children}
    </select>
  )
}

export default Select
