import * as React from 'react'
import { useIconPosition } from './hooks'
import PeriodicNotes from './periodic-notes'
import './tailwind.css'

const PeriodicNotesContainer = React.forwardRef<HTMLDivElement>(({}, ref) => {
  const { top, left, bottom, right } = useIconPosition()
  const styles = {
    top,
    left,
    // top: withOffset(top, 3),
    // left: withOffset(left, 0.01),
  }

  return (
    <div
      id="periodic-notes-container"
      ref={ref}
      className="absolute px-4 py-2 mt-8 ml-2 font-sans rounded shadow-md select-none light:bg-white/20 dark:bg-black/20 light:text-gray-500 dark:text-gray-300"
      style={styles}
    >
      <PeriodicNotes />
    </div>
  )
})

export default PeriodicNotesContainer
