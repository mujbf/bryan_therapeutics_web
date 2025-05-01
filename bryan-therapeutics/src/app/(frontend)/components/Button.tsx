import React from 'react'
import { ArrowRight, Send } from 'lucide-react'

// Define the props type
type ButtonProps = {
  variant: 'button1' | 'button2' | 'button3' | 'button4'
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  color?: string
  bgColor?: string
  className?: string
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  onClick,
  color = 'text-gray-900',
  bgColor = 'bg-transparent',
  className = '',
  disabled = false,
}) => {
  // Common button styles
  const baseStyles =
    'flex items-center justify-center font-medium transition-all duration-300 ease-in-out'

  // Variant-specific styles
  const variantStyles = {
    // Boxless button with text and right arrow
    button1: 'py-2 gap-2 hover:gap-3',

    // Boxless button with text and paper airplane
    button2: 'py-2 px-4 gap-2 font-normal',

    // Boxed button with text and paper airplane
    button3: 'py-3 px-6 rounded-lg border gap-2 hover:shadow-md',

    // Boxed button with text only
    button4: 'py-3 px-6 rounded-lg border hover:shadow-md',
  }

  // Determine icon based on variant
  const renderIcon = () => {
    switch (variant) {
      case 'button1':
        return <ArrowRight size={18} className="transition-all duration-300" />
      case 'button2':
      case 'button3':
        return <Send size={20} className="transition-all duration-300" />
      default:
        return null
    }
  }

  // Combine all classes
  const combinedClasses = `${baseStyles} ${
    variantStyles[variant]
  } ${bgColor} ${color} ${className} ${
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  }`

  return (
    <button
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      style={{ fontFamily: '"Instrument Sans", sans-serif', borderRadius: 4 }}
    >
      {children}
      {renderIcon()}
    </button>
  )
}

export default Button
