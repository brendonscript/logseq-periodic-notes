import * as React from 'react'

const PeriodicNotes = () => {
  return (
    <div id="periodic-notes-inner">
      <WeeklyNoteButton />
      <MonthlyNoteButton />
      <YearlyNoteButton />
    </div>
  )
}

const WeeklyNoteButton = () => {
  return (
    <div>
      <button>Weekly Note</button>
    </div>
  )
}

const MonthlyNoteButton = () => {
  return <div>Monthly</div>
}

const YearlyNoteButton = () => {
  return <div>Yearly</div>
}

export default PeriodicNotes
