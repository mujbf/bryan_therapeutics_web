import React from 'react'

// Define the props type
type TextProps = {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'body3' | 'body4'
  children: React.ReactNode
  color?: string
  align?: 'left' | 'center' | 'right' | 'justify'
  className?: string
}

const Text: React.FC<TextProps> = ({
  variant,
  children,
  color = 'text-gray-900',
  align = 'left',
  className = '',
}) => {
  // Apply font families directly with inline styles
  const fontStyles = {
    h1: { fontFamily: '"Hanken Grotesk", sans-serif' },
    h2: { fontFamily: '"Hanken Grotesk", sans-serif' },
    h3: { fontFamily: '"Hanken Grotesk", sans-serif' },
    h4: { fontFamily: '"Hanken Grotesk", sans-serif' },
    body1: { fontFamily: '"Instrument Sans", sans-serif' },
    body2: { fontFamily: '"Instrument Sans", sans-serif' },
    body3: { fontFamily: '"Instrument Sans", sans-serif' },
    body4: { fontFamily: '"Instrument Sans", sans-serif' },
  }

  // Text size and weight classes
  const variantStyles = {
    h1: 'text-6xl md:text-8xl font-medium tracking-tight',
    h2: 'text-4xl md:text-6xl font-normal tracking-tight',
    h3: 'text-3xl md:text-5xl font-normal tracking-tight',
    h4: 'text-lg md:text-2xl font-normal tracking-tight',
    body1: 'text-base md:text-xl font-medium tracking-tight',
    body2: 'text-base md:text-xl font-normal tracking-tight',
    body3: 'text-sm md:text-lg font-normal tracking-tight',
    body4: 'text-xs md:text-base font-normal tracking-tight',
  }

  // Text alignment classes
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  }

  // Combine classes (without custom font family classes)
  const combinedClasses = `${variantStyles[variant]} ${alignmentClasses[align]} ${color} ${className}`

  // Render the appropriate HTML element based on variant with inline style for font family
  switch (variant) {
    case 'h1':
      return (
        <h1 className={combinedClasses} style={fontStyles[variant]}>
          {children}
        </h1>
      )
    case 'h2':
      return (
        <h2 className={combinedClasses} style={fontStyles[variant]}>
          {children}
        </h2>
      )
    case 'h3':
      return (
        <h3 className={combinedClasses} style={fontStyles[variant]}>
          {children}
        </h3>
      )
    case 'h4':
      return (
        <h4 className={combinedClasses} style={fontStyles[variant]}>
          {children}
        </h4>
      )
    case 'body1':
      return (
        <p className={combinedClasses} style={fontStyles[variant]}>
          {children}
        </p>
      )
    case 'body2':
      return (
        <p className={combinedClasses} style={fontStyles[variant]}>
          {children}
        </p>
      )
    case 'body3':
      return (
        <p className={combinedClasses} style={fontStyles[variant]}>
          {children}
        </p>
      )
    case 'body4':
      return (
        <p className={combinedClasses} style={fontStyles[variant]}>
          {children}
        </p>
      )
    default:
      return (
        <p className={combinedClasses} style={fontStyles[variant]}>
          {children}
        </p>
      )
  }
}

export default Text
