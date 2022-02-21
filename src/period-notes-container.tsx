import * as React from 'react'
import { useEffect } from 'react'
import { useIconPosition } from './hooks'
import PeriodicNotes from './periodic-notes'
import useStore from './store'
import './tailwind.css'

const PeriodicNotesContainer = React.forwardRef<HTMLDivElement>(({}, ref) => {
  const dispatchGetUserDateFormat = useStore(
    (state) => state.dispatchGetUserDateFormat
  )
  const { top, left } = useIconPosition()
  const styles = {
    top,
    left,
  }

  useEffect(() => {
    dispatchGetUserDateFormat()
  }, [])

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
