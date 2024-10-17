import React from 'react'
import styles from './Input.module.css'

interface InputProps {
  type?: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
}

const Input: React.FC<InputProps> = ({ type = 'text', value, onChange, placeholder, className }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${styles.input} ${className}`}
    />
  )
}

export default Input
