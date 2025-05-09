import { useRouter } from 'next/navigation' // For Next.js 13+ App Router
import Button from './Button'

type NavigationButtonProps = {
  href: string
  variant: 'button1' | 'button2' | 'button3' | 'button4'
  children: React.ReactNode
  color?: string
  bgColor?: string
  className?: string
  disabled?: boolean
}

const NavigationButton = ({ href, variant, children, ...buttonProps }: NavigationButtonProps) => {
  const router = useRouter()

  return (
    <Button variant={variant} onClick={() => router.push(href)} {...buttonProps}>
      {children}
    </Button>
  )
}

export default NavigationButton
