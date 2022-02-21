import * as React from 'react'
import { useIconPosition } from './hooks'
import PeriodicNotes from './periodic-notes'
import './tailwind.css'

// eslint-disable-next-line no-empty-pattern
const PeriodicNotesContainer = React.forwardRef<HTMLDivElement>(({}, ref) => {
  const { top, left } = useIconPosition()
  const styles = {
    top,
    left,
  }
  return (
    <div
      id="periodic-notes-container"
      ref={ref}
      className="absolute px-4 py-2 mt-8 ml-2 font-sans rounded shadow-md select-none light:bg-white/20 dark:bg-black/20 light:text-gray-500 dark:text-gray-300"
      style={styles}
    >
      <div className="bg-red-500">Please note that this UI is not final.</div>
      <PeriodicNotes />
    </div>
  )
})

export default PeriodicNotesContainer
