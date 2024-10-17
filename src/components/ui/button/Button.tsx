import React from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  size?: 'small' | 'medium' | 'icon'
  className?: string
}

const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'primary', size = 'medium', className }) => {
  return (
    <button onClick={onClick} className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}>
      {children}
    </button>
  )
}

export default Button
