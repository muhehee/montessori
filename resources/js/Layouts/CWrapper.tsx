import React from 'react'

interface Props {
  children?: React.ReactNode,
  className?: string

}


const CWrapper = (props: Props) => {
  const { children, className } = props;
  return (
    <div className={'max-w-[1440px] mx-auto px-64px mob:px-20px ' + className}>
      {children}
    </div>
  )
}

export default CWrapper
