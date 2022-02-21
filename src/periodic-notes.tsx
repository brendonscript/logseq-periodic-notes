import * as React from 'react'
import { openPage } from './logseq-utils'
import useStore, { PeriodicAppState } from './store'
import { formatAsLocale } from './utils'

const settingsSelector = (state: PeriodicAppState) => state.settings
const PeriodicNotes = () => {
  const { weeklyDateFormat, monthlyDateFormat, yearlyDateFormat } =
    useStore(settingsSelector)
  const buttons = [
    {
      format: weeklyDateFormat,
      label: 'Open Weekly Note',
    },
    {
      format: monthlyDateFormat,
      label: 'Open Monthly Note',
    },
    {
      format: yearlyDateFormat,
      label: 'Open Yearly Note',
    },
  ]
  return (
    <div id="periodic-notes-inner">
      {buttons.map((b) => {
        return (
          <CurrentNoteButton key={b.label} format={b.format} label={b.label} />
        )
      })}
    </div>
  )
}

type CurrentNoteButtonProps = {
  format: string
  label: string
}
const CurrentNoteButton = ({ format, label }: CurrentNoteButtonProps) => {
  const open = () => openPage(formatAsLocale(new Date(), format))
  return (
    <div>
      <button onClick={() => open()}>{label}</button>
    </div>
  )
}


export default PeriodicNotes
