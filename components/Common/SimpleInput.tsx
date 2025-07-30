import React from 'react'

interface SimpleInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  className?: string
  onKeyPress?: (e: React.KeyboardEvent) => void
  disabled?: boolean
}

const SimpleInput: React.FC<SimpleInputProps> = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  className = '',
  onKeyPress,
  disabled = false
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      onKeyPress={onKeyPress}
      disabled={disabled}
      className={`w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors ${className}`}
    />
  )
}

export default SimpleInput 