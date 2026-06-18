import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className } = props

  return (
    <div className={clsx('flex flex-col leading-none select-none', className)}>
      <span className="text-xl font-black tracking-widest uppercase">TADA</span>
      <span className="text-[0.5rem] font-medium tracking-wide uppercase opacity-60 -mt-0.5">
        Toaripi Atutemori Dev. Assoc.
      </span>
    </div>
  )
}
