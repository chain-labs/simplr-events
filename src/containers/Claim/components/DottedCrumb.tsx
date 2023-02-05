import React from 'react'

const DottedCrumb = ({ active }: { active?: boolean }) => {
  return (
    <div
      className={`h-px w-8 border-t-4 border-dotted border-t-${
        active ? 'emerald' : 'gray'
      }-400`}
    />
  )
}

export default DottedCrumb
