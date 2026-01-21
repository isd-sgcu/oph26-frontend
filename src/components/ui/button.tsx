import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center cursor-pointer gap-2 leading-none whitespace-nowrap font-bold transition-all disabled:opacity-50 disabled:pointer-events-none shadow-md/20',
  {
    variants: {
      size: {
        sm: 'h-10 min-w-0 px-4 text-base rounded-full',
        md: 'h-12 min-w-[112px] px-6 text-lg rounded-full',
        lg: 'h-14 min-w-[140px] px-8 text-lg rounded-full',
      },
      expanded: {
        false: '',
        true: 'w-fit',
      },
    },
    compoundVariants: [
      {
        size: 'sm',
        expanded: false,
        className: 'max-w-[112px]',
      },
      {
        size: 'md',
        expanded: false,
        className: 'max-w-[140px]',
      },
      {
        size: 'lg',
        expanded: false,
        className: 'max-w-[160px]',
      },
    ],
    defaultVariants: {
      size: 'md',
      expanded: false,
    },
  }
)

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  showBorder?: boolean
  borderClassName?: string
  borderWidth?: number
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      size,
      expanded,
      asChild = false,
      showBorder = false,
      borderClassName = 'bg-black',
      borderWidth = 1,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'

    const button = (
      <Comp
        ref={ref}
        className={cn(
          'bg-gradient-pink text-white',
          buttonVariants({ size, expanded }),
          className
        )}
        {...props}
      />
    )

    if (!showBorder) return button

    return (
      <div
        className={cn('inline-flex h-fit w-fit rounded-full', borderClassName)}
        style={{ padding: `${borderWidth}px` }}
      >
        {button}
      </div>
    )
  }
)

Button.displayName = 'Button'

export { Button }
