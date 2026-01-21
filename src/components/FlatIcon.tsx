import { ComponentPropsWithoutRef } from 'react'

interface FlatIconProps extends ComponentPropsWithoutRef<'i'> {
  name: string // ex. fi-rr-add (fi-rr-*)
  size?: number
}

export const FlatIcon = ({
  name,
  size = 24,
  className = '',
  ...props
}: FlatIconProps) => {
  return (
    <i
      className={`${name} ${className} flex items-center`}
      style={{ width: size, height: size }}
      {...props}
    />
  )
}
