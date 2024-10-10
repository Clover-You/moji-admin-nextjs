import React from 'react'

interface OptionalProps {
  if?: boolean
  ifCase?: React.ReactNode
  else?: React.ReactNode
}

export function Optional(props?: OptionalProps) {
  return props?.if ? props.ifCase : props?.else
}
